import { NextRequest, NextResponse } from "next/server";
import { addContact } from "@/lib/brevo";
import { isPreview } from "@/lib/config";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // honeypot: pretend success to bots
    if (body.website) return NextResponse.json({ ok: true });
    const email = String(body.email || "").trim();
    if (!EMAIL.test(email)) {
      return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
    }
    const first = String(body.firstName || body.name || "").trim().slice(0, 80);
    const last = String(body.lastName || "").trim().slice(0, 80);
    const attrs: Record<string, string> = {};
    if (first) attrs.FIRSTNAME = first;
    if (last) attrs.LASTNAME = last;
    // Optional phone from /capture. Stored as the plain-text PHONE attribute (not SMS: SMS needs E.164 and must be
    // unique, so a typo there would make Brevo reject the whole signup).
    const phone = String(body.phone || "").replace(/[^\d+().\- ]/g, "").trim().slice(0, 40);
    if (phone) attrs.PHONE = phone;
    if (!process.env.BREVO_API_KEY) {
      console.error("[SW-WAITLIST] BREVO_API_KEY missing — signup NOT saved");
      return NextResponse.json(
        { ok: false, code: "WAITLIST_NOT_SAVED", fallbackEmail: "cherie@solasgallery.com", error: "Waitlist is temporarily unavailable" },
        { status: 503 }
      );
    }
    // On preview, contact adds are skipped by design. Say so instead of claiming it was saved.
    if (isPreview()) return NextResponse.json({ ok: true, saved: false, preview: true });
    const ok = await addContact(email, attrs);
    if (!ok) {
      console.error("[SW-WAITLIST] Brevo did not save the contact — signup NOT saved");
      return NextResponse.json(
        { ok: false, code: "WAITLIST_NOT_SAVED", fallbackEmail: "cherie@solasgallery.com", error: "Waitlist provider rejected the request" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, saved: true });
  } catch (err) {
    console.error("[SW-WAITLIST] waitlist error — signup NOT saved:", err instanceof Error ? err.name : "unknown");
    return NextResponse.json(
      { ok: false, code: "WAITLIST_NOT_SAVED", fallbackEmail: "cherie@solasgallery.com", error: "Waitlist request failed" },
      { status: 500 }
    );
  }
}
