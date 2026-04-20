import Link from "next/link";
import type { Metadata } from "next";

const ANNUAL_LINK = "https://square.link/u/gxCxzA38";

export const metadata: Metadata = {
  title: "FAQ — Sister Wisdoms",
  description:
    "Frequently asked questions about Sister Wisdoms subscriptions, gifting, shipping, and more.",
};

const faqs = [
  {
    q: "What exactly is Sister Wisdoms?",
    a: "Sister Wisdoms is a snail mail subscription club. When you subscribe, you receive one beautiful, thoughtfully written letter in your mailbox each month for a full year — 12 letters total. Each letter is part of a curated collection built around themes of wisdom, connection, and the female experience.",
  },
  {
    q: "How much does a subscription cost?",
    a: "Pricing details are available on our Subscribe page. We offer both monthly and prepaid annual options. The annual option is a wonderful value and makes an exceptional gift.",
  },
  {
    q: "When do letters mail?",
    a: "Letters mail on the 1st of each month. U.S. subscribers typically receive theirs within 3–5 business days. International delivery may take 7–14 days depending on location.",
  },
  {
    q: "Can I buy this as a gift?",
    a: "Absolutely — and it's one of the most popular ways people discover us. Visit our Gift page to choose a collection and enter your recipient's mailing address. We'll even provide a printable gift card you can give on the day.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly subscribers can cancel at any time and will receive letters through the end of their current billing period. Prepaid annual subscriptions are non-refundable but can be transferred to a new recipient.",
  },
  {
    q: "Do you ship internationally?",
    a: "We do. We ship from Salado, Texas to addresses worldwide. International shipping is included in the subscription price.",
  },
  {
    q: "What's the paper quality like?",
    a: "Every letter is printed on premium, acid-free archival stationery with a soft cotton feel. These are letters designed to be kept and re-read for years.",
  },
  {
    q: "Can I start my subscription on a specific date?",
    a: "Yes. During checkout you can choose your start month. This is especially helpful if you're giving Sister Wisdoms as a birthday or holiday gift.",
  },
  {
    q: "Who writes the letters?",
    a: "Every letter is written by our small team in Salado, Texas. We're a husband-and-wife operation — Tim and Cherie Flanagan — and we put our hearts into every word.",
  },
  {
    q: "I have another question.",
    a: "We'd love to hear from you. Reach out on our Contact page and we'll get back to you promptly.",
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush/20 to-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl text-dusty-rose mb-3">
            We&apos;re here to help
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-deep-plum mb-6">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="border-b border-blush/20 pb-8"
            >
              <h3 className="text-xl font-semibold text-deep-plum mb-3">
                {faq.q}
              </h3>
              <p className="text-warm-brown/80 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blush/10 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-handwritten text-3xl text-deep-plum mb-6">
            Still have questions?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-deep-plum text-soft-white px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-warm-brown transition-colors"
            >
              Contact Us
            </Link>
            <a
              href={ANNUAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-deep-plum text-deep-plum px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-deep-plum hover:text-soft-white transition-colors"
            >
              Start Subscribing
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
