import type { Metadata } from "next";
import { SITE_URL, site } from "@/data/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "profile" | "article";
};

/** Builds consistent per-page metadata: canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, keywords = [], image = "/og.jpg", type = "website" }: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords: [...keywords, ...site.keywords],
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: "en_GB",
      images: [image === "/og.jpg" ? { url: image, width: 1200, height: 630, alt: title } : { url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be emitted as raw JSON; escape "<" so content can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: site.name,
  givenName: site.first,
  familyName: site.last,
  jobTitle: "Formula 1 Driver",
  nationality: site.nationality,
  birthDate: site.born,
  url: SITE_URL,
  image: `${SITE_URL}/images/hero-person.webp`,
  memberOf: { "@type": "SportsTeam", name: site.team, sport: "Formula 1" },
  sameAs: site.socials.map((s) => s.href),
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
