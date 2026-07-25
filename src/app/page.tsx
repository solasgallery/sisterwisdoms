"use client";

import { useState } from "react";

/* ── Decorative wax-seal SVG ── */
function WaxSeal({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="36" fill="currentColor" opacity="0.15" />
      <circle cx="40" cy="40" r="28" fill="currentColor" opacity="0.25" />
      <circle cx="40" cy="40" r="20" fill="currentColor" opacity="0.35" />
      <text
        x="40"
        y="46"
        textAnchor="middle"
        fill="currentColor"
        fontSize="18"
        fontFamily="Caveat, cursive"
        fontWeight="600"
      >
        SW
      </text>
    </svg>
  );
}

/* ── Envelope icon ── */
function EnvelopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="60"
        height="44"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M2 6l30 22L62 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const result = await response.json().catch(() => ({ ok: false }));
      if (!response.ok || result.ok !== true) {
        throw new Error("Waitlist request was not confirmed");
      }
      setSubmitted(true);
    } catch {
      setSubmitError(
        "We couldn't confirm your place on the list. Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── HERO ── */}
      <section className="relative flex-1 flex items-center justify-center bg-gradient-to-b from-blush/20 via-cream to-cream py-20 md:py-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-16 right-[12%] opacity-[0.07] animate-float hidden lg:block">
          <EnvelopeIcon className="w-36 h-36 text-deep-plum" />
        </div>
        <div className="absolute bottom-20 left-[8%] opacity-[0.05] hidden lg:block rotate-[-8deg]">
          <EnvelopeIcon className="w-24 h-24 text-warm-brown" />
        </div>

        <div className="max-w-2xl mx-auto px-6 text-center">
          {/* Wax seal */}
          <div className="flex justify-center mb-8">
            <WaxSeal className="w-20 h-20 text-deep-plum" />
          </div>

          {/* Brand name */}
          <h1 className="font-handwritten text-5xl md:text-7xl text-deep-plum mb-4 tracking-wide">
            Sister Wisdoms
          </h1>

          {/* Tagline */}
          <p className="text-dusty-rose text-sm uppercase tracking-[0.25em] font-medium mb-10">
            Something beautiful is on its way
          </p>

          {/* Description */}
          <p className="text-warm-brown/80 text-lg md:text-xl leading-relaxed max-w-lg mx-auto mb-4">
            A monthly letter from a wise old friend — the encouragement and
            hard-won wisdom most of us wish someone would mail us — wrapped
            in something beautiful enough to keep.
          </p>
          <p className="text-warm-brown/60 text-base leading-relaxed max-w-md mx-auto mb-12">
            Bought as a gift. Single tier. $18 a month.
            <br />
            We&apos;re launching soon.
          </p>

          {/* ── EMAIL CAPTURE ── */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-3"
            >
              <input
                type="text"
                placeholder="Your first name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full bg-soft-white border border-blush/40 text-charcoal placeholder:text-warm-brown/40 text-sm focus:outline-none focus:border-deep-plum/50 focus:ring-1 focus:ring-deep-plum/20 transition-all"
              />
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full bg-soft-white border border-blush/40 text-charcoal placeholder:text-warm-brown/40 text-sm focus:outline-none focus:border-deep-plum/50 focus:ring-1 focus:ring-deep-plum/20 transition-all"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-deep-plum text-soft-white px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-warm-brown transition-colors disabled:opacity-60"
              >
                {submitting ? "Joining..." : "Join the Waitlist"}
              </button>
              <p className="text-warm-brown/40 text-xs mt-2">
                Be the first to know when we launch. No spam, ever.
              </p>
              {submitError && (
                <p role="alert" className="text-deep-plum text-sm mt-3">
                  {submitError}
                </p>
              )}
            </form>
          ) : (
            <div className="max-w-md mx-auto bg-soft-white rounded-2xl p-8 border border-blush/30 animate-fade-in-up">
              <p className="font-handwritten text-3xl text-deep-plum mb-2">
                You&apos;re on the list.
              </p>
              <p className="text-warm-brown/70 text-sm leading-relaxed">
                We&apos;ll write to you when the first letters are ready.
                <br />
                Thank you for believing the mailbox still holds magic.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── BRIEF ABOUT ── */}
      <section className="bg-soft-white border-t border-blush/20 py-16">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="text-warm-brown/70 text-sm leading-relaxed mb-3">
            From Tim &amp; Cherie Flanagan — a husband-and-wife team in
            Salado, Texas, where they&apos;ve spent 30 years building{" "}
            <a
              href="https://solasgallery.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-deep-plum hover:text-dusty-rose transition-colors border-b border-deep-plum/20"
            >
              Solas Gallery
            </a>{" "}
            and a life around art, story, and community.
          </p>
          <p className="text-warm-brown/40 text-xs tracking-wide">
            Sister Wisdoms · Salado, Texas · A Solas Gallery venture
          </p>
        </div>
      </section>
    </div>
  );
}
