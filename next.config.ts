import type { NextConfig } from "next";

// Old multi-page URLs (indexed or linked in the past) fold into the one-page site.
const legacy: Record<string, string> = {
  "/about": "/#founders",
  "/collections": "/",
  "/contact": "/#waitlist",
  "/faq": "/",
  "/gift": "/#waitlist",
  "/how-it-works": "/",
  "/mailing-dates": "/",
  "/subscribe": "/#waitlist",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacy).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
