// Hotfix test: missing BREVO_API_KEY (or any Brevo failure) must NOT look like a
// successful signup, and the page must offer the cherie@solasgallery.com fallback.
// Run: node --test tests/   (Node 20 built-ins only; Brevo is stubbed, nothing is sent)
// SW_SRC_ROOT=<dir> points the test at another checkout's src/ (used for the origin/main "before" run).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = process.env.SW_SRC_ROOT || path.join(repo, "src");
const req = createRequire(path.join(repo, "package.json"));
const ts = req("typescript");

function load(file) {
  const code = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };
  new Function("require", "module", "exports", code)(req, mod, mod.exports);
  return mod.exports;
}

const EMAIL = "hotfix-test@example.invalid";
const post = (body) =>
  new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

async function callRoute({ key, brevo }) {
  const { POST } = load(path.join(src, "app/api/waitlist/route.ts"));
  const saved = { key: process.env.BREVO_API_KEY, fetch: globalThis.fetch, err: console.error };
  const logs = [];
  const sent = [];
  if (key) process.env.BREVO_API_KEY = key; else delete process.env.BREVO_API_KEY;
  console.error = (...a) => logs.push(a.map(String).join(" "));
  globalThis.fetch = async (url, init) => { sent.push({ url, init }); return brevo(); };
  try {
    const res = await POST(post({ email: EMAIL, name: "Test" }));
    return { res, body: await res.json(), logs, sent };
  } finally {
    if (saved.key === undefined) delete process.env.BREVO_API_KEY; else process.env.BREVO_API_KEY = saved.key;
    globalThis.fetch = saved.fetch;
    console.error = saved.err;
  }
}

test("missing BREVO_API_KEY: route responds non-2xx, not ok, logs loudly without the email", async () => {
  const { res, body, logs, sent } = await callRoute({ key: "", brevo: () => new Response(null, { status: 201 }) });
  assert.equal(sent.length, 0, "nothing should reach Brevo without a key");
  assert.equal(res.ok, false, `main returns HTTP ${res.status} ${JSON.stringify(body)} — a fake success`);
  assert.notEqual(body.ok, true);
  assert.equal(body.code, "WAITLIST_NOT_SAVED");
  assert.ok(logs.some((l) => l.includes("[SW-WAITLIST] BREVO_API_KEY missing")), `log lines: ${JSON.stringify(logs)}`);
  assert.ok(!logs.join("\n").includes(EMAIL), "the visitor's email must not be logged");
});

test("Brevo rejects the contact: route responds non-2xx and does not log the email", async () => {
  const { res, body, logs } = await callRoute({
    key: "test-key",
    brevo: () => new Response(JSON.stringify({ code: "invalid_parameter", message: `bad ${EMAIL}` }), { status: 400 }),
  });
  assert.equal(res.ok, false, `got HTTP ${res.status} ${JSON.stringify(body)}`);
  assert.equal(body.code, "WAITLIST_NOT_SAVED");
  assert.ok(logs.some((l) => l.includes("[SW-WAITLIST]")));
  assert.ok(!logs.join("\n").includes(EMAIL));
});

test("Brevo unreachable (fetch throws): route responds non-2xx", async () => {
  const { res, body } = await callRoute({ key: "test-key", brevo: () => { throw new TypeError("fetch failed"); } });
  assert.equal(res.ok, false, `got HTTP ${res.status} ${JSON.stringify(body)}`);
  assert.equal(body.code, "WAITLIST_NOT_SAVED");
});

test("key present and Brevo accepts: route responds ok (no regression)", async () => {
  const { res, body, sent } = await callRoute({ key: "test-key", brevo: () => new Response(null, { status: 201 }) });
  assert.equal(res.status, 200);
  assert.equal(body.ok, true);
  assert.equal(JSON.parse(sent[0].init.body).listIds[0], 45);
});

test("page handler: missing-key response is NOT treated as success; fallback email is shown", async () => {
  const helper = path.join(src, "lib/waitlist.ts");
  assert.ok(
    existsSync(helper),
    "no client handler that checks the response: src/app/page.tsx calls setSubmitted(true) after fetch regardless of status, and again in catch"
  );
  const { joinWaitlist, WAITLIST_FALLBACK_EMAIL, WAITLIST_FALLBACK_MAILTO } = load(helper);
  // Feed the handler the route's real missing-key response.
  const { res, body } = await callRoute({ key: "", brevo: () => new Response(null, { status: 201 }) });
  const routeRes = new Response(JSON.stringify(body), { status: res.status });
  assert.equal(await joinWaitlist({ email: EMAIL }, async () => routeRes), false);
  assert.equal(await joinWaitlist({ email: EMAIL }, async () => { throw new TypeError("offline"); }), false);
  assert.equal(await joinWaitlist({ email: EMAIL }, async () => new Response('{"ok":true}', { status: 200 })), true);
  assert.equal(WAITLIST_FALLBACK_EMAIL, "cherie@solasgallery.com");
  assert.ok(WAITLIST_FALLBACK_MAILTO.startsWith("mailto:cherie@solasgallery.com"));
  for (const page of ["app/page.tsx", "app/capture/page.tsx"]) {
    const s = readFileSync(path.join(src, page), "utf8");
    assert.ok(s.includes("joinWaitlist("), `${page} must use joinWaitlist`);
    assert.ok(s.includes("WAITLIST_FALLBACK_MAILTO") && s.includes("We couldn&apos;t save your spot just now"), `${page} must render the email fallback`);
  }
});
