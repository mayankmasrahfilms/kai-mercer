import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name}'s official website collects, uses and protects your personal information.`,
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <section className="text-page" data-theme="dark">
      <div className="text-page__inner">
        <h1 className="display">
          Privacy <span className="serif">policy</span>
        </h1>
        <p>Last updated: 23 November 2026.</p>
        <p>
          This policy explains how {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information when you visit this website or
          shop in the KM store.
        </p>
        <h2>What we collect</h2>
        <p>
          We collect the details you give us directly, such as your email address when you sign up for early access, and the order and
          delivery details you provide at checkout. We also collect basic, anonymous analytics about how the site is used.
        </p>
        <h2>How we use it</h2>
        <ul>
          <li>To process and deliver your orders.</li>
          <li>To send you news and early access offers, if you have opted in.</li>
          <li>To understand how the site performs and improve it.</li>
        </ul>
        <h2>Cookies</h2>
        <p>We use essential cookies to keep your bag and preferences, and optional analytics cookies that you can decline.</p>
        <h2>Your rights</h2>
        <p>
          You can ask to see, correct or delete your personal data at any time by emailing{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
      </div>
    </section>
  );
}
