import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      {/* Newsletter Band */}
      <div className="bg-deep-plum text-soft-white py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h3 className="font-handwritten text-3xl mb-2">Stay in the loop</h3>
          <p className="text-sm tracking-wide opacity-80 mb-6">
            Be the first to know about new collections, mailing dates, and
            little surprises.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full bg-soft-white/10 border border-soft-white/20 text-soft-white placeholder:text-soft-white/40 text-sm focus:outline-none focus:border-gold-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold-accent text-charcoal rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-gold-accent/90 transition-colors"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <span className="font-handwritten text-2xl text-blush block mb-3">
            Sister Wisdoms
          </span>
          <p className="text-cream/60 leading-relaxed">
            Hand-curated letters of wisdom, story, and connection — delivered to
            your mailbox.
          </p>
        </div>
        <div>
          <h4 className="text-gold-accent uppercase tracking-widest text-xs font-semibold mb-4">
            Explore
          </h4>
          <div className="space-y-2">
            <Link href="/how-it-works" className="block hover:text-blush transition-colors">
              How It Works
            </Link>
            <Link href="/collections" className="block hover:text-blush transition-colors">
              Collections
            </Link>
            <Link href="/gift" className="block hover:text-blush transition-colors">
              Give a Gift
            </Link>
            <Link href="/subscribe" className="block hover:text-blush transition-colors">
              Subscribe
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-gold-accent uppercase tracking-widest text-xs font-semibold mb-4">
            Learn More
          </h4>
          <div className="space-y-2">
            <Link href="/about" className="block hover:text-blush transition-colors">
              Our Story
            </Link>
            <Link href="/faq" className="block hover:text-blush transition-colors">
              FAQ
            </Link>
            <Link href="/mailing-dates" className="block hover:text-blush transition-colors">
              Mailing Dates
            </Link>
            <Link href="/contact" className="block hover:text-blush transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-gold-accent uppercase tracking-widest text-xs font-semibold mb-4">
            Policies
          </h4>
          <div className="space-y-2">
            <Link href="/terms" className="block hover:text-blush transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="block hover:text-blush transition-colors">
              Privacy Policy
            </Link>
            <Link href="/shipping" className="block hover:text-blush transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/40 tracking-wide">
        © {new Date().getFullYear()} Sister Wisdoms · Salado, Texas · A Solas
        Gallery venture
      </div>
    </footer>
  );
}
