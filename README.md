# Kai Mercer — F1 driver portfolio site

A motion-heavy website for a fictional Formula 1 driver, **Kai Mercer (#7)**, built with Next.js 16 (App Router), GSAP and Lenis smooth scrolling.

> **Design study.** The layout, sections and animations recreate the structure of a modern F1 driver website (landonorris.com). The name, copy, race data, partner wordmarks and photography are original or licensed stock. If you show it in a portfolio, label it as a recreation or design study.

## Pages

| URL | What's there |
| --- | --- |
| `/` | Lime preloader, cursor "helmet livery" hero reveal, hero → message card with signature, statement, parallax photo collage, On/Off track, helmets hall of fame, Champion Collection, partners marquee, socials card fan, footer |
| `/calendar` | 2026 calendar hero, 3D track visualiser, race table with hover image, season results, live race-day countdown |
| `/on-track` | ON TRACK hero, statement, podium counter, career stats, seasons, win highlights, junior titles, next race, helmets, socials |
| `/store` | Store home: carousels, lifestyle bands, early-access popup, bag drawer |
| `/store/collections/[slug]` | 14 collection pages |
| `/store/products/[slug]` | 13 product pages with size, quantity and add to bag |
| `/store/faq` | Store FAQ |
| `/privacy-policy`, `/terms` | Legal pages |

Every internal link plays the page transition: a giant lime **7** sweeps in, the KM monogram draws, then a 7-shaped window opens onto the next page.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (every page is static)
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel choose **Add New → Project** and import the repository. The Next.js preset is detected automatically; no build settings are needed.
3. Add the environment variable **`NEXT_PUBLIC_SITE_URL`** with your final URL (for example `https://kai-mercer.vercel.app` or your custom domain). It feeds canonical URLs, the sitemap, robots.txt, Open Graph tags and JSON-LD.
4. Deploy, then submit `https://<your-domain>/sitemap.xml` in Google Search Console.

## SEO included

- Unique `<title>`, meta description, keywords and canonical URL on every page
- Open Graph and Twitter cards with a 1200×630 share image (`public/og.jpg`; rebuild with `node scripts/build-og.mjs`)
- JSON-LD structured data: WebSite, Person, BreadcrumbList, ItemList of SportsEvent (calendar), Product + Offer, CollectionPage, OnlineStore, FAQPage
- `/sitemap.xml` (with image entries), `/robots.txt`, `/manifest.webmanifest`, SVG favicon and Apple touch icon
- Readable URLs, one `h1` per page, alt text on images, static HTML for a fast first paint
- `next/image` (AVIF/WebP, responsive sizes) and self-hosted Google Fonts via `next/font`
- `prefers-reduced-motion` respected: smooth scroll and heavy animation switch off

## Editing content

| What | File |
| --- | --- |
| Driver details, socials, nav, partners | `src/data/site.ts` |
| Races, results, stats, next race | `src/data/races.ts` |
| Helmets, collage, social cards, menu photos | `src/data/content.ts` |
| Store products, collections, FAQ | `src/data/store.ts` |
| Photos | `public/images/<slot>.jpg` (replace a file with your own photo of the same name) |

## Credits

Photos: Unsplash, free Unsplash License. See [CREDITS.md](CREDITS.md) for every photographer.
Fonts: Mona Sans, Libre Caslon Display and Mr Dafoe (Google Fonts, SIL Open Font License).
