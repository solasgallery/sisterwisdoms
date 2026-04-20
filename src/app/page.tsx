import Link from "next/link";

/* ── Square checkout links ── */
const MONTHLY_LINK = "https://square.link/u/zKWOP3BM";
const ANNUAL_LINK = "https://square.link/u/gxCxzA38";

/* ── Envelope icon (inline SVG) ── */
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
        strokeWidth="2.5"
      />
      <path
        d="M2 6l30 22L62 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Step card for "How It Works" ── */
function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center px-6">
      <div className="w-16 h-16 rounded-full bg-blush/30 flex items-center justify-center mx-auto mb-4">
        <span className="font-handwritten text-2xl text-deep-plum font-bold">
          {number}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-deep-plum mb-2">{title}</h3>
      <p className="text-warm-brown/80 leading-relaxed text-[0.95rem]">
        {description}
      </p>
    </div>
  );
}

/* ── Collection preview card ── */
function CollectionCard({
  title,
  subtitle,
  description,
  accent,
}: {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
}) {
  return (
    <div className="bg-soft-white rounded-2xl p-8 shadow-sm border border-blush/20 hover:shadow-md transition-shadow">
      <div
        className="w-12 h-1 rounded-full mb-4"
        style={{ backgroundColor: accent }}
      />
      <h3 className="font-handwritten text-2xl text-deep-plum mb-1">
        {title}
      </h3>
      <p className="text-xs uppercase tracking-widest text-dusty-rose font-medium mb-3">
        {subtitle}
      </p>
      <p className="text-warm-brown/80 leading-relaxed text-[0.95rem]">
        {description}
      </p>
    </div>
  );
}

/* ── Testimonial ── */
function Testimonial({
  quote,
  name,
  context,
}: {
  quote: string;
  name: string;
  context: string;
}) {
  return (
    <div className="bg-soft-white rounded-2xl p-8 border border-blush/15">
      <p className="text-warm-brown italic leading-relaxed mb-4 text-[0.95rem]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="text-sm">
        <span className="font-semibold text-deep-plum">{name}</span>
        <span className="text-dusty-rose ml-1">· {context}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-blush/20 via-cream to-cream py-24 md:py-32 overflow-hidden">
        {/* Decorative floating envelope */}
        <div className="absolute top-12 right-[10%] opacity-10 animate-float hidden lg:block">
          <EnvelopeIcon className="w-32 h-32 text-deep-plum" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl md:text-2xl text-dusty-rose mb-4">
            Something beautiful is coming in the mail.
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-deep-plum leading-tight mb-6 tracking-tight">
            Letters of wisdom, delivered <br className="hidden md:block" />
            <span className="font-handwritten font-semibold">
              with intention
            </span>
          </h1>
          <p className="text-warm-brown/80 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            A snail mail club for women who believe the mailbox still holds
            magic. Curated letters. Real paper. Lasting meaning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ANNUAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-deep-plum text-soft-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-warm-brown transition-colors"
            >
              Start Your Subscription
            </a>
            <a
              href={ANNUAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-deep-plum text-deep-plum px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-deep-plum hover:text-soft-white transition-colors"
            >
              Give as a Gift
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-soft-white border-y border-blush/20 py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-2 text-xs uppercase tracking-[0.2em] text-warm-brown/60 font-medium">
          <span>✦ Handwritten with care</span>
          <span>✦ Ships from Texas</span>
          <span>✦ Cancel anytime</span>
          <span>✦ Perfect for gifting</span>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-handwritten text-xl text-dusty-rose mb-2">
              Simple and meaningful
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-deep-plum">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              title="Choose Your Collection"
              description="Pick the letter series that speaks to you — or let us surprise you each month with our curated selection."
            />
            <StepCard
              number="2"
              title="We Write & Mail"
              description="Each letter is thoughtfully composed, printed on beautiful stationery, and mailed directly to your door."
            />
            <StepCard
              number="3"
              title="Open, Read, Keep"
              description="Slow down. Pour a cup of tea. Read something worth keeping. Every letter is yours to save and revisit."
            />
          </div>
          <div className="text-center mt-14">
            <Link
              href="/how-it-works"
              className="text-deep-plum border-b-2 border-deep-plum/30 hover:border-deep-plum pb-1 text-sm uppercase tracking-widest font-medium transition-colors"
            >
              Learn more about the experience
            </Link>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS PREVIEW ── */}
      <section className="bg-blush/10 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-handwritten text-xl text-dusty-rose mb-2">
              Stories told through letters
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-deep-plum">
              Our Collections
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CollectionCard
              title="The Wisdom Circle"
              subtitle="12 Monthly Letters"
              description="Reflections on resilience, grace, and the quiet strength women carry. Each letter holds a story, a lesson, and a question worth sitting with."
              accent="#C4A35A"
            />
            <CollectionCard
              title="Letters to My Sister"
              subtitle="12 Monthly Letters"
              description="The conversations we wish we'd had sooner — about motherhood, friendship, loss, joy, and everything we learn along the way."
              accent="#C9929B"
            />
            <CollectionCard
              title="Seasons of Her"
              subtitle="12 Monthly Letters"
              description="A year-long journey through the seasons of a woman's life, with each letter arriving just when you need it most."
              accent="#8B9E82"
            />
          </div>
          <div className="text-center mt-14">
            <a
              href={ANNUAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-deep-plum text-soft-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-warm-brown transition-colors inline-block"
            >
              Explore All Collections
            </a>
          </div>
        </div>
      </section>

      {/* ── GIFTING CALLOUT ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-deep-plum to-warm-brown rounded-3xl p-10 md:p-16 text-soft-white text-center relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-6 left-6 opacity-10">
              <EnvelopeIcon className="w-20 h-20 text-soft-white" />
            </div>
            <div className="absolute bottom-6 right-6 opacity-10 rotate-12">
              <EnvelopeIcon className="w-16 h-16 text-soft-white" />
            </div>

            <p className="font-handwritten text-2xl text-blush/80 mb-3 relative z-10">
              The gift she&apos;ll remember all year
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-6 relative z-10">
              Give a Sister Wisdoms Subscription
            </h2>
            <p className="text-soft-white/80 max-w-lg mx-auto leading-relaxed mb-8 relative z-10">
              Not another thing that collects dust. A year of handwritten
              letters — arriving one by one in her mailbox — is a gift that
              says you truly know her.
            </p>
            <a
              href={ANNUAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold-accent text-charcoal px-10 py-4 rounded-full text-sm tracking-widest uppercase font-semibold hover:bg-gold-accent/90 transition-colors relative z-10"
            >
              Send a Gift Subscription
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-blush/10 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-handwritten text-xl text-dusty-rose mb-2">
              In their own words
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-deep-plum">
              What Our Subscribers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              quote="I wait for my letter like I used to wait for Christmas morning. There's something about opening a real envelope that makes the whole world slow down."
              name="Margaret H."
              context="Subscriber since 2025"
            />
            <Testimonial
              quote="I gave this to my mother and my best friend. They both called me in tears — the good kind. This is the most thoughtful gift I've ever found."
              name="Dana R."
              context="Gift giver"
            />
            <Testimonial
              quote="Each letter feels like it was written just for me. I keep them in a box by my bed and re-read them on hard days. Pure comfort on paper."
              name="Kathleen S."
              context="Wisdom Circle subscriber"
            />
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDERS TEASER ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl text-dusty-rose mb-2">
            From our hearts to your mailbox
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-deep-plum mb-8">
            Meet the Creators
          </h2>
          <p className="text-warm-brown/80 leading-relaxed text-lg mb-4">
            Sister Wisdoms was born from a simple belief: that real paper, real
            words, and real connection still matter — maybe now more than ever.
          </p>
          <p className="text-warm-brown/80 leading-relaxed text-lg mb-8">
            We&apos;re Tim and Cherie Flanagan — a husband-and-wife team in the
            heart of Salado, Texas, where we&apos;ve spent 30 years building
            Solas Gallery and a life around art, story, and community. Sister
            Wisdoms is our newest way of putting something beautiful into the
            world.
          </p>
          <Link
            href="/about"
            className="text-deep-plum border-b-2 border-deep-plum/30 hover:border-deep-plum pb-1 text-sm uppercase tracking-widest font-medium transition-colors"
          >
            Read our full story
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-deep-plum py-20 text-center text-soft-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-handwritten text-4xl md:text-5xl mb-4">
            Something beautiful is waiting.
          </h2>
          <p className="text-soft-white/70 text-lg mb-10">
            Join the women who&apos;ve rediscovered the magic of the mailbox.
          </p>
          <a
            href={ANNUAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold-accent text-charcoal px-12 py-4 rounded-full text-sm tracking-widest uppercase font-semibold hover:bg-gold-accent/90 transition-colors"
          >
            Begin Your Subscription
          </a>
        </div>
      </section>
    </>
  );
}
