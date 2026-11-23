import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `The terms that apply when you use ${site.name}'s official website and the KM store.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="text-page" data-theme="dark">
      <div className="text-page__inner">
        <h1 className="display">
          Terms <span className="serif">of use</span>
        </h1>
        <p>Last updated: 23 November 2026.</p>
        <h2>Using this site</h2>
        <p>
          By using this website you agree to these terms. The content on this site, including photography, logos and design, is provided for
          personal, non-commercial use only.
        </p>
        <h2>Store orders</h2>
        <p>
          Prices are shown in GBP and include VAT where applicable. Made-to-order items are produced after purchase and their dispatch dates are
          estimates. Our returns policy is set out in the store FAQ.
        </p>
        <h2>Liability</h2>
        <p>We work hard to keep information on this site accurate, but race schedules and results can change without notice.</p>
        <h2>Contact</h2>
        <p>
          Questions about these terms? Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
      </div>
    </section>
  );
}
