import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give a Gift — Sister Wisdoms",
  description:
    "Give the gift of a year of handwritten letters. A Sister Wisdoms subscription is the gift she'll remember long after the last envelope arrives.",
};

export default function GiftPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush/20 to-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl text-dusty-rose mb-3">
            The gift she&apos;ll remember all year
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-deep-plum mb-6">
            Give a Gift Subscription
          </h1>
          <p className="text-warm-brown/80 text-lg leading-relaxed max-w-xl mx-auto">
            Not a candle. Not a gift card. A year of handwritten letters —
            arriving one by one in her mailbox — is a gift that says you
            truly know her.
          </p>
        </div>
      </section>

      {/* How gifting works */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-deep-plum text-center mb-14">
            How Gifting Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-blush/30 flex items-center justify-center mx-auto mb-4">
                <span className="font-handwritten text-2xl text-deep-plum font-bold">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-deep-plum mb-2">
                Choose a Collection
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                Pick the letter series you think she&apos;ll love. Not sure?
                Our &ldquo;Surprise Her&rdquo; option lets us choose.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-handwritten text-2xl text-deep-plum font-bold">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-deep-plum mb-2">
                Tell Us Where to Send It
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                Enter her mailing address and choose when the first letter
                should arrive. We&apos;ll time it perfectly.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-handwritten text-2xl text-deep-plum font-bold">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-deep-plum mb-2">
                We Handle the Rest
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                Download a printable gift card to give her on the day. Then we
                mail one beautiful letter every month for a full year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gift occasions */}
      <section className="bg-blush/10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-deep-plum mb-8">
            Perfect For
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm uppercase tracking-widest font-medium text-warm-brown/70">
            <span className="bg-soft-white px-6 py-3 rounded-full border border-blush/20">
              Mother&apos;s Day
            </span>
            <span className="bg-soft-white px-6 py-3 rounded-full border border-blush/20">
              Birthdays
            </span>
            <span className="bg-soft-white px-6 py-3 rounded-full border border-blush/20">
              Bridal Showers
            </span>
            <span className="bg-soft-white px-6 py-3 rounded-full border border-blush/20">
              Retirement
            </span>
            <span className="bg-soft-white px-6 py-3 rounded-full border border-blush/20">
              Just Because
            </span>
            <span className="bg-soft-white px-6 py-3 rounded-full border border-blush/20">
              Friendship
            </span>
            <span className="bg-soft-white px-6 py-3 rounded-full border border-blush/20">
              Christmas
            </span>
            <span className="bg-soft-white px-6 py-3 rounded-full border border-blush/20">
              Thinking of You
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-handwritten text-3xl md:text-4xl text-deep-plum mb-4">
            Give something she&apos;ll keep forever.
          </h2>
          <p className="text-warm-brown/80 mb-8">
            Choose a collection and we&apos;ll take care of the rest.
          </p>
          <Link
            href="/subscribe"
            className="bg-deep-plum text-soft-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-warm-brown transition-colors inline-block"
          >
            Send a Gift Subscription
          </Link>
        </div>
      </section>
    </>
  );
}
