import Image from "next/image";
import GiftForm from "@/components/GiftForm";
import { SITE, startOptions, firstMailingPhrase } from "@/lib/config";
import { getFaq, faqJsonLd } from "@/lib/faq";

// Dated elements (start months, "first letters mail in...") are computed per request; refresh hourly.
export const revalidate = 3600;

const STEPS = [
  { n: "1", t: "You write a note and pick a month", d: "Tell us who the letters are for, where they should be mailed, and the month you want the first one to arrive." },
  { n: "2", t: "We email you to complete payment", d: `We read your request and write to you personally. Nothing is charged on this page. The subscription is ${SITE.priceLabel}.` },
  { n: "3", t: "A letter comes in the mail", d: "One paper letter a month, in the voice of a wise old friend, addressed to her." },
];

export default function Home() {
  const now = new Date();
  const faq = getFaq(now);
  const options = startOptions(now);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.url}/#org`,
      name: "Sister Wisdoms",
      url: SITE.url,
      logo: `${SITE.url}/logo.png`,
      parentOrganization: { "@type": "Organization", name: "Solas Gallery", url: "https://www.solasgallery.com" },
      founder: [
        { "@type": "Person", name: "Tim Flanagan" },
        { "@type": "Person", name: "Cherie Flanagan" },
      ],
      address: { "@type": "PostalAddress", addressLocality: "Salado", addressRegion: "TX", addressCountry: "US" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${SITE.url}/#product`,
      name: "Sister Wisdoms monthly letter subscription",
      description:
        "One paper letter a month, written in the voice of a wise old friend and mailed to the recipient's home. Available as a gift.",
      image: `${SITE.url}/og-default.jpg`,
      brand: { "@type": "Brand", name: "Sister Wisdoms" },
      url: SITE.url,
      offers: {
        "@type": "Offer",
        url: `${SITE.url}/#gift`,
        price: SITE.priceUsd.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: SITE.priceUsd.toFixed(2),
          priceCurrency: "USD",
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: "MON",
        },
        seller: { "@id": `${SITE.url}/#org` },
      },
    },
    faqJsonLd(now),
  ];

  return (
    <>
      {jsonLd.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />
      ))}

      <header className="sticky top-0 z-20 bg-cream/95 backdrop-blur border-b border-blush/40">
        <nav aria-label="Sections" className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <a href="#top" className="font-type font-bold text-deep-plum text-lg py-2 inline-block">Sister Wisdoms</a>
          <ul className="hidden sm:flex gap-6 font-type text-sm text-warm-brown">
            <li><a className="hover:text-deep-plum" href="#sample">The letter</a></li>
            <li><a className="hover:text-deep-plum" href="#how">How it works</a></li>
            <li><a className="hover:text-deep-plum" href="#faq">Questions</a></li>
            <li><a className="hover:text-deep-plum" href="#founders">Who we are</a></li>
          </ul>
          <a href="#gift" className="bg-deep-plum text-soft-white font-type text-sm px-4 py-3 rounded-md hover:bg-warm-brown">Give a gift</a>
        </nav>
      </header>

      <div id="top">
        {/* HERO */}
        <section className="bg-gradient-to-b from-blush/25 to-cream">
          <div className="max-w-5xl mx-auto px-5 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-type text-sm uppercase tracking-[0.2em] text-warm-brown mb-4">A letter, by mail</p>
              <h1 className="font-type font-bold text-4xl md:text-5xl text-deep-plum leading-tight mb-5">
                A monthly letter subscription, given as a gift
              </h1>
              <p className="text-xl md:text-2xl text-warm-brown leading-relaxed mb-4">
                One paper letter a month from a wise old friend, mailed to someone you love. Warm, honest encouragement, right
                in her mailbox.
              </p>
              <p className="text-lg text-warm-brown mb-8">
                {SITE.priceLabel}. One tier. {firstMailingPhrase(now)}
              </p>
              <a href="#gift" className="inline-block bg-deep-plum text-soft-white font-type px-7 py-3.5 rounded-md hover:bg-warm-brown">
                Start a gift
              </a>
              <a href="#sample" className="inline-block font-type text-deep-plum underline underline-offset-4 ml-3 px-2 py-3">See the letter</a>
            </div>
            <div id="sample" className="scroll-mt-24">
              <Image
                src="/sample-letter.webp"
                width={768}
                height={1024}
                priority
                sizes="(min-width: 768px) 480px, 100vw"
                alt="A typed letter on cream paper beside an envelope and a sprig of dried lavender on a wooden table"
                className="rounded-md shadow-xl w-full h-auto"
              />
              <p className="text-sm text-warm-brown/80 mt-2">
                Illustrative photograph.
              </p>
            </div>
          </div>
        </section>

        {/* HOW */}
        <section id="how" className="scroll-mt-16 bg-soft-white border-y border-blush/30">
          <div className="max-w-5xl mx-auto px-5 py-14">
            <h2 className="font-type font-bold text-3xl text-deep-plum mb-10">How it works</h2>
            <ol className="grid md:grid-cols-3 gap-8">
              {STEPS.map((s) => (
                <li key={s.n}>
                  <span className="font-type text-4xl text-dusty-rose">{s.n}</span>
                  <h3 className="font-type font-bold text-lg text-deep-plum mt-2 mb-2">{s.t}</h3>
                  <p className="text-lg text-warm-brown leading-relaxed">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* GIFT */}
        <section id="gift" className="scroll-mt-16">
          <div className="max-w-2xl mx-auto px-5 py-14">
            <h2 className="font-type font-bold text-3xl text-deep-plum mb-3">Give a Sister Wisdoms letter</h2>
            <p className="text-lg text-warm-brown leading-relaxed mb-8">
              Four short steps. When you send this, we email you to complete payment. We do not take payment on this page, and
              you are not charged until you hear from us.
            </p>
            <GiftForm options={options} price={SITE.priceLabel} />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-16 bg-soft-white border-y border-blush/30">
          <div className="max-w-3xl mx-auto px-5 py-14">
            <h2 className="font-type font-bold text-3xl text-deep-plum mb-8">Questions about giving a letter subscription</h2>
            <div className="divide-y divide-blush/40">
              {faq.map((f) => (
                <details key={f.q} className="group py-2">
                  <summary className="cursor-pointer font-type font-bold text-lg text-deep-plum list-none flex justify-between gap-4 py-3 min-h-[44px]">
                    <span>{f.q}</span>
                    <span aria-hidden="true" className="text-dusty-rose group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-lg text-warm-brown leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDERS */}
        <section id="founders" className="scroll-mt-16">
          <div className="max-w-2xl mx-auto px-5 py-14 text-center">
            <h2 className="font-type font-bold text-3xl text-deep-plum mb-5">Tim &amp; Cherie</h2>
            <p className="text-xl text-warm-brown leading-relaxed mb-4">
              We are Tim and Cherie Flanagan, a husband and wife in Salado, Texas. For 30 years we have built{" "}
              <a className="underline text-deep-plum py-1 inline-block" href="https://www.solasgallery.com">Solas Gallery</a> and a life around art,
              story, and community.
            </p>
            <p className="text-xl text-warm-brown leading-relaxed">
              Sister Wisdoms comes from the same place: something made with care, that someone gets to hold.
            </p>
          </div>
        </section>
      </div>

      <footer className="bg-deep-plum text-soft-white">
        <div className="max-w-5xl mx-auto px-5 py-8 font-type text-sm flex flex-col sm:flex-row gap-2 justify-between">
          <span>Sister Wisdoms · Salado, Texas · A Solas Gallery venture</span>
          <a className="underline py-3 inline-block" href="https://www.solasgallery.com">solasgallery.com</a>
        </div>
      </footer>
    </>
  );
}
