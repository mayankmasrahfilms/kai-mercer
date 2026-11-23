import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { collections, products } from "@/data/store";

const LAST_MODIFIED = new Date("2026-11-23");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], images?: string[]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
    ...(images ? { images: images.map((i) => `${SITE_URL}${i}`) } : {}),
  });

  return [
    page("/", 1, "weekly", ["/images/hero-portrait.jpg"]),
    page("/calendar", 0.9, "daily"),
    page("/on-track", 0.9, "weekly", ["/images/helmet-04.jpg"]),
    page("/store", 0.8, "weekly", ["/images/store-hero.jpg"]),
    page("/store/faq", 0.4, "monthly"),
    ...collections.map((c) => page(`/store/collections/${c.slug}`, 0.6, "weekly")),
    ...products.map((p) => page(`/store/products/${p.slug}`, 0.7, "weekly", [p.image])),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
