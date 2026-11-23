export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  image2?: string;
  badge?: "New arrival" | "Made to order" | "Sold out";
  soldOut?: boolean;
  sizes?: string[];
  collections: string[];
  description: string[];
  details: string[];
};

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  {
    slug: "1-2-scale-2026-season-helmet",
    name: "1:2 Scale 2026 Season Helmet",
    price: 189,
    image: "/images/replica-season.webp",
    image2: "/images/replica-gold.webp",
    badge: "Made to order",
    collections: ["accessories", "helmets", "new-arrivals"],
    description: [
      "A half-scale replica of the helmet Kai races in the 2026 season, hand-finished and individually numbered.",
      "Supplied with a clear display case and a certificate of authenticity.",
    ],
    details: ["Scale 1:2", "Hand-painted livery", "Display case included", "Made to order: ships in 8–10 weeks"],
  },
  {
    slug: "1-5-scale-midnight-helmet",
    name: "1:5 Scale Midnight Helmet",
    price: 49,
    image: "/images/replica-midnight.webp",
    image2: "/images/replica-darkmode.webp",
    badge: "Made to order",
    collections: ["accessories", "helmets"],
    description: ["The Midnight special-edition helmet, reproduced at 1:5 scale for your desk or shelf."],
    details: ["Scale 1:5", "Resin shell", "Gift box included"],
  },
  {
    slug: "champion-hoodie",
    name: "Champion Hoodie",
    price: 85,
    image: "/images/champion-hoodie.jpg",
    image2: "/images/store-lifestyle-03.jpg",
    badge: "New arrival",
    sizes: APPAREL,
    collections: ["hoodies-and-jackets", "champion", "new-arrivals"],
    description: [
      "Heavyweight brushed-back hoodie from the Champion Collection, finished with a puff-print KM7 graphic on the back.",
    ],
    details: ["480gsm cotton fleece", "Relaxed fit", "Puff print", "Machine wash cold"],
  },
  {
    slug: "champion-tee",
    name: "Champion Tee",
    price: 40,
    image: "/images/champion-tee.jpg",
    sizes: APPAREL,
    collections: ["tees", "champion"],
    description: ["Boxy black tee with the Champion Collection crest on the chest."],
    details: ["100% organic cotton", "Boxy fit", "Screen printed"],
  },
  {
    slug: "winter-knit-crew",
    name: "Winter Knit Crew",
    price: 95,
    image: "/images/product-sweater.jpg",
    badge: "New arrival",
    sizes: APPAREL,
    collections: ["hoodies-and-jackets", "new-arrivals"],
    description: ["A chunky knit for cold paddock mornings, with a tonal KM monogram at the cuff."],
    details: ["Lambswool blend", "Regular fit", "Hand wash"],
  },
  {
    slug: "fluro-blob-tumbler",
    name: "Fluro Blob Tumbler",
    price: 35,
    image: "/images/product-tumbler.jpg",
    badge: "Sold out",
    soldOut: true,
    collections: ["accessories"],
    description: ["Double-walled travel tumbler wrapped in the fluro blob pattern."],
    details: ["Holds 600ml", "Keeps drinks hot for 6 hours", "Hand wash only"],
  },
  {
    slug: "km-track-jacket",
    name: "KM Track Jacket",
    price: 85,
    image: "/images/product-jacket.jpg",
    sizes: APPAREL,
    collections: ["hoodies-and-jackets", "new-arrivals"],
    description: ["A paddock-ready track jacket with contrast piping and an embroidered KM crest."],
    details: ["Recycled polyester", "Full zip", "Embroidered badge"],
  },
  {
    slug: "km-track-pants",
    name: "KM Track Pants",
    price: 65,
    image: "/images/product-trackpants.jpg",
    sizes: APPAREL,
    collections: ["bottoms"],
    description: [
      "Relaxed, versatile and made to go beyond the track, the KM Track Pants are designed for everything from downtime to race days.",
      "Finished with signature KM details, including subtle fluro accents and an embroidered badge.",
      "Wear them as part of the full tracksuit or pair them with your everyday wardrobe staples.",
    ],
    details: ["Recycled polyester", "Elasticated waist with drawcord", "Zip pockets", "Tapered leg"],
  },
  {
    slug: "km-season-hoodie",
    name: "KM Season Hoodie",
    price: 75,
    image: "/images/product-hoodie.jpg",
    image2: "/images/store-lifestyle-01.jpg",
    sizes: APPAREL,
    collections: ["hoodies-and-jackets"],
    description: ["The 2026 season hoodie in high-vis yellow, built for the grandstands."],
    details: ["Cotton blend fleece", "Kangaroo pocket", "Regular fit"],
  },
  {
    slug: "km-core-tee",
    name: "KM Core Tee",
    price: 35,
    image: "/images/product-tee.jpg",
    sizes: APPAREL,
    collections: ["tees"],
    description: ["The everyday white tee with a small KM monogram on the chest."],
    details: ["100% cotton", "Regular fit"],
  },
  {
    slug: "washed-blob-cap",
    name: "Washed Blob Cap",
    price: 32,
    image: "/images/product-cap.jpg",
    collections: ["headwear", "accessories"],
    description: ["A garment-washed six-panel cap with a tonal blob embroidery."],
    details: ["Cotton twill", "Adjustable strap", "One size"],
  },
  {
    slug: "km-core-mug",
    name: "KM Core Mug",
    price: 18,
    image: "/images/product-mug.jpg",
    collections: ["accessories"],
    description: ["A ceramic mug for pit-wall coffee, printed with the KM monogram."],
    details: ["Holds 330ml", "Dishwasher safe"],
  },
  {
    slug: "champion-socks",
    name: "Champion Socks",
    price: 16,
    image: "/images/product-socks.jpg",
    sizes: ["S/M", "L/XL"],
    collections: ["accessories", "champion"],
    description: ["Ribbed crew socks in racing green from the Champion Collection."],
    details: ["Cotton blend", "Ribbed cuff"],
  },
];

export const collections: { slug: string; title: string; group: "store" | "collections"; description: string }[] = [
  { slug: "new-arrivals", title: "New Arrivals", group: "store", description: "The latest drops from the KM store." },
  { slug: "tees", title: "Tees", group: "store", description: "Official Kai Mercer t-shirts." },
  { slug: "hoodies-and-jackets", title: "Hoodies & Jackets", group: "store", description: "Hoodies, knits and jackets for race weekends and beyond." },
  { slug: "bottoms", title: "Bottoms", group: "store", description: "Track pants and joggers." },
  { slug: "headwear", title: "Headwear", group: "store", description: "Caps and beanies." },
  { slug: "accessories", title: "Accessories", group: "store", description: "Mugs, tumblers, socks and scale helmets." },
  { slug: "km-kids", title: "KM Kids", group: "store", description: "Kai Mercer merchandise for younger fans." },
  { slug: "gift-cards", title: "Gift Cards", group: "store", description: "KM store gift cards." },
  { slug: "all", title: "Shop All", group: "store", description: "Every product in the official Kai Mercer store." },
  { slug: "champion", title: "Champion Collection", group: "collections", description: "Limited pieces celebrating the title fight." },
  { slug: "helmets", title: "Scale Helmets", group: "collections", description: "Collectible scale replicas of Kai's race helmets." },
  { slug: "essentials", title: "Essentials", group: "collections", description: "Everyday staples with the KM monogram." },
  { slug: "grandstand", title: "Grandstand", group: "collections", description: "Fluro-loud kit for race day." },
  { slug: "blob-collection", title: "Blob Collection", group: "collections", description: "The signature blob pattern, everywhere." },
];

const essentials = ["km-core-tee", "km-core-mug", "washed-blob-cap", "km-track-pants", "km-track-jacket"];
const grandstand = ["km-season-hoodie", "km-track-jacket", "km-track-pants", "washed-blob-cap"];
const blob = ["fluro-blob-tumbler", "washed-blob-cap", "1-2-scale-2026-season-helmet"];

export function productsIn(slug: string): Product[] {
  if (slug === "all") return products;
  if (slug === "essentials") return products.filter((p) => essentials.includes(p.slug));
  if (slug === "grandstand") return products.filter((p) => grandstand.includes(p.slug));
  if (slug === "blob-collection") return products.filter((p) => blob.includes(p.slug));
  return products.filter((p) => p.collections.includes(slug));
}

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (n: number) => `£${n.toFixed(2)} GBP`;

export const faq = [
  {
    title: "Pre-orders",
    items: [
      { q: "What is a pre-order?", a: "A pre-order lets you reserve a product before it is in stock. We take payment when you order and ship as soon as stock arrives." },
      { q: "Can I add to my pre-order?", a: "Each pre-order is processed on its own. If you want more items, place a new order and we will ship them separately." },
      { q: "What do I need to provide when I make a pre-order?", a: "Just your delivery address and payment details. We will email you updates as your order progresses." },
      { q: "Will I know if the shipping date changes for my pre-order?", a: "Yes. If the estimated dispatch date moves, we will email you straight away." },
      { q: "Can I change my shipping address?", a: "Contact our support team before your order ships and we will update it for you." },
      { q: "What happens if I cancel my pre-order?", a: "You can cancel any time before dispatch for a full refund to your original payment method." },
    ],
  },
  {
    title: "Payment methods",
    items: [
      { q: "Which payment methods do you accept?", a: "We accept all major credit and debit cards, Apple Pay, Google Pay and PayPal." },
      { q: "Store credit & gift cards", a: "Gift cards and store credit can be applied at checkout. Any remaining balance stays on the card for next time." },
      { q: "Can I pay in instalments?", a: "Yes. Pay-in-three is available at checkout on orders over £30." },
    ],
  },
  {
    title: "Gift cards",
    items: [
      { q: "Can gift cards be used more than once?", a: "Yes. If there is a balance remaining after your purchase, you can use the same gift card code again until the full balance is spent." },
      { q: "Are gift cards refundable?", a: "Gift cards are not refundable and cannot be exchanged for cash." },
      { q: "How do gift cards work for international customers?", a: "Gift cards are issued in GBP and are converted to your local currency at checkout." },
    ],
  },
  {
    title: "Returns & exchanges",
    items: [
      { q: "What is your returns and refund policy?", a: "You can return unworn items within 30 days of delivery for a full refund. Made-to-order items cannot be returned unless faulty." },
      { q: "I received a damaged product. What do I do?", a: "Email us a photo of the damage within 14 days and we will send a replacement or a full refund." },
      { q: "Do you provide return labels?", a: "UK customers get a free prepaid return label. International customers pay for return shipping." },
      { q: "Can I exchange an item?", a: "Yes. Start a return and place a new order for the size or item you want." },
    ],
  },
];
