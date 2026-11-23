/** Hall of Fame: cut-out helmets (repainted liveries) with a trackside photo on hover. */
export const helmets = [
  { name: "Season", year: "2026", image: "/images/hof-season-2026.webp", hover: "/images/helmet-worn-02.jpg" },
  { name: "Black Glitter", year: "2026", image: "/images/hof-glitter-2026.webp", hover: "/images/social-06.jpg" },
  { name: "Mirrorball", year: "2026", image: "/images/hof-mirrorball-2025.webp", hover: "/images/helmet-worn-01.jpg" },
  { name: "Season", year: "2025", image: "/images/hof-season-2025.webp", hover: "/images/social-03.jpg" },
  { name: "Porcelain", year: "2025", image: "/images/hof-porcelain-2025.webp", hover: "/images/helmet-worn-05.jpg" },
  { name: "Pixel", year: "2025", image: "/images/hof-pixel-2025.webp", hover: "/images/collage-02.jpg" },
  { name: "Sakura", year: "2025", image: "/images/hof-sakura-2025.webp", hover: "/images/social-05.jpg" },
  { name: "Dark Mode", year: "2025", image: "/images/hof-dark-mode-2025.webp", hover: "/images/helmet-worn-04.jpg" },
  { name: "Sticker Bomb", year: "2024", image: "/images/hof-stickers-2024.webp", hover: "/images/collage-09.jpg" },
  { name: "Desert Gold", year: "2024", image: "/images/hof-desert-2024.webp", hover: "/images/social-07.jpg" },
  { name: "Chrome", year: "2024", image: "/images/hof-chrome-2024.webp", hover: "/images/helmet-worn-03.jpg" },
  { name: "Beach Ball", year: "2024", image: "/images/hof-beach-2024.webp", hover: "/images/collage-03.jpg" },
  { name: "Hoops", year: "2023", image: "/images/hof-hoops-2023.webp", hover: "/images/race-car-03.jpg" },
  { name: "Season", year: "2023", image: "/images/hof-season-2023.webp", hover: "/images/social-08.jpg" },
  { name: "Home Race", year: "2022", image: "/images/hof-home-race-2022.webp", hover: "/images/collage-05.jpg" },
  { name: "Season", year: "2021", image: "/images/hof-season-2021.webp", hover: "/images/collage-01.jpg" },
] as { name: string; year: string; image: string; hover?: string }[];

/**
 * Horizontal photo strip (pinned; scrolls sideways). x / w are in viewport-width units along the strip,
 * y is the top offset as % of the screen height, ratio = height / width, mono = shown in black and white.
 */
export type CollageItem = {
  src: string;
  label: string;
  x: number;
  y: number;
  w: number;
  ratio: number;
  mono?: boolean;
  speed?: number;
  chip?: string;
};
export type CollageQuote = { x: number; y: number; w: number; text: string; bold: string[] };

export const collageHome: { width: number; items: CollageItem[]; quotes: CollageQuote[] } = {
  width: 236,
  items: [
    { src: "/images/collage-07.jpg", label: "Qatar, 2025", x: 29, y: 11, w: 12.4, ratio: 1.24 },
    { src: "/images/collage-04.jpg", label: "FIA Prize Giving, 2025", x: 35.8, y: 57, w: 13.3, ratio: 1, mono: true, speed: 1.15 },
    { src: "/images/collage-03.jpg", label: "Miami GP, 2025", x: 57, y: 35, w: 30, ratio: 0.91, speed: 0.9 },
    { src: "/images/store-lifestyle-03.jpg", label: "Monaco, 2024", x: 94, y: 11, w: 10, ratio: 0.95, mono: true, speed: 1.2 },
    { src: "/images/helmet-worn-02.jpg", label: "Britain, 2026", x: 101.5, y: 51, w: 14.5, ratio: 0.91, chip: "1" },
    { src: "/images/message-portrait.jpg", label: "High Performance Gala, 2025", x: 133, y: 19, w: 9.5, ratio: 1, mono: true, speed: 1.1 },
    { src: "/images/social-03.jpg", label: "Battersea, 2025", x: 123, y: 67, w: 9.8, ratio: 1.23, speed: 1.2 },
    { src: "/images/collage-06.jpg", label: "Barcelona, 2025", x: 150, y: 12, w: 28, ratio: 1, speed: 0.92 },
    { src: "/images/social-06.jpg", label: "Austria, 2025", x: 185.5, y: 61, w: 12.6, ratio: 0.92, mono: true, speed: 1.12 },
    { src: "/images/social-02.jpg", label: "Monza, 2025", x: 192.5, y: 22, w: 10.6, ratio: 1.45 },
    { src: "/images/collage-05.jpg", label: "Karting, 2010", x: 210, y: 8, w: 9.5, ratio: 1.15, mono: true, speed: 1.2 },
    { src: "/images/collage-09.jpg", label: "Garage, 2026", x: 214, y: 52, w: 15, ratio: 0.8, speed: 0.95 },
  ],
  quotes: [
    { x: 57, y: 8.5, w: 17, text: "It doesn't matter where you start, it's how you progress from there.", bold: ["where", "how"] },
    { x: 150, y: 76, w: 28, text: "Since I was 7 years old and had my first go in a kart, I've worked tirelessly to make that dream come true.", bold: [] },
  ],
};

export const collageTrack: { width: number; items: CollageItem[]; quotes: CollageQuote[] } = {
  width: 214,
  items: [
    { src: "/images/collage-03.jpg", label: "Miami, 2025", x: 26, y: 14, w: 12, ratio: 1.25, mono: true },
    { src: "/images/race-car-02.jpg", label: "Netherlands, 2025", x: 34, y: 58, w: 13, ratio: 0.85, speed: 1.15 },
    { src: "/images/social-02.jpg", label: "Miami, 2025", x: 56, y: 33, w: 26, ratio: 1, mono: true, speed: 0.9 },
    { src: "/images/helmet-worn-02.jpg", label: "Silverstone, 2026", x: 88, y: 12, w: 10, ratio: 1.1, speed: 1.2 },
    { src: "/images/collage-02.jpg", label: "Pit stop, 2025", x: 96, y: 56, w: 14, ratio: 0.9, chip: "1" },
    { src: "/images/collage-09.jpg", label: "Garage, 2025", x: 122, y: 18, w: 11, ratio: 1, mono: true, speed: 1.1 },
    { src: "/images/collage-01.jpg", label: "Monza, 2025", x: 140, y: 12, w: 26, ratio: 0.95, speed: 0.92 },
    { src: "/images/helmet-worn-05.jpg", label: "Karting, 2012", x: 126, y: 64, w: 10, ratio: 1.2, mono: true, speed: 1.2 },
    { src: "/images/race-car-03.jpg", label: "Abu Dhabi, 2025", x: 176, y: 58, w: 13, ratio: 0.9, speed: 1.1 },
    { src: "/images/social-07.jpg", label: "Cockpit, 2026", x: 184, y: 16, w: 11, ratio: 1.3, mono: true },
  ],
  quotes: [
    { x: 56, y: 9, w: 17, text: "It doesn't matter where you start, it's how you progress from there.", bold: ["where", "how"] },
    { x: 140, y: 74, w: 26, text: "Since I was 7 years old and had my first go in a kart, I've worked tirelessly to make that dream come true.", bold: [] },
  ],
};

export const socialCards = [
  "/images/social-01.jpg",
  "/images/social-02.jpg",
  "/images/social-03.jpg",
  "/images/social-06.jpg",
  "/images/social-07.jpg",
  "/images/social-05.jpg",
  "/images/social-04.jpg",
  "/images/social-08.jpg",
];

export const menuImages = [
  "/images/kai-race-helmet.webp",
  "/images/social-02.jpg",
  "/images/collage-04.jpg",
  "/images/race-car-03.jpg",
  "/images/collage-06.jpg",
  "/images/helmet-worn-01.jpg",
  "/images/message-portrait.jpg",
  "/images/race-car-01.jpg",
];
