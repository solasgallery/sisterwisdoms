import { NextRequest, NextResponse } from "next/server";

// Honest failure: if the signup is not saved, say so (non-2xx) so the page
// can show the "email us instead" fallback. Never log the visitor's email.
const FALLBACK_EMAIL = "cherie@solasgallery.com";

function notSaved(status: number) {
  return NextResponse.json(
    { ok: false, code: "WAITLIST_NOT_SAVED", fallbackEmail: FALLBACK_EMAIL },
    { status }
  );
}

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_LIST_ID || "45");

    if (!apiKey) {
      console.error("[SW-WAITLIST] BREVO_API_KEY missing — signup NOT saved");
      return notSaved(503);
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: name ? { FIRSTNAME: name } : {},
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!res.ok && res.status !== 204) {
      let code = "";
      try {
        code = String((await res.json())?.code ?? "");
      } catch {}
      console.error(`[SW-WAITLIST] Brevo error ${res.status} ${code} — signup NOT saved`);
      return notSaved(502);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "[SW-WAITLIST] waitlist error — signup NOT saved:",
      err instanceof Error ? err.name : "unknown"
    );
    return notSaved(500);
  }
}
