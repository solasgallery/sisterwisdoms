import { NextRequest, NextResponse } from "next/server";
import { SITE, startOptions, isPreview } from "@/lib/config";
import { addContact, esc, sendMail } from "@/lib/brevo";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const t = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

// Simple per-IP limit (in memory, per server instance): 5 requests per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot

  const d = {
    giverName: t(b.giverName, 100),
    giverEmail: t(b.giverEmail, 160),
    giverPhone: t(b.giverPhone, 40),
    recipientName: t(b.recipientName, 100),
    addr1: t(b.addr1, 120),
    addr2: t(b.addr2, 120),
    city: t(b.city, 80),
    state: t(b.state, 2).toUpperCase(),
    zip: t(b.zip, 10),
    message: t(b.message, 500),
    startMonth: t(b.startMonth, 7),
    keepPosted: b.keepPosted === true,
  };

  const missing =
    !d.giverName || !EMAIL.test(d.giverEmail) || !d.recipientName || !d.addr1 || !d.city ||
    !/^[A-Z]{2}$/.test(d.state) || !/^\d{5}(-\d{4})?$/.test(d.zip);
  const startLabel = startOptions().find((o) => o.value === d.startMonth)?.label;
  if (missing || !startLabel) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted details and try again." }, { status: 400 });
  }

  const row = (k: string, v: string) => `<tr><td style="padding:4px 12px 4px 0;color:#7A5C4F"><b>${k}</b></td><td>${esc(v) || "&mdash;"}</td></tr>`;
  const teamHtml = `<p>New Sister Wisdoms gift request. No payment has been taken. Reply to the giver to complete payment.</p>
<table style="font-family:Courier,monospace;font-size:14px">
${row("Giver", d.giverName)}${row("Giver email", d.giverEmail)}${row("Giver phone", d.giverPhone)}
${row("Recipient", d.recipientName)}${row("Address", [d.addr1, d.addr2, `${d.city}, ${d.state} ${d.zip}`].filter(Boolean).join(", "))}
${row("Start month", startLabel)}${row("Price shown", SITE.priceLabel)}${row("Gift message", d.message)}
${row("OK to add giver to updates list", d.keepPosted ? "yes" : "no")}
</table>`;

  // The team email is the record of the request. Only its failure is a real failure.
  let teamOk = false;
  try {
    teamOk = await sendMail({
      to: SITE.notifyEmails,
      replyTo: d.giverEmail,
      subject: `Gift request: ${d.giverName} for ${d.recipientName}, starting ${startLabel}`,
      html: teamHtml,
    });
  } catch (err) {
    console.error("[SW-GIFT] team notification threw:", err instanceof Error ? err.name : "unknown");
  }
  if (!teamOk) {
    console.error("[SW-GIFT] team notification NOT sent — gift request NOT received");
    return NextResponse.json({ ok: false, error: "We could not send your request just now. Nothing was submitted." }, { status: 502 });
  }

  // From here on the request IS received. Nothing below may turn it into a failure.

  // Courtesy copy to the giver.
  let copyOk = false;
  try {
    copyOk = await sendMail({
      to: [d.giverEmail],
      replyTo: SITE.replyEmail,
      subject: "We have your Sister Wisdoms gift request",
      // Fixed text only: never echo anything the submitter typed (names, message).
      html: `<p>We have your gift request and will email you to complete payment.</p>
<p>Tim &amp; Cherie Flanagan<br/>Sister Wisdoms, Salado, Texas</p>`,
    });
  } catch (err) {
    console.error("[SW-GIFT] giver copy threw:", err instanceof Error ? err.name : "unknown");
  }
  if (!copyOk) console.error("[SW-GIFT] request received, but the giver copy was NOT sent");

  // listAdded: null = not requested, true = added (or intentionally skipped on preview), false = failed.
  let listAdded: boolean | null = null;
  if (d.keepPosted) {
    const [first, ...rest] = d.giverName.split(" ");
    try {
      listAdded = await addContact(d.giverEmail, { FIRSTNAME: first, LASTNAME: rest.join(" ") });
    } catch (err) {
      console.error("[SW-GIFT] news opt-in threw:", err instanceof Error ? err.name : "unknown");
      listAdded = false;
    }
    if (!listAdded) console.error("[SW-GIFT] request received; news opt-in requested but contact NOT saved");
  }
  const list = listAdded === null ? "none" : isPreview() ? "preview" : listAdded ? "added" : "failed";

  return NextResponse.json({
    ok: true,
    received: true,
    giverCopy: copyOk ? "sent" : "failed",
    list,
    copySent: copyOk,
    listAdded,
    preview: isPreview(),
    startLabel,
  });
}
