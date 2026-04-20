import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe — Sister Wisdoms",
  description:
    "Choose your collection and start receiving handwritten letters of wisdom in your mailbox each month.",
};

const MONTHLY_LINK = "https://square.link/u/zKWOP3BM";
const ANNUAL_LINK = "https://square.link/u/gxCxzA38";

const plans = [
  {
    name: "Monthly",
    price: "$14",
    interval: "/month",
    description: "Pay as you go. Cancel anytime.",
    features: [
      "One letter per month",
      "Choose your collection",
      "Free U.S. shipping",
      "Cancel anytime",
    ],
    accent: false,
    link: MONTHLY_LINK,
  },
  {
    name: "Annual",
    price: "$148",
    interval: "/year",
    description: "The full experience. Two months included.",
    features: [
      "All 12 letters — prepaid",
      "Choose your collection",
      "Free worldwide shipping",
      "Printable gift card included",
      "Best value",
    ],
    accent: true,
    link: ANNUAL_LINK,
  },
];

export default function SubscribePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush/20 to-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl text-dusty-rose mb-3">
            Your mailbox is waiting
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-deep-plum mb-6">
            Start Your Subscription
          </h1>
          <p className="text-warm-brown/80 text-lg leading-relaxed max-w-xl mx-auto">
            Choose your plan and your collection. Your first letter ships on
            the 1st of the month following your sign-up.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-10 border text-center ${
                  plan.accent
                    ? "bg-deep-plum text-soft-white border-deep-plum shadow-lg"
                    : "bg-soft-white text-charcoal border-blush/20"
                }`}
              >
                <h3
                  className={`text-xs uppercase tracking-widest font-semibold mb-4 ${
                    plan.accent ? "text-blush/80" : "text-dusty-rose"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-light">{plan.price}</span>
                  <span
                    className={`text-sm ml-1 ${
                      plan.accent ? "text-soft-white/60" : "text-warm-brown/50"
                    }`}
                  >
                    {plan.interval}
                  </span>
                </div>
                <p
                  className={`text-sm mb-8 ${
                    plan.accent ? "text-soft-white/70" : "text-warm-brown/60"
                  }`}
                >
                  {plan.description}
                </p>
                <ul className="space-y-3 text-left mb-10">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-3 text-sm ${
                        plan.accent
                          ? "text-soft-white/85"
                          : "text-warm-brown/80"
                      }`}
                    >
                      <span
                        className={
                          plan.accent ? "text-gold-accent" : "text-sage"
                        }
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-colors ${
                    plan.accent
                      ? "bg-gold-accent text-charcoal hover:bg-gold-accent/90"
                      : "bg-deep-plum text-soft-white hover:bg-warm-brown"
                  }`}
                >
                  Choose {plan.name}
                </a>
              </div>
            ))}
          </div>

          {/* Collection chooser placeholder */}
          <div className="mt-16 text-center">
            <p className="text-warm-brown/60 text-sm">
              After choosing your plan, you&apos;ll select your letter
              collection. Not sure?{" "}
              <Link
                href="/collections"
                className="text-deep-plum underline underline-offset-2"
              >
                Browse collections
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-blush/10 py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-2 text-xs uppercase tracking-[0.2em] text-warm-brown/60 font-medium">
          <span>✦ Secure checkout</span>
          <span>✦ Ships from Texas</span>
          <span>✦ Cancel anytime</span>
          <span>✦ 30-day guarantee</span>
        </div>
      </section>
    </>
  );
}
