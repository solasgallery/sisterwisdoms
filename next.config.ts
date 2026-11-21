import type { NextConfig } from "next";

// Old multi-page URLs (indexed or linked in the past) fold into the one-page site.
const legacy: Record<string, string> = {
  "/about": "/#founders",
  "/collections": "/#how",
  "/contact": "/#gift",
  "/faq": "/#faq",
  "/gift": "/#gift",
  "/how-it-works": "/#how",
  "/mailing-dates": "/#how",
  "/subscribe": "/#gift",
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
