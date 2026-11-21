import { NextRequest, NextResponse } from "next/server";
import { addContact } from "@/lib/brevo";

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
    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY not set");
      return NextResponse.json({ ok: false, error: "Waitlist is temporarily unavailable" }, { status: 503 });
    }
    const ok = await addContact(email, attrs);
    if (!ok) return NextResponse.json({ ok: false, error: "Waitlist provider rejected the request" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ ok: false, error: "Waitlist request failed" }, { status: 500 });
  }
}
