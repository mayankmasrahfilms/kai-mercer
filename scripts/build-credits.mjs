// Writes CREDITS.md from images-manifest.json.  Usage: node scripts/build-credits.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "scripts/images-manifest.json"), "utf8"));
const rows = manifest.map((i) => `| ${i.slot} | [${i.by}](${i.page}) |`).join("\n");
const md = `# Photo credits

All photos are from [Unsplash](https://unsplash.com) and used under the free [Unsplash License](https://unsplash.com/license).
Files live in \`public/images/<slot>.jpg\`; re-download them with \`node scripts/fetch-images.mjs\`.

| Slot | Photographer |
| --- | --- |
${rows}
`;
await writeFile(path.join(root, "CREDITS.md"), md);
console.log(`CREDITS.md: ${manifest.length} photos`);
