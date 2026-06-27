import type { MetadataRoute } from "next";
import { MENU_ITEMS } from "@/data/content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                              priority: 1.0,  changeFrequency: "weekly" },
    { url: `${BASE}/city-chops`,             priority: 0.9,  changeFrequency: "weekly" },
    { url: `${BASE}/city-chops/menu`,        priority: 0.8,  changeFrequency: "weekly" },
    { url: `${BASE}/city-chops/catering`,    priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE}/city-chops/order`,       priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE}/tigernut-mill`,          priority: 0.9,  changeFrequency: "weekly" },
    { url: `${BASE}/tigernut-mill/products`, priority: 0.8,  changeFrequency: "weekly" },
    { url: `${BASE}/tigernut-mill/order`,    priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE}/about`,                  priority: 0.5,  changeFrequency: "monthly" },
    { url: `${BASE}/contact`,                priority: 0.6,  changeFrequency: "monthly" },
    { url: `${BASE}/services`,               priority: 0.8,  changeFrequency: "weekly"  },
    { url: `${BASE}/testimonials`,           priority: 0.6,  changeFrequency: "monthly" },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = [
    "waina", "puff-puff", "samosa", "peppery-meat", "cakes", "catering",
  ].map((slug) => ({
    url: `${BASE}/city-chops/menu/${slug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  const productRoutes: MetadataRoute.Sitemap = MENU_ITEMS.filter(
    (i) => i.brand === "fresh-tigernut"
  ).map((item) => ({
    url: `${BASE}/tigernut-mill/products/${item.id}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
