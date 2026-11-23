import type { Metadata } from "next";
import { Accordion } from "@/components/store/ProductForm";
import { JsonLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { faq } from "@/data/store";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Store FAQ: Orders, Pre-orders, Returns & Gift Cards",
  description: `Answers to common questions about ordering from the ${site.name} store: pre-orders, payment methods, gift cards, shipping, returns and exchanges.`,
  path: "/store/faq",
  keywords: ["Kai Mercer store FAQ", "KM store returns", "KM store shipping"],
});

export default function FaqPage() {
  return (
    <section className="faq">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Store", path: "/store" },
            { name: "FAQ", path: "/store/faq" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.flatMap((g) =>
              g.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } }))
            ),
          },
        ]}
      />
      <h1 className="faq__title">Frequently asked questions</h1>
      <p className="faq__intro">
        We have done our best to answer most of the FAQs. Most questions you will have will be answered in the sections below, so before you email
        us, please check them out. If you cannot find the answer you are looking for, please reach out to us via email at{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
      </p>
      {faq.map((g) => (
        <div className="faq__group" key={g.title}>
          <h2 className="faq__group-title">{g.title}</h2>
          <Accordion items={g.items.map((it) => ({ title: it.q, body: <p>{it.a}</p> }))} />
        </div>
      ))}
    </section>
  );
}
