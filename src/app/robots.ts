import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/capture"] },
    sitemap: "https://www.sisterwisdoms.com/sitemap.xml",
  };
}
