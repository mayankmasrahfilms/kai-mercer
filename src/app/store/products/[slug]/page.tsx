import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/store/StoreChrome";
import { Accordion, ProductForm } from "@/components/store/ProductForm";
import { JsonLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { formatPrice, getProduct, products } from "@/data/store";
import { SITE_URL, site } from "@/data/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/store/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} | Official KM Store`,
    description: `${p.description[0]} ${formatPrice(p.price)} from the official ${site.name} store.`,
    path: `/store/products/${p.slug}`,
    keywords: [p.name, `${site.name} ${p.name}`, "Kai Mercer merch"],
    image: p.image,
  });
}

export default async function ProductPage(props: PageProps<"/store/products/[slug]">) {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Store", path: "/store" },
            { name: p.name, path: `/store/products/${p.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            image: [`${SITE_URL}${p.image}`],
            description: p.description.join(" "),
            sku: p.slug,
            brand: { "@type": "Brand", name: "KM" },
            offers: {
              "@type": "Offer",
              url: `${SITE_URL}/store/products/${p.slug}`,
              priceCurrency: "GBP",
              price: p.price.toFixed(2),
              availability: p.soldOut ? "https://schema.org/OutOfStock" : p.badge === "Made to order" ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
            },
          },
        ]}
      />
      <section className="pdp">
        <div className="pdp__info">
          {p.badge && <span className="pcard__badge pdp__badge">{p.badge}</span>}
          <h1 className="pdp__title">{p.name}</h1>
          <p className="pdp__price">{formatPrice(p.price)}</p>
          <div className="pdp__desc">
            {p.description.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
          <ProductForm p={p} />
          <Accordion
            items={[
              { title: "Product details", body: <ul>{p.details.map((d) => <li key={d}>{d}</li>)}</ul> },
              { title: "Size guide", body: <p>Model is 6&prime;1&Prime; and wears size M. If you are between sizes, we recommend sizing up for a relaxed fit.</p> },
              { title: "Care guide", body: <p>Wash cold inside out with similar colours. Do not tumble dry. Iron on reverse.</p> },
              { title: "Shipping", body: <p>Free UK shipping on orders over £150. Standard UK delivery 2–4 working days; international 5–10 working days.</p> },
            ]}
          />
        </div>
        <div className="pdp__gallery">
          <div className="pdp__img">
            <Image src={p.image} alt={p.name} fill priority sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
          {p.image2 && (
            <div className="pdp__img">
              <Image src={p.image2} alt={`${p.name} — alternate view`} fill sizes="(max-width: 860px) 100vw, 50vw" />
            </div>
          )}
        </div>
      </section>
      <div className="pdp__related">
        <Carousel title="You might also like" items={related} />
      </div>
    </>
  );
}
