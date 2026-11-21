// Run: npm run build first, then `node --test tests/`.
// Starts `next start` (production) with Brevo stubbed by tests/brevo-stub.cjs. No real Brevo calls.
// FS6-10: /capture phone is stored (PHONE attribute).
// Strip-back 2026-11-21: the gift order flow is gone; /api/gift must 404. The waitlist is the only form.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFileSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const stub = join(root, "tests", "brevo-stub.cjs");
const PORT = 3931;
const log = join(tmpdir(), `sw-brevo-stub-${PORT}.jsonl`);
const modeFile = join(tmpdir(), `sw-brevo-mode-${PORT}.json`);

let server;
let n = 0;
const setMode = (m) => { writeFileSync(modeFile, JSON.stringify(m)); rmSync(log, { force: true }); };
const calls = () => (existsSync(log) ? readFileSync(log, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []);
const post = (path, body) =>
  fetch(`http://127.0.0.1:${PORT}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `10.9.0.${++n}` },
    body: JSON.stringify(body),
  }).then(async (r) => ({ status: r.status, json: await r.json().catch(() => null) }));

test.before(async () => {
  setMode({});
  server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: root,
    env: { ...process.env, VERCEL_ENV: "production", BREVO_API_KEY: "stub-key", BREVO_STUB_LOG: log, BREVO_STUB_MODE: modeFile, NODE_OPTIONS: `--require ${stub}` },
    stdio: "ignore",
  });
  for (let i = 0; i < 60; i++) {
    try { await fetch(`http://127.0.0.1:${PORT}/robots.txt`); break; } catch { await new Promise((r) => setTimeout(r, 500)); }
  }
});
test.after(() => server?.kill());

test("gift: the order route is gone (404)", async () => {
  const r = await post("/api/gift", { giverEmail: "giver@example.com" });
  assert.equal(r.status, 404);
  assert.equal(calls().length, 0);
});

test("waitlist: happy path adds the contact to the list", async () => {
  setMode({});
  const r = await post("/api/waitlist", { firstName: "AUDIT", email: "w@example.com", website: "" });
  assert.equal(r.status, 200);
  assert.equal(r.json.saved, true);
  assert.equal(calls().filter((x) => x.kind === "contacts").length, 1);
});

test("waitlist: phone is stored as PHONE (FS6-10)", async () => {
  setMode({});
  const r = await post("/api/waitlist", { firstName: "AUDIT", lastName: "TEST", email: "w@example.com", phone: "(254) 555-0100", website: "" });
  assert.equal(r.status, 200);
  assert.equal(r.json.saved, true);
  const c = calls().filter((x) => x.kind === "contacts");
  assert.equal(c.length, 1);
  assert.equal(c[0].body.attributes.PHONE, "(254) 555-0100");
});

test("waitlist: Brevo fails (500 or network) -> not saved, fallback email", async () => {
  for (const m of ["500", "network"]) {
    setMode({ contacts: m });
    const r = await post("/api/waitlist", { email: "w@example.com", website: "" });
    assert.notEqual(r.status, 200, m);
    assert.equal(r.json.ok, false, m);
    assert.equal(r.json.code, "WAITLIST_NOT_SAVED", m);
    assert.equal(r.json.fallbackEmail, "cherie@solasgallery.com", m);
  }
});
