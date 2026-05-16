import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const assetsDir = path.join(rootDir, "src", "assets");

const qualityOverrides = new Map([
  ["hero-apartment.jpg", 72],
  ["20250905_140627.jpg", 74],
  ["20250905_140638.jpg", 74],
  ["20250905_140645.jpg", 74],
  ["20250905_140747.jpg", 74],
  ["bathroom.jpg", 74],
  ["kupatilo-narandzasto.jpg", 74],
]);

async function main() {
  const files = await fs.readdir(assetsDir);
  const sourceImages = files.filter((file) => /\.(jpe?g)$/i.test(file));

  for (const file of sourceImages) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, file.replace(/\.[^.]+$/, ".webp"));
    const quality = qualityOverrides.get(file) ?? 76;

    await sharp(inputPath)
      .rotate()
      .webp({ quality, effort: 6 })
      .toFile(outputPath);
  }

  console.log(`Converted ${sourceImages.length} asset(s) to WebP.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
