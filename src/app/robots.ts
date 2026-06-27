import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/_next/", "/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
