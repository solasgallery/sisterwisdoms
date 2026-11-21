/* eslint-disable @typescript-eslint/no-require-imports */
// Preload for `next start` in tests: replaces api.brevo.com. Never reaches the real Brevo.
// Every call is appended to $BREVO_STUB_LOG. Behaviour is read per call from $BREVO_STUB_MODE (JSON file):
//   {"smtp:<recipient substring>": "ok|500|network", "smtp": "...", "contacts": "..."}
const fs = require("fs");
const real = globalThis.fetch;
globalThis.fetch = async (input, init = {}) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (!url.startsWith("https://api.brevo.com/")) return real(input, init);
  const kind = url.includes("/smtp/email") ? "smtp" : url.includes("/contacts") ? "contacts" : "other";
  const body = JSON.parse(init.body || "{}");
  fs.appendFileSync(process.env.BREVO_STUB_LOG, JSON.stringify({ kind, url, body }) + "\n");
  let mode = {};
  try { mode = JSON.parse(fs.readFileSync(process.env.BREVO_STUB_MODE, "utf8")); } catch {}
  let m = mode[kind] || "ok";
  if (kind === "smtp") {
    const to = (body.to || []).map((t) => t.email).join(",");
    for (const [k, v] of Object.entries(mode)) if (k.startsWith("smtp:") && to.includes(k.slice(5))) m = v;
  }
  if (m === "network") throw new TypeError("fetch failed (stub network error)");
  if (m === "500") return new Response(JSON.stringify({ code: "internal_error" }), { status: 500, headers: { "content-type": "application/json" } });
  return new Response(JSON.stringify(kind === "smtp" ? { messageId: "<stub>" } : { id: 1 }), { status: 201, headers: { "content-type": "application/json" } });
};
