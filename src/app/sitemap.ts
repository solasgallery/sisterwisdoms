import type { MetadataRoute } from "next";

// One indexable page. /capture is the in-person QR page and stays out (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://sisterwisdoms.com", changeFrequency: "weekly", priority: 1 }];
}
