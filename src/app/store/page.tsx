import type { Metadata } from "next";
import Image from "next/image";
import { Carousel } from "@/components/store/StoreChrome";
import { TLink } from "@/components/site/TLink";
import { JsonLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { products, productsIn } from "@/data/store";
import { SITE_URL, site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Official KM Store: Merch, Helmets & Champion Collection",
  description: `Shop the official ${site.name} store: Champion Collection hoodies and tees, scale replica helmets, track jackets, caps and accessories. Free UK shipping over £150.`,
  path: "/store",
  keywords: ["Kai Mercer merch", "Kai Mercer store", "F1 merchandise", "F1 driver hoodie", "replica F1 helmet"],
});

export default function StoreHome() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Store", path: "/store" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "OnlineStore",
            name: `${site.name} Official Store`,
            url: `${SITE_URL}/store`,
            brand: { "@type": "Brand", name: "KM" },
          },
        ]}
      />
      <section className="st-hero">
        <Image src="/images/store-hero.jpg" alt="Models wearing KM store tees" fill priority sizes="100vw" />
        <div className="st-hero__copy">
          <h1 className="st-hero__title">KM Store</h1>
          <TLink href="/store/collections/all" className="st-hero__cta">
            Shop all
          </TLink>
        </div>
      </section>

      <Carousel title="Featured" items={products.slice(0, 8)} viewAll="/store/collections/all" />

      <section className="st-band">
        <Image src="/images/store-lifestyle-01.jpg" alt="KM streetwear on location" fill sizes="100vw" />
        <div className="st-band__copy">
          <p className="st-band__kicker">New season</p>
          <h2 className="st-band__title">Grandstand collection</h2>
          <TLink href="/store/collections/grandstand" className="store-btn">
            Shop now
          </TLink>
        </div>
      </section>

      <Carousel title="New arrivals" items={productsIn("new-arrivals")} viewAll="/store/collections/new-arrivals" />

      <section className="st-split">
        <div className="st-split__item">
          <Image src="/images/store-lifestyle-02.jpg" alt="KM essentials worn on the street" fill sizes="50vw" />
          <TLink href="/store/collections/essentials" className="st-split__label">
            Essentials
          </TLink>
        </div>
        <div className="st-split__item">
          <Image src="/images/champion-hoodie.jpg" alt="Champion Collection hoodie" fill sizes="50vw" />
          <TLink href="/store/collections/champion" className="st-split__label">
            Champion collection
          </TLink>
        </div>
      </section>

      <Carousel title="Hoodies & jackets" items={productsIn("hoodies-and-jackets")} viewAll="/store/collections/hoodies-and-jackets" />

      <section className="st-band st-band--short">
        <Image src="/images/store-lifestyle-03.jpg" alt="KM streetwear lifestyle" fill sizes="100vw" />
      </section>
    </>
  );
}
