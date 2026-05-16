export type ResponsiveAsset = {
  alt: string;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  webpSrcSet: string;
};

type AssetDefinition = {
  dir: "hero" | "gallery";
  slug: string;
  alt: string;
  width: number;
  height: number;
  widths: number[];
};

const withBase = (assetPath: string) => {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${normalizedBase}${assetPath}`;
};

function createResponsiveAsset(definition: AssetDefinition): ResponsiveAsset {
  const sortedWidths = [...definition.widths].sort((left, right) => left - right);
  const largestWidth = sortedWidths[sortedWidths.length - 1];
  const basePath = withBase(`/images/${definition.dir}/${definition.slug}`);

  return {
    alt: definition.alt,
    width: definition.width,
    height: definition.height,
    src: `${basePath}-${largestWidth}.jpg`,
    srcSet: sortedWidths.map((width) => `${basePath}-${width}.jpg ${width}w`).join(", "),
    webpSrcSet: sortedWidths.map((width) => `${basePath}-${width}.webp ${width}w`).join(", "),
  };
}

export const heroImage = createResponsiveAsset({
  dir: "hero",
  slug: "apartman-bogatic-hero-dnevni-boravak",
  alt: "Moderan dnevni boravak apartmana u Bogatiću",
  width: 4624,
  height: 2604,
  widths: [640, 960, 1280, 1600],
});

export const yardImage = createResponsiveAsset({
  dir: "gallery",
  slug: "apartman-bogatic-dvoriste",
  alt: "Dvorište apartmana u Bogatiću",
  width: 1205,
  height: 1600,
  widths: [480, 768, 1200],
});

export const coffeeImage = createResponsiveAsset({
  dir: "gallery",
  slug: "apartman-bogatic-kafa-i-detali",
  alt: "Aparat za kafu i šolje na pultu apartmana",
  width: 1205,
  height: 1600,
  widths: [480, 768, 1200],
});

export const gallery = [
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-dnevni-boravak",
    alt: "Apartman Dragićević - dnevni boravak",
    width: 1205,
    height: 1600,
    widths: [480, 768, 1200],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-spavaca-soba",
    alt: "Apartman Dragićević - spavaća soba",
    width: 1200,
    height: 1600,
    widths: [480, 768, 1200],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-kupatilo",
    alt: "Apartman Dragićević - moderno kupatilo",
    width: 4000,
    height: 2250,
    widths: [640, 960, 1280, 1600],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-kuhinja",
    alt: "Apartman Dragićević - opremljena kuhinja",
    width: 1024,
    height: 768,
    widths: [480, 768, 1024],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-moderno-kupatilo",
    alt: "Apartman Dragićević - detalj kupatila",
    width: 4000,
    height: 2250,
    widths: [640, 960, 1280, 1600],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-kafa-i-detali",
    alt: "Apartman Dragićević - kutak za kafu",
    width: 1205,
    height: 1600,
    widths: [480, 768, 1200],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-dvoriste",
    alt: "Apartman Dragićević - dvorište",
    width: 1205,
    height: 1600,
    widths: [480, 768, 1200],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-enterijer-01",
    alt: "Apartman Dragićević - enterijer apartmana 1",
    width: 576,
    height: 768,
    widths: [384, 576],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-enterijer-02",
    alt: "Apartman Dragićević - enterijer apartmana 2",
    width: 576,
    height: 768,
    widths: [384, 576],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-enterijer-03",
    alt: "Apartman Dragićević - enterijer apartmana 3",
    width: 1200,
    height: 1600,
    widths: [480, 768, 1200],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-enterijer-04",
    alt: "Apartman Dragićević - enterijer apartmana 4",
    width: 1200,
    height: 1600,
    widths: [480, 768, 1200],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-enterijer-05",
    alt: "Apartman Dragićević - enterijer apartmana 5",
    width: 4000,
    height: 2250,
    widths: [640, 960, 1280, 1600],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-enterijer-06",
    alt: "Apartman Dragićević - enterijer apartmana 6",
    width: 4000,
    height: 2250,
    widths: [640, 960, 1280, 1600],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-enterijer-07",
    alt: "Apartman Dragićević - enterijer apartmana 7",
    width: 4000,
    height: 2250,
    widths: [640, 960, 1280, 1600],
  }),
  createResponsiveAsset({
    dir: "gallery",
    slug: "apartman-bogatic-enterijer-08",
    alt: "Apartman Dragićević - enterijer apartmana 8",
    width: 4000,
    height: 2250,
    widths: [640, 960, 1280, 1600],
  }),
];
