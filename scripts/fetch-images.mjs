// Downloads the Unsplash photos listed in images-manifest.json into public/images/<slot>.jpg
// Usage: node scripts/fetch-images.mjs
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "scripts/images-manifest.json"), "utf8"));
const outDir = path.join(root, "public/images");
await mkdir(outDir, { recursive: true });

let total = 0;
const queue = [...manifest];
async function worker() {
  while (queue.length) {
    const item = queue.shift();
    const file = path.join(outDir, `${item.slot}.jpg`);
    try {
      const s = await stat(file);
      if (s.size > 0) { total += s.size; continue; }
    } catch {}
    const url = `${item.url}?w=${item.w}&q=78&fm=jpg&fit=max`;
    const res = await fetch(url);
    if (!res.ok) { console.error(`FAIL ${item.slot} ${res.status}`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(file, buf);
    total += buf.length;
    console.log(`ok ${item.slot} ${(buf.length / 1024).toFixed(0)} KB`);
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log(`done: ${(total / 1024 / 1024).toFixed(1)} MB`);
