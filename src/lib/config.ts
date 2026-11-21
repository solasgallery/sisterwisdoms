// Single source for site-wide constants on sisterwisdoms.com.
// Teaser posture: no launch or mailing dates anywhere on the site.

export const SITE = {
  url: "https://www.sisterwisdoms.com",
  name: "Sister Wisdoms",
  priceLabel: "$18 a month", // $18/mo, locked by Tim 2026-11-21 and shown on the live site. $12/mo and $120/yr are superseded.
};

export const isPreview = () => process.env.VERCEL_ENV === "preview";
