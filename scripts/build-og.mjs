// Builds the social share image (public/og.jpg) and the Apple touch icon (src/app/apple-icon.png).
// Usage: node scripts/build-og.mjs
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;

const photo = await sharp(path.join(root, "public/images/hero-portrait.jpg"))
  .resize(720, H, { fit: "cover", position: "centre" })
  .modulate({ brightness: 1.08, saturation: 0.9 })
  .toBuffer();

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="fade" x1="0" x2="1">
      <stop offset="0" stop-color="#282c20" stop-opacity="1"/>
      <stop offset="1" stop-color="#282c20" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="440" y="0" width="200" height="${H}" fill="url(#fade)"/>
  <g transform="translate(64 70) scale(1.4)" fill="none" stroke="#d2ff00" stroke-width="7" stroke-linecap="square">
    <path d="M14 42 L22 6"/><path d="M34 6 L18 26 L27 42"/><path d="M32 42 L40 6 L47 27 L60 6 L52 42"/>
  </g>
  <text x="64" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="92" fill="#eeeee4" letter-spacing="-2">KAI</text>
  <text x="64" y="392" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="92" fill="#eeeee4" letter-spacing="-3">MERCER</text>
  <text x="64" y="470" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="28" fill="#d2ff00" letter-spacing="1">FORMULA 1 DRIVER #7</text>
  <text x="64" y="560" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="20" fill="#bcbab0" letter-spacing="1">CALENDAR · RESULTS · HELMETS · STORE</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: "#282c20" } })
  .composite([
    { input: photo, left: W - 720, top: 0 },
    { input: overlay, left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(root, "public/og.jpg"));

const icon = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180"><rect width="64" height="64" fill="#d2ff00"/><g transform="translate(-1 8)" fill="none" stroke="#111112" stroke-width="7" stroke-linecap="square"><path d="M14 42 L22 6"/><path d="M34 6 L18 26 L27 42"/><path d="M32 42 L40 6 L47 27 L60 6 L52 42"/></g></svg>`);
await sharp(icon).png().toFile(path.join(root, "src/app/apple-icon.png"));
console.log("og.jpg + apple-icon.png written");
