import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const publicDir = path.resolve("public");
const logoPath = path.join(publicDir, "favicon.svg");

const iconFiles = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

const renderIcon = async (size) => {
  const logoSize = Math.round(size * 0.78);
  const offset = Math.floor((size - logoSize) / 2);
  const logo = await sharp(logoPath)
    .resize({
      width: logoSize,
      height: logoSize,
      fit: "contain",
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: "#ffffff",
    },
  })
    .composite([{ input: logo, left: offset, top: offset }])
    .png()
    .toBuffer();
};

for (const file of iconFiles) {
  const buffer = await renderIcon(file.size);
  await writeFile(path.join(publicDir, file.name), buffer);
}

const icoBuffers = await Promise.all([16, 32].map((size) => renderIcon(size)));
await writeFile(path.join(publicDir, "favicon.ico"), await toIco(icoBuffers));
