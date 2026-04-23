import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://sisterwisdoms.com/sitemap.xml",
    host: "https://sisterwisdoms.com",
  };
}
