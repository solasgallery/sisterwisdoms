import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_LIST_ID || "45");

    if (!apiKey) {
      console.error("BREVO_API_KEY not set");
      return NextResponse.json(
        { ok: false, error: "Waitlist is temporarily unavailable" },
        { status: 503 },
      );
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
      const body = await res.text();
      console.error("Brevo error:", res.status, body);
      return NextResponse.json(
        { ok: false, error: "Waitlist provider rejected the request" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { ok: false, error: "Waitlist request failed" },
      { status: 500 },
    );
  }
}
