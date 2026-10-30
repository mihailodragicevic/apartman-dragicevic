import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";
import geoContent from "../src/geo-content.json" with { type: "json" };

const siteUrl = "https://apartmandragicevic.com";
const ogImage = `${siteUrl}/og/apartman-dragicevic-og.jpg`;
const distDir = path.resolve("dist");

const pages = [
  {
    path: "/",
    locale: "sr",
    module: "/src/pages/Index.tsx",
    title: geoContent.locales.sr.title,
    description: geoContent.locales.sr.description,
  },
  {
    path: "/en/",
    locale: "en",
    module: "/src/pages/EnglishHome.tsx",
    title: geoContent.locales.en.title,
    description: geoContent.locales.en.description,
  },
  {
    path: "/o-nama/",
    locale: "sr",
    module: "/src/pages/About.tsx",
    title: "O nama | Apartman Dragićević Bogatić",
    description:
      "Saznajte više o Apartmanu Dragićević u Bogatiću, našoj priči, gostoljubivosti i detaljima koji gostima daju osećaj kao kod kuće.",
  },
  {
    path: "/sadrzaj/",
    locale: "sr",
    module: "/src/pages/Amenities.tsx",
    title: "Sadržaj apartmana | Apartman Dragićević Bogatić",
    description:
      "Pogledajte sadržaj apartmana u Bogatiću: WiFi, klima, parking, Smart TV, opremljena kuhinja, moderno kupatilo i još mnogo pogodnosti.",
  },
  {
    path: "/galerija/",
    locale: "sr",
    module: "/src/pages/Gallery.tsx",
    title: "Galerija | Apartman Dragićević Bogatić",
    description:
      "Pregledajte galeriju fotografija apartmana u Bogatiću i upoznajte dnevni boravak, kuhinju, kupatilo, spavaću sobu i dvorište.",
  },
  {
    path: "/kontakt/",
    locale: "sr",
    module: "/src/pages/Contact.tsx",
    title: "Kontakt i rezervacije | Apartman Dragićević Bogatić",
    description:
      "Kontaktirajte Apartman Dragićević u Bogatiću za rezervacije, proveru dostupnosti, adresu, mapu, email i direktan telefonski poziv.",
  },
  {
    path: "/en/about/",
    locale: "en",
    module: "/src/pages/About.tsx",
    title: "About us | Apartman Dragićević Bogatić",
    description:
      "Learn about Apartman Dragićević in Bogatić, our story, hospitality and the details that make guests feel at home.",
  },
  {
    path: "/en/amenities/",
    locale: "en",
    module: "/src/pages/EnglishAmenities.tsx",
    title: "Apartment amenities | Apartman Dragićević Bogatić",
    description:
      "Explore the amenities at Apartman Dragićević in Bogatić: Wi-Fi, air conditioning, parking, Smart TV, equipped kitchen, modern bathroom and more.",
  },
  {
    path: "/en/gallery/",
    locale: "en",
    module: "/src/pages/Gallery.tsx",
    title: "Gallery | Apartman Dragićević Bogatić",
    description:
      "Browse photos of Apartman Dragićević in Bogatić, including the living room, kitchen, bathroom, bedroom and garden.",
  },
  {
    path: "/en/contact/",
    locale: "en",
    module: "/src/pages/Contact.tsx",
    title: "Contact and bookings | Apartman Dragićević Bogatić",
    description:
      "Contact Apartman Dragićević in Bogatić to make a booking, check availability, get directions or call us directly.",
  },
];
const translations = {
  "/": "/en/",
  "/en/": "/",
  "/o-nama/": "/en/about/",
  "/en/about/": "/o-nama/",
  "/sadrzaj/": "/en/amenities/",
  "/en/amenities/": "/sadrzaj/",
  "/galerija/": "/en/gallery/",
  "/en/gallery/": "/galerija/",
  "/kontakt/": "/en/contact/",
  "/en/contact/": "/kontakt/",
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const rentalSchema = (locale) => ({
  "@context": "https://schema.org",
  "@type": "VacationRental",
  "@id": `${siteUrl}/#apartman`,
  name: "Apartman Dragićević",
  url: `${siteUrl}/`,
  description:
    locale === "sr"
      ? "Apartman Dragićević je apartman za do 4 osobe u Bogatiću, u Mačvi, na adresi Pavla Orlovića 11. Nalazi se 100 m od centra i 450 m od autobuske stanice. Ima jednu spavaću sobu sa dva francuska ležaja, dnevni boravak sa ugaonom garniturom na razvlačenje, potpuno opremljenu kuhinju, klimu, besplatan Wi-Fi i besplatan parking, kao i dvorište. Čiste peškire i posteljinu i higijenske setove dobija svaki gost."
      : "Apartman Dragićević is an apartment for up to 4 guests in Bogatić, in the Mačva region of Serbia, at Pavla Orlovića 11. It is 100 m from the town center and 450 m from the bus station. It has one bedroom with two double beds, a living room with a corner sofa that unfolds, a fully equipped kitchen, air conditioning, free Wi-Fi and free parking, as well as a yard. Every guest receives clean towels and bed linen and a hygiene kit.",
  image: geoContent.images.map((image) => `${siteUrl}${image.src}`),
  telephone: "+381658103247",
  priceRange: "3.000–9.000 RSD po noćenju (direktna rezervacija)",
  petsAllowed: false,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pavla Orlovića 11",
    addressLocality: "Bogatić",
    postalCode: "15350",
    addressRegion: "Mačva",
    addressCountry: "RS",
  },
  latitude: 44.833022,
  longitude: 19.479516,
  checkinTime: "14:00",
  checkoutTime: "11:00",
  sameAs: [
    "https://www.google.com/maps/place/Apartman+Dragi%C4%87evi%C4%87/@44.8330016,19.4796981,18z/data=!4m14!1m7!3m6!1s0x475bb9731bf26be9:0xbb45a20e09e4bf7f!2zQXBhcnRtYW4gRHJhZ2nEh2V2acSH!8m2!3d44.8330035!4d19.4795077!16s%2Fg%2F11z05p8680!3m5!1s0x475bb9731bf26be9:0xbb45a20e09e4bf7f!8m2!3d44.8330035!4d19.4795077!16s%2Fg%2F11z05p8680",
    "https://www.booking.com/hotel/rs/apartman-dragicevic.sr.html",
  ],
  containsPlace: {
    "@type": "Accommodation",
    additionalType: "EntirePlace",
    name: "Apartman Dragićević",
    occupancy: { "@type": "QuantitativeValue", maxValue: 4 },
    smokingAllowed: true,
    numberOfBedrooms: 1,
    numberOfBathroomsTotal: 1,
    bed: [{ "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "Double bed" }],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Smart TV", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fully equipped kitchen", value: true },
      { "@type": "LocationFeatureSpecification", name: "Induction hob", value: true },
      { "@type": "LocationFeatureSpecification", name: "Microwave", value: true },
      { "@type": "LocationFeatureSpecification", name: "Refrigerator", value: true },
      { "@type": "LocationFeatureSpecification", name: "Electric kettle", value: true },
      { "@type": "LocationFeatureSpecification", name: "Washing machine", value: true },
      { "@type": "LocationFeatureSpecification", name: "Iron and ironing board", value: true },
      { "@type": "LocationFeatureSpecification", name: "Hair dryer", value: true },
      { "@type": "LocationFeatureSpecification", name: "Shower", value: true },
      { "@type": "LocationFeatureSpecification", name: "Garden / yard", value: true },
      { "@type": "LocationFeatureSpecification", name: "Clean towels and linen for every guest", value: true },
      { "@type": "LocationFeatureSpecification", name: "Hygiene kit for every guest", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free coffee and sweets", value: true },
    ],
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Od centra Bogatića", value: "100 m" },
    { "@type": "PropertyValue", name: "Od autobuske stanice", value: "450 m" },
    { "@type": "PropertyValue", name: "Od Šapca", value: "21 km" },
    { "@type": "PropertyValue", name: "Od aerodroma Nikola Tesla (Beograd)", value: "89,4 km" },
    { "@type": "PropertyValue", name: "Cena za 1 osobu po noćenju", value: "3.000 RSD" },
    { "@type": "PropertyValue", name: "Cena za 2 osobe po noćenju", value: "5.200 RSD" },
    { "@type": "PropertyValue", name: "Cena za 3 osobe po noćenju", value: "7.000 RSD" },
    { "@type": "PropertyValue", name: "Cena za 4 osobe po noćenju", value: "9.000 RSD" },
  ],
});

const faqSchema = (locale) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: locale,
  mainEntity: geoContent.faq.map(({ [locale]: content }) => ({
    "@type": "Question",
    name: content.question,
    acceptedAnswer: { "@type": "Answer", text: content.answer },
  })),
});

const replaceOnce = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(`Could not update ${label}: template pattern not found.`);
  }
  return html.replace(pattern, replacement);
};

const renderPage = (template, page) => {
  const canonicalUrl = `${siteUrl}${page.path}`;
  let html = template;
  html = replaceOnce(html, /<html lang="[^"]*">/, `<html lang="${page.locale}">`, "html language");
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`, "title");
  html = replaceOnce(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    "meta description",
  );
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    "canonical",
  );
  html = replaceOnce(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    "Open Graph title",
  );
  html = replaceOnce(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    "Open Graph description",
  );
  html = replaceOnce(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    "Open Graph URL",
  );
  html = replaceOnce(
    html,
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${ogImage}" />`,
    "Open Graph image",
  );
  html = replaceOnce(
    html,
    /<meta property="og:locale" content="[^"]*" \/>/,
    `<meta property="og:locale" content="${page.locale === "sr" ? "sr_RS" : "en_US"}" />`,
    "Open Graph locale",
  );
  html = replaceOnce(
    html,
    /<meta property="og:image:alt" content="[^"]*" \/>/,
    `<meta property="og:image:alt" content="${escapeHtml(geoContent.images[0].alt[page.locale])}" />`,
    "Open Graph image alt",
  );
  for (const [pattern, replacement, label] of [
    [
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
      "Twitter title",
    ],
    [
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
      "Twitter description",
    ],
    [
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${ogImage}" />`,
      "Twitter image",
    ],
  ]) {
    html = replaceOnce(html, pattern, replacement, label);
  }

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "");
  const translatedPath = translations[page.path];
  const srPath = page.locale === "sr" ? page.path : translatedPath;
  const enPath = page.locale === "en" ? page.path : translatedPath;
  const alternates = translatedPath
    ? [
        ["sr", `${siteUrl}${srPath}`],
        ["en", `${siteUrl}${enPath}`],
        ["x-default", `${siteUrl}${srPath}`],
      ]
        .map(([language, href]) => `<link rel="alternate" hreflang="${language}" href="${href}" />`)
        .join("\n    ")
    : "";
  html = html.replace(
    "</head>",
    `    ${alternates}\n    <meta name="twitter:image:alt" content="${escapeHtml(geoContent.images[0].alt[page.locale])}" />\n    </head>`,
  );

  if (page.path === "/" || page.path === "/en/") {
    const schemas = [rentalSchema(page.locale), faqSchema(page.locale)]
      .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
      .join("\n    ");
    html = html.replace("</head>", `${schemas}\n    </head>`);
  }

  return html;
};

const main = async () => {
  const indexPath = path.join(distDir, "index.html");
  const template = await fs.readFile(indexPath, "utf8");
  const assetDirectory = path.join(distDir, "assets");
  const builtAssets = await fs.readdir(assetDirectory);
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    for (const page of pages) {
      const { default: Page } = await vite.ssrLoadModule(page.module);
      const renderedMarkup = renderToString(
        React.createElement(
          MemoryRouter,
          { initialEntries: [page.path] },
          React.createElement(Page),
        ),
      );
      const markupWithBuiltAssets = renderedMarkup.replace(
        /\/src\/assets\/([^"' ]+)/g,
        (assetPath, encodedName) => {
          const sourceName = decodeURIComponent(encodedName.split(/[?#]/)[0]);
          const sourceExtension = path.extname(sourceName);
          const assetStem = path.basename(sourceName, sourceExtension);
          const builtAsset = builtAssets.find(
            (fileName) =>
              fileName === sourceName ||
              fileName.startsWith(`${assetStem}-`) && path.extname(fileName) === sourceExtension,
          );
          if (!builtAsset) {
            throw new Error(`Could not find built asset for prerendered image: ${sourceName}`);
          }
          return `/assets/${builtAsset}`;
        },
      );
      const pageHtml = renderPage(template, page);
      const html = replaceOnce(
        pageHtml,
        /<div id="root"><\/div>/,
        `<div id="root">${markupWithBuiltAssets}</div>`,
        `prerendered ${page.path}`,
      );
      const relativePath = page.path === "/" ? "index.html" : path.join(page.path.slice(1), "index.html");
      const outputPath = path.join(distDir, relativePath);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, html, "utf8");
    }
  } finally {
    await vite.close();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
