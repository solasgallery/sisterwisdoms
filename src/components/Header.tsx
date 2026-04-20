"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-soft-white/90 backdrop-blur-sm border-b border-blush/30 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span className="text-2xl md:text-3xl font-handwritten font-semibold text-deep-plum tracking-wide">
            Sister Wisdoms
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase font-medium">
          <Link
            href="/how-it-works"
            className="text-warm-brown hover:text-deep-plum transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/collections"
            className="text-warm-brown hover:text-deep-plum transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/gift"
            className="text-warm-brown hover:text-deep-plum transition-colors"
          >
            Give a Gift
          </Link>
          <Link
            href="/about"
            className="text-warm-brown hover:text-deep-plum transition-colors"
          >
            Our Story
          </Link>
          <a
            href="https://square.link/u/gxCxzA38"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-deep-plum text-soft-white px-6 py-2.5 rounded-full hover:bg-warm-brown transition-colors tracking-wider"
          >
            Subscribe
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-deep-plum"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-soft-white border-t border-blush/20 px-6 py-6 space-y-4 text-center text-sm tracking-widest uppercase font-medium">
          <Link
            href="/how-it-works"
            className="block text-warm-brown hover:text-deep-plum"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/collections"
            className="block text-warm-brown hover:text-deep-plum"
            onClick={() => setMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            href="/gift"
            className="block text-warm-brown hover:text-deep-plum"
            onClick={() => setMenuOpen(false)}
          >
            Give a Gift
          </Link>
          <Link
            href="/about"
            className="block text-warm-brown hover:text-deep-plum"
            onClick={() => setMenuOpen(false)}
          >
            Our Story
          </Link>
          <a
            href="https://square.link/u/gxCxzA38"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-deep-plum text-soft-white px-8 py-3 rounded-full mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Subscribe
          </a>
        </nav>
      )}
    </header>
  );
}
