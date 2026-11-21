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

  const teamOk = await sendMail({
    to: SITE.notifyEmails,
    replyTo: d.giverEmail,
    subject: `Gift request: ${d.giverName} for ${d.recipientName}, starting ${startLabel}`,
    html: teamHtml,
  });
  if (!teamOk) {
    return NextResponse.json({ ok: false, error: "We could not send your request just now. Nothing was submitted." }, { status: 502 });
  }

  // Courtesy copy to the giver. Failure here does not fail the request (the team already has it).
  const copyOk = await sendMail({
    to: [d.giverEmail],
    replyTo: SITE.replyEmail,
    subject: "We have your Sister Wisdoms gift request",
    html: `<p>Hello ${esc(d.giverName)},</p>
<p>Thank you. We have your gift request for ${esc(d.recipientName)}, starting ${esc(startLabel)}.</p>
<p><b>You have not been charged.</b> We will email you personally to complete payment and confirm the details. Reply to this message if anything above needs to change.</p>
<p>Tim &amp; Cherie Flanagan<br/>Sister Wisdoms, Salado, Texas</p>`,
  });

  if (d.keepPosted) {
    const [first, ...rest] = d.giverName.split(" ");
    await addContact(d.giverEmail, { FIRSTNAME: first, LASTNAME: rest.join(" ") });
  }

  return NextResponse.json({ ok: true, copySent: copyOk, preview: isPreview(), startLabel });
}
