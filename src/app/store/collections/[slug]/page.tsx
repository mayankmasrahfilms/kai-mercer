import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/store/StoreChrome";
import { JsonLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { collections, productsIn } from "@/data/store";
import { SITE_URL, site } from "@/data/site";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/store/collections/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.title} | KM Store`,
    description: `${c.description} Shop ${c.title.toLowerCase()} from the official ${site.name} store.`,
    path: `/store/collections/${c.slug}`,
    keywords: [`Kai Mercer ${c.title}`, `F1 ${c.title.toLowerCase()}`],
  });
}

export default async function CollectionPage(props: PageProps<"/store/collections/[slug]">) {
  const { slug } = await props.params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) notFound();
  const items = productsIn(c.slug);

  return (
    <section className="coll">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Store", path: "/store" },
            { name: c.title, path: `/store/collections/${c.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: c.title,
            description: c.description,
            url: `${SITE_URL}/store/collections/${c.slug}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/store/products/${p.slug}`, name: p.name })),
            },
          },
        ]}
      />
      <header className="coll__head">
        <h1 className="coll__title">{c.title}</h1>
        <p className="coll__desc">{c.description}</p>
        <p className="coll__count">{items.length} products</p>
      </header>
      {items.length ? (
        <div className="coll__grid">
          {items.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <p className="coll__empty">No products in this collection yet. Check back soon.</p>
      )}
    </section>
  );
}
