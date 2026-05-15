type GalleryItem = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

const photoModules = import.meta.glob("../assets/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const preferredOrder = [
  "hero-apartment.jpg",
  "living.jpg",
  "bedroom.jpg",
  "bedroom2.jpg",
  "kitchen.jpg",
  "bathroom.jpg",
  "dining.jpg",
  "coffee.jpg",
  "yard.jpg",
];

const fileNameFromPath = (path: string) => path.split("/").pop() ?? path;

const readableLabel = (fileName: string) => {
  const base = fileName.replace(/\.[^.]+$/, "");

  if (/^(img-|[0-9]{6,})/i.test(base)) {
    return "Fotografija apartmana";
  }

  return base
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const galleryEntries = Object.entries(photoModules).sort(([pathA], [pathB]) => {
  const nameA = fileNameFromPath(pathA);
  const nameB = fileNameFromPath(pathB);
  const orderA = preferredOrder.indexOf(nameA);
  const orderB = preferredOrder.indexOf(nameB);

  if (orderA !== -1 || orderB !== -1) {
    if (orderA === -1) return 1;
    if (orderB === -1) return -1;
    return orderA - orderB;
  }

  return nameA.localeCompare(nameB, undefined, { numeric: true });
});

export const gallery: GalleryItem[] = galleryEntries.map(([path, src], index) => {
  const fileName = fileNameFromPath(path);
  const label = readableLabel(fileName);
  const needsIndex = label === "Fotografija apartmana";

  return {
    src,
    alt: needsIndex
      ? `Apartman Dragićević - fotografija ${index + 1}`
      : `Apartman Dragićević - ${label}`,
    w: 1600,
    h: 1200,
  };
});
