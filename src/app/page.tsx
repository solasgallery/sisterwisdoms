import WaitlistForm from "@/components/WaitlistForm";
import { SITE } from "@/lib/config";

// Teaser page: what it is, the price the live site shows, and the waitlist. No dates, no order flow, no FAQ.
const jsonLd = {
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
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div id="top">
        {/* HERO */}
        <section className="bg-gradient-to-b from-blush/25 to-cream">
          <div className="max-w-2xl mx-auto px-5 py-16 md:py-24 text-center">
            <p className="font-type text-sm uppercase tracking-[0.2em] text-warm-brown mb-4">A letter, by mail</p>
            <h1 className="font-type font-bold text-4xl md:text-6xl text-deep-plum leading-tight mb-4">Sister Wisdoms</h1>
            <p className="font-type text-xl md:text-2xl text-deep-plum mb-6">Something beautiful is on its way</p>
            <p className="text-xl md:text-2xl text-warm-brown leading-relaxed mb-4">
              One paper letter a month from a wise old friend, mailed to someone you love.
            </p>
            <p className="text-lg text-warm-brown mb-2">{SITE.priceLabel}.</p>
            <p className="font-type text-lg text-deep-plum">We&apos;re launching soon.</p>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="scroll-mt-16 bg-soft-white border-y border-blush/30">
          <div className="max-w-2xl mx-auto px-5 py-14">
            <h2 className="font-type font-bold text-3xl text-deep-plum mb-8 text-center">Join the waitlist</h2>
            <WaitlistForm />
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
