import type { Metadata } from "next";

const ANNUAL_LINK = "https://square.link/u/gxCxzA38";

export const metadata: Metadata = {
  title: "Our Story — Sister Wisdoms",
  description:
    "Meet Tim and Cherie Flanagan, the husband-and-wife team behind Sister Wisdoms. Born in Salado, Texas from 30 years of art, story, and community.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush/20 to-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl text-dusty-rose mb-3">
            From our hearts to your mailbox
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-deep-plum mb-6">
            Our Story
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 space-y-8 text-warm-brown/85 text-lg leading-relaxed">
          <p>
            We&apos;re Tim and Cherie Flanagan. For thirty years, we&apos;ve
            run Solas Gallery in the small town of Salado, Texas — a place
            where fine-art photography, handmade framing, and live events have
            built a community we&apos;re deeply proud of.
          </p>
          <p>
            Over those decades, we&apos;ve watched the world go digital. Faster,
            louder, more disposable. And we kept coming back to the same quiet
            truth: the things that matter most tend to arrive slowly. A print
            on the wall. A handwritten note. A letter you tuck into a drawer
            and find again years later.
          </p>
          <p>
            Sister Wisdoms grew from that belief. We wanted to create something
            that honored the lost art of letter-writing — something that would
            land in a woman&apos;s mailbox and remind her to pause. To reflect.
            To feel seen.
          </p>
          <p>
            Every letter we send is written with intention, printed on paper
            worth keeping, and mailed from our studio on Main Street. It&apos;s
            personal work, and we put our whole hearts into it.
          </p>
          <p>
            Whether you&apos;re reading these letters yourself or giving them
            to someone you love, we hope they become a quiet bright spot in
            your year — the kind of thing you&apos;ll keep long after the
            last envelope arrives.
          </p>
          <p className="font-handwritten text-2xl text-deep-plum mt-12">
            With gratitude,
            <br />
            Tim &amp; Cherie
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-blush/10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-deep-plum text-center mb-14">
            What We Believe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-1 bg-gold-accent rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-deep-plum mb-3">
                Paper Still Matters
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                There is a warmth to holding a letter that no screen can
                replicate. We believe in the tangible.
              </p>
            </div>
            <div>
              <div className="w-12 h-1 bg-dusty-rose rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-deep-plum mb-3">
                Slow Is Sacred
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                In a world of instant everything, we champion what takes time —
                to write, to read, to absorb.
              </p>
            </div>
            <div>
              <div className="w-12 h-1 bg-sage rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-deep-plum mb-3">
                Connection Over Content
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                These aren&apos;t newsletters. They&apos;re letters — written
                to be felt, not just consumed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-handwritten text-3xl text-deep-plum mb-6">
            Come be part of the story.
          </h2>
          <a
            href={ANNUAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-deep-plum text-soft-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-warm-brown transition-colors inline-block"
          >
            Start Your Subscription
          </a>
        </div>
      </section>
    </>
  );
}
