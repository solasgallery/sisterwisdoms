"use client";

import { useState, FormEvent } from "react";

const FALLBACK = "cherie@solasgallery.com";
const MAILTO = `mailto:${FALLBACK}?subject=Please%20add%20me%20to%20the%20Sister%20Wisdoms%20waitlist`;

// Home-page waitlist. Success copy shows only when the server says the contact was saved (saved: true).
// Preview (saved: false) says nothing was added. Any failure shows an honest error with an email fallback.
export default function WaitlistForm() {
  const [state, setState] = useState<"idle" | "loading" | "saved" | "not-saved-preview">("idle");
  const [error, setError] = useState<"" | "not-saved" | "unconfirmed">("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: String(fd.get("firstName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      source: "website",
      website: String(fd.get("website") || ""),
    };
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) throw new Error("Not saved");
      setState(j.saved === true ? "saved" : "not-saved-preview");
    } catch (err) {
      // A dropped connection means we can't tell whether the signup reached us.
      setError(err instanceof TypeError ? "unconfirmed" : "not-saved");
      setState("idle");
    }
  }

  if (state === "saved" || state === "not-saved-preview") {
    const saved = state === "saved";
    return (
      <div role="status" className="max-w-md mx-auto text-center">
        <p className={`font-type font-bold text-xl text-deep-plum${saved ? "" : " mb-2"}`}>
          {saved ? "You're on the list — we'll write when there's news." : "Preview: not saved"}
        </p>
        {!saved && <p className="text-lg text-warm-brown">This is a preview site. Nothing was added to the list.</p>}
      </div>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
      <label htmlFor="wl-first" className="sr-only">First name (optional)</label>
      <input
        id="wl-first"
        name="firstName"
        type="text"
        autoComplete="given-name"
        placeholder="Your first name (optional)"
        className="w-full px-5 py-3.5 rounded-md bg-soft-white border border-blush text-charcoal text-lg placeholder:text-warm-brown/70 focus:outline-none focus:border-deep-plum"
      />
      <label htmlFor="wl-email" className="sr-only">Email address</label>
      <input
        id="wl-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        className="w-full px-5 py-3.5 rounded-md bg-soft-white border border-blush text-charcoal text-lg placeholder:text-warm-brown/70 focus:outline-none focus:border-deep-plum"
      />
      <input type="text" name="website" aria-hidden="true" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" />
      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-deep-plum text-soft-white font-type px-7 py-3.5 rounded-md hover:bg-warm-brown disabled:opacity-60"
      >
        {state === "loading" ? "Submitting…" : "Join the Waitlist"}
      </button>
      {error && (
        <p role="alert" className="text-base text-center leading-snug text-[#9b2c3d]">
          {error === "unconfirmed" ? "We couldn’t confirm you were added." : "We couldn’t add you to the list just now."} Email us at{" "}
          <a href={MAILTO} className="font-semibold text-deep-plum underline">{FALLBACK}</a>{" "}
          and we&apos;ll add you by hand.
        </p>
      )}
      <p className="text-base text-warm-brown text-center">Be the first to know when we launch. No spam, ever.</p>
    </form>
  );
}
