import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Sister Wisdoms",
  description:
    "Questions about your subscription, a gift order, or just want to say hello? We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush/20 to-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl text-dusty-rose mb-3">
            We&apos;d love to hear from you
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-deep-plum mb-6">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-semibold text-deep-plum mb-6">
              Send Us a Note
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm text-warm-brown/70 mb-1 tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-blush/30 bg-soft-white focus:outline-none focus:border-deep-plum/40 text-charcoal"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-warm-brown/70 mb-1 tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-blush/30 bg-soft-white focus:outline-none focus:border-deep-plum/40 text-charcoal"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-warm-brown/70 mb-1 tracking-wide">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-blush/30 bg-soft-white focus:outline-none focus:border-deep-plum/40 text-charcoal resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                className="bg-deep-plum text-soft-white px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-warm-brown transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-deep-plum mb-2">
                Email
              </h3>
              <p className="text-warm-brown/80">hello@sisterwisdoms.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-deep-plum mb-2">
                Studio
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">
                Sister Wisdoms
                <br />
                c/o Solas Gallery
                <br />
                2 Rock Creek Dr
                <br />
                Salado, TX 76571
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-deep-plum mb-2">
                Response Time
              </h3>
              <p className="text-warm-brown/80">
                We respond to every message within 1–2 business days. We read
                them all — because real correspondence matters to us, too.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
