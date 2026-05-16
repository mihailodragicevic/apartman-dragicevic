import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const assetsDir = path.join(rootDir, "src", "assets");
const publicDir = path.join(rootDir, "public");

const brand = {
  name: "Apartman Dragićević",
  tagline: "Stan na dan u Bogatiću",
  accent: "#cd7442",
  accentSoft: "#f5e9dd",
  foreground: "#2d211b",
  muted: "#7b6559",
};

const imageJobs = [
  {
    input: "hero-apartment.webp",
    slug: "apartman-bogatic-hero-dnevni-boravak",
    dir: "hero",
    widths: [640, 960, 1280, 1600],
    quality: { webp: 72, jpeg: 76 },
  },
  {
    input: "living.webp",
    slug: "apartman-bogatic-dnevni-boravak",
    dir: "gallery",
    widths: [480, 768, 1200],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "bedroom.webp",
    slug: "apartman-bogatic-spavaca-soba",
    dir: "gallery",
    widths: [480, 768, 1200],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "bedroom2.webp",
    slug: "apartman-bogatic-spavaca-soba-detalj",
    dir: "gallery",
    widths: [480, 768, 1200],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "kupatilo-narandzasto.webp",
    slug: "apartman-bogatic-kupatilo",
    dir: "gallery",
    widths: [640, 960, 1280, 1600],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "bathroom.webp",
    slug: "apartman-bogatic-moderno-kupatilo",
    dir: "gallery",
    widths: [640, 960, 1280, 1600],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "kitchen.webp",
    slug: "apartman-bogatic-kuhinja",
    dir: "gallery",
    widths: [480, 768, 1024],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "coffee.webp",
    slug: "apartman-bogatic-kafa-i-detali",
    dir: "gallery",
    widths: [480, 768, 1200],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "yard.webp",
    slug: "apartman-bogatic-dvoriste",
    dir: "gallery",
    widths: [480, 768, 1200],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "643299935.webp",
    slug: "apartman-bogatic-enterijer-01",
    dir: "gallery",
    widths: [384, 576],
    quality: { webp: 74, jpeg: 80 },
  },
  {
    input: "643299897.webp",
    slug: "apartman-bogatic-enterijer-02",
    dir: "gallery",
    widths: [384, 576],
    quality: { webp: 74, jpeg: 80 },
  },
  {
    input: "IMG-43eaaac53037ca7718c2f619b10446f7-V.webp",
    slug: "apartman-bogatic-enterijer-03",
    dir: "gallery",
    widths: [480, 768, 1200],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "IMG-f29421250edcc9ffa79cb580592ec8e3-V.webp",
    slug: "apartman-bogatic-enterijer-04",
    dir: "gallery",
    widths: [480, 768, 1200],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "20250905_140627.webp",
    slug: "apartman-bogatic-enterijer-05",
    dir: "gallery",
    widths: [640, 960, 1280, 1600],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "20250905_140638.webp",
    slug: "apartman-bogatic-enterijer-06",
    dir: "gallery",
    widths: [640, 960, 1280, 1600],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "20250905_140645.webp",
    slug: "apartman-bogatic-enterijer-07",
    dir: "gallery",
    widths: [640, 960, 1280, 1600],
    quality: { webp: 74, jpeg: 78 },
  },
  {
    input: "20250905_140747.webp",
    slug: "apartman-bogatic-enterijer-08",
    dir: "gallery",
    widths: [640, 960, 1280, 1600],
    quality: { webp: 74, jpeg: 78 },
  },
];

async function ensureDir(relativeDir) {
  await fs.mkdir(path.join(publicDir, relativeDir), { recursive: true });
}

async function generateResponsiveImage(job) {
  const inputPath = path.join(assetsDir, job.input);
  const outputDir = path.join(publicDir, "images", job.dir);
  await fs.mkdir(outputDir, { recursive: true });

  const metadata = await sharp(inputPath).metadata();
  const validWidths = job.widths.filter((width) => width <= (metadata.width ?? width));
  const widths = validWidths.length ? validWidths : [metadata.width ?? job.widths[0]];

  for (const width of widths) {
    const baseName = `${job.slug}-${width}`;
    await sharp(inputPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: job.quality.webp, effort: 6 })
      .toFile(path.join(outputDir, `${baseName}.webp`));

    await sharp(inputPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: job.quality.jpeg, mozjpeg: true, progressive: true })
      .toFile(path.join(outputDir, `${baseName}.jpg`));
  }
}

async function generateIcons() {
  const logoSvgPath = path.join(assetsDir, "Logo_WEB 3.svg");
  const logoSvg = await fs.readFile(logoSvgPath);
  const brandDir = path.join(publicDir, "brand");
  await fs.mkdir(brandDir, { recursive: true });

  await fs.copyFile(logoSvgPath, path.join(publicDir, "favicon.svg"));
  await fs.copyFile(logoSvgPath, path.join(brandDir, "logo.svg"));

  const iconSizes = [16, 32, 180, 192, 512];
  for (const size of iconSizes) {
    const target =
      size === 180
        ? "apple-touch-icon.png"
        : size === 192
          ? "android-chrome-192x192.png"
          : size === 512
            ? "android-chrome-512x512.png"
            : `favicon-${size}x${size}.png`;

    await sharp(logoSvg, { density: 900 })
      .resize(size, size, { fit: "contain", background: { r: 245, g: 233, b: 221, alpha: 1 } })
      .png()
      .toFile(path.join(publicDir, target));
  }

  await sharp(logoSvg, { density: 900 })
    .resize(512, 512, { fit: "contain", background: { r: 245, g: 233, b: 221, alpha: 1 } })
    .png()
    .toFile(path.join(brandDir, "logo-512.png"));
}

function createOgOverlaySvg() {
  return `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(28,20,16,0.82)"/>
          <stop offset="55%" stop-color="rgba(28,20,16,0.54)"/>
          <stop offset="100%" stop-color="rgba(28,20,16,0.22)"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#fade)"/>
      <rect x="70" y="72" rx="999" ry="999" width="248" height="42" fill="rgba(245,233,221,0.92)"/>
      <text x="100" y="99" fill="${brand.foreground}" font-size="20" font-family="Inter, Arial, sans-serif" font-weight="700">Stan na dan · Bogatić</text>
      <text x="70" y="214" fill="#ffffff" font-size="76" font-family="Fraunces, Georgia, serif" font-weight="600">${brand.name}</text>
      <text x="70" y="288" fill="#ffffff" font-size="34" font-family="Inter, Arial, sans-serif" font-weight="500">${brand.tagline}</text>
      <text x="70" y="352" fill="${brand.accentSoft}" font-size="28" font-family="Inter, Arial, sans-serif">100m od centra · Do 5 osoba · WiFi · Parking · Klima</text>
      <rect x="70" y="430" width="410" height="4" rx="2" fill="${brand.accent}"/>
      <text x="70" y="490" fill="#ffffff" font-size="26" font-family="Inter, Arial, sans-serif">Rezervacije i direktan kontakt bez posrednika</text>
    </svg>
  `;
}

async function generateOgImage() {
  const heroPath = path.join(assetsDir, "hero-apartment.webp");
  const logoSvgPath = path.join(assetsDir, "Logo_WEB 3.svg");
  const ogDir = path.join(publicDir, "og");
  await fs.mkdir(ogDir, { recursive: true });

  const overlay = Buffer.from(createOgOverlaySvg());
  const logoSvg = await fs.readFile(logoSvgPath);
  const logoOverlay = await sharp(logoSvg, { density: 900 })
    .resize(200, 139, { fit: "contain" })
    .png()
    .toBuffer();

  await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.88, saturation: 1.05 })
    .composite([
      { input: overlay },
      { input: logoOverlay, top: 72, left: 930 },
    ])
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(ogDir, "apartman-dragicevic-og.jpg"));
}

async function removeTemporaryOutput() {
  await fs.rm(path.join(publicDir, "tmp-test"), { recursive: true, force: true });
}

async function main() {
  await fs.rm(path.join(publicDir, "images"), { recursive: true, force: true });
  await fs.rm(path.join(publicDir, "brand"), { recursive: true, force: true });
  await fs.rm(path.join(publicDir, "og"), { recursive: true, force: true });

  await ensureDir("images/hero");
  await ensureDir("images/gallery");
  await ensureDir("brand");
  await ensureDir("og");

  for (const job of imageJobs) {
    await generateResponsiveImage(job);
  }

  await generateIcons();
  await generateOgImage();
  await removeTemporaryOutput();

  console.log("Optimized assets generated successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
