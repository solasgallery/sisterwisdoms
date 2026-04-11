import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — Sister Wisdoms",
  description:
    "Choose your collection, we write and mail beautiful letters, you open and keep them forever. Simple, meaningful, magical.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush/20 to-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl text-dusty-rose mb-3">
            The experience
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-deep-plum mb-6">
            How It Works
          </h1>
          <p className="text-warm-brown/80 text-lg leading-relaxed max-w-xl mx-auto">
            A Sister Wisdoms subscription is beautifully simple. Here&apos;s
            what to expect from the moment you join.
          </p>
        </div>
      </section>

      {/* Steps - expanded */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 space-y-20">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-full bg-blush/30 flex items-center justify-center shrink-0">
              <span className="font-handwritten text-3xl text-deep-plum font-bold">
                1
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-deep-plum mb-3">
                Choose Your Collection
              </h2>
              <p className="text-warm-brown/80 leading-relaxed mb-3">
                Browse our letter collections — each one is a year-long series
                of 12 letters, written around a theme that resonates. Whether
                it&apos;s wisdom for everyday life, letters between sisters, or
                a seasonal journey through womanhood, there&apos;s a collection
                for every reader.
              </p>
              <p className="text-warm-brown/80 leading-relaxed">
                Not sure where to start? Choose our &ldquo;Surprise Me&rdquo;
                option and we&apos;ll match you with the perfect collection
                based on a few simple questions.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center shrink-0">
              <span className="font-handwritten text-3xl text-deep-plum font-bold">
                2
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-deep-plum mb-3">
                We Write, Print & Mail
              </h2>
              <p className="text-warm-brown/80 leading-relaxed mb-3">
                Every letter is thoughtfully written and printed on archival
                stationery — the kind of paper that feels important the moment
                you touch it. We seal each one in a beautiful envelope and mail
                it from our studio in Salado, Texas.
              </p>
              <p className="text-warm-brown/80 leading-relaxed">
                Letters mail on the 1st of each month. U.S. subscribers
                typically receive theirs within 3–5 days. We ship
                internationally too.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-full bg-gold-accent/20 flex items-center justify-center shrink-0">
              <span className="font-handwritten text-3xl text-deep-plum font-bold">
                3
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-deep-plum mb-3">
                Open, Read, Keep
              </h2>
              <p className="text-warm-brown/80 leading-relaxed mb-3">
                When your letter arrives, take a moment. Pour a cup of tea. Sit
                somewhere quiet. This isn&apos;t email — it&apos;s something
                worth savoring.
              </p>
              <p className="text-warm-brown/80 leading-relaxed">
                Many of our subscribers keep their letters in a special box or
                binder and revisit them throughout the year. They&apos;re
                designed to be re-read, shared, and treasured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-blush/10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-deep-plum text-center mb-14">
            What&apos;s Inside Each Envelope
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-soft-white rounded-2xl p-8 border border-blush/20">
              <h3 className="text-xl font-semibold text-deep-plum mb-2">
                The Letter
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                A multi-page letter written with care on beautiful stationery.
                Each one tells a story, shares a wisdom, or asks a question
                that stays with you.
              </p>
            </div>
            <div className="bg-soft-white rounded-2xl p-8 border border-blush/20">
              <h3 className="text-xl font-semibold text-deep-plum mb-2">
                A Reflection Prompt
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                Every letter includes a gentle question or journaling prompt —
                an invitation to sit with the ideas and make them your own.
              </p>
            </div>
            <div className="bg-soft-white rounded-2xl p-8 border border-blush/20">
              <h3 className="text-xl font-semibold text-deep-plum mb-2">
                Archival Paper
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                Printed on premium, acid-free paper with a soft cotton feel.
                These are letters worth keeping for years.
              </p>
            </div>
            <div className="bg-soft-white rounded-2xl p-8 border border-blush/20">
              <h3 className="text-xl font-semibold text-deep-plum mb-2">
                A Beautiful Envelope
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                Hand-addressed and sealed, because the experience begins the
                moment you open your mailbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-handwritten text-3xl md:text-4xl text-deep-plum mb-6">
            Ready to receive something worth opening?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/subscribe"
              className="bg-deep-plum text-soft-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-warm-brown transition-colors"
            >
              Start Your Subscription
            </Link>
            <Link
              href="/gift"
              className="border-2 border-deep-plum text-deep-plum px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-deep-plum hover:text-soft-white transition-colors"
            >
              Give as a Gift
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
