import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Mona_Sans, Mr_Dafoe } from "next/font/google";
import { Experience } from "@/components/site/Experience";
import { JsonLd, personLd } from "@/lib/seo";
import { SITE_URL, site } from "@/data/site";
import "./globals.css";

const sans = Mona_Sans({ subsets: ["latin"], variable: "--font-sans", axes: ["wdth"], display: "swap" });
const serif = Libre_Caslon_Display({ subsets: ["latin"], weight: "400", variable: "--font-serif", display: "swap" });
const script = Mr_Dafoe({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });

const title = "Kai Mercer | Official Website of F1 Driver #7";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Kai Mercer" },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "sports",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_GB",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Kai Mercer — F1 driver #7" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#282c20",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable} ${script.variable}`}>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: site.name,
                description: site.description,
                inLanguage: "en-GB",
                publisher: { "@id": `${SITE_URL}/#person` },
              },
              personLd,
            ],
          }}
        />
        <Experience>{children}</Experience>
      </body>
    </html>
  );
}
