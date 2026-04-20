import type { Metadata } from "next";

const ANNUAL_LINK = "https://square.link/u/gxCxzA38";

export const metadata: Metadata = {
  title: "Collections — Sister Wisdoms",
  description:
    "Explore our curated letter collections. Each series is a year of monthly letters built around themes of wisdom, sisterhood, and the seasons of a woman's life.",
};

const collections = [
  {
    title: "The Wisdom Circle",
    subtitle: "Resilience · Grace · Quiet Strength",
    description:
      "Twelve letters exploring the hard-won wisdom women carry — about perseverance, letting go, holding on, and finding peace in the space between. Each letter arrives with a story, a reflection, and a question worth sitting with.",
    accent: "#C4A35A",
    letters: 12,
  },
  {
    title: "Letters to My Sister",
    subtitle: "Motherhood · Friendship · Joy · Loss",
    description:
      "The conversations we wish we'd had sooner. Written as one woman to another, these letters cover the territory of a life shared — the messy, the beautiful, and everything we learn along the way.",
    accent: "#C9929B",
    letters: 12,
  },
  {
    title: "Seasons of Her",
    subtitle: "Spring · Summer · Autumn · Winter",
    description:
      "A year-long journey through the metaphorical seasons of womanhood. Each letter is timed to the turning of the year, connecting the natural world to the inner one. Arrives when you need it most.",
    accent: "#8B9E82",
    letters: 12,
  },
];

export default function CollectionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush/20 to-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl text-dusty-rose mb-3">
            Stories told through letters
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-deep-plum mb-6">
            Our Collections
          </h1>
          <p className="text-warm-brown/80 text-lg leading-relaxed max-w-xl mx-auto">
            Each collection is a year-long series of 12 letters, mailed monthly.
            Choose the one that speaks to you — or give one to someone who
            needs it.
          </p>
        </div>
      </section>

      {/* Collection Cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {collections.map((c) => (
            <div
              key={c.title}
              className="bg-soft-white rounded-2xl p-10 md:p-12 border border-blush/20 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="w-16 h-1 rounded-full mb-6"
                style={{ backgroundColor: c.accent }}
              />
              <h2 className="font-handwritten text-3xl text-deep-plum mb-1">
                {c.title}
              </h2>
              <p className="text-xs uppercase tracking-widest text-dusty-rose font-medium mb-4">
                {c.subtitle}
              </p>
              <p className="text-warm-brown/80 leading-relaxed text-[0.95rem] mb-6 max-w-2xl">
                {c.description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={ANNUAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-deep-plum text-soft-white px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-warm-brown transition-colors"
                >
                  Subscribe
                </a>
                <a
                  href={ANNUAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-deep-plum text-deep-plum px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-deep-plum hover:text-soft-white transition-colors"
                >
                  Gift This Collection
                </a>
                <span className="text-sm text-warm-brown/50">
                  {c.letters} letters · Mailed monthly
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-blush/10 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-handwritten text-2xl text-dusty-rose mb-3">
            More collections coming soon
          </p>
          <p className="text-warm-brown/80 leading-relaxed">
            We&apos;re always writing. Sign up for our newsletter to be the
            first to know when new collections launch.
          </p>
        </div>
      </section>
    </>
  );
}
