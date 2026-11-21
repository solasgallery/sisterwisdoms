// Run: npm run build first, then `node --test tests/`.
// Starts `next start` (production) with Brevo stubbed by tests/brevo-stub.cjs. No real Brevo calls.
// FS6-01: once the team email is sent, a later giver-copy or list-add failure (even a thrown network error)
// must return 200 ok:true with the caveat, never "Nothing was submitted".
// FS6-10: /capture phone is stored (PHONE attribute).
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

function nextMonthValue() {
  // Candidate YYYY-MM values; the first one the API accepts is an offered start month.
  const d = new Date();
  const out = [];
  for (let i = 0; i < 24; i++) {
    const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + i, 1));
    out.push(`${x.getUTCFullYear()}-${String(x.getUTCMonth() + 1).padStart(2, "0")}`);
  }
  return out;
}
let startMonth;
const gift = (extra = {}) => ({
  giverName: "AUDIT TEST", giverEmail: "giver@example.com", recipientName: "Her", addr1: "1 Main St",
  city: "Salado", state: "TX", zip: "76571", message: "hi", startMonth, keepPosted: true, website: "", ...extra,
});

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
  for (const v of nextMonthValue()) {
    setMode({ smtp: "500" });
    const r = await post("/api/gift", gift({ startMonth: v }));
    if (r.status === 502) { startMonth = v; break; } // 502 = validation passed, team email refused by stub
  }
  assert.ok(startMonth, "found an offered start month");
});
test.after(() => server?.kill());

test("gift: happy path, everything sent", async () => {
  setMode({});
  const r = await post("/api/gift", gift());
  assert.equal(r.status, 200);
  assert.equal(r.json.ok, true);
  assert.equal(r.json.giverCopy, "sent");
  assert.equal(r.json.list, "added");
  assert.equal(calls().filter((c) => c.kind === "smtp").length, 2);
});

test("gift: giver copy throws after team email -> received, giverCopy failed (FS6-01)", async () => {
  setMode({ "smtp:giver@example.com": "network" });
  const r = await post("/api/gift", gift());
  assert.equal(r.status, 200);
  assert.equal(r.json.ok, true);
  assert.equal(r.json.giverCopy, "failed");
  assert.equal(r.json.list, "added");
});

test("gift: list add throws after team email -> received, list failed (FS6-01)", async () => {
  setMode({ contacts: "network" });
  const r = await post("/api/gift", gift());
  assert.equal(r.status, 200);
  assert.equal(r.json.ok, true);
  assert.equal(r.json.giverCopy, "sent");
  assert.equal(r.json.list, "failed");
});

test("gift: opt-in unticked -> no contacts call, list none", async () => {
  setMode({});
  const r = await post("/api/gift", gift({ keepPosted: false }));
  assert.equal(r.status, 200);
  assert.equal(r.json.list, "none");
  assert.equal(calls().filter((c) => c.kind === "contacts").length, 0);
});

test("gift: team email fails (500 or network) -> real failure", async () => {
  for (const m of ["500", "network"]) {
    setMode({ "smtp:cherie@solasgallery.com": m });
    const r = await post("/api/gift", gift());
    assert.equal(r.status, 502, m);
    assert.equal(r.json.ok, false);
    assert.match(r.json.error, /Nothing was submitted/);
    assert.equal(calls().filter((c) => c.kind === "contacts").length, 0, "no list add after a failed request");
  }
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
