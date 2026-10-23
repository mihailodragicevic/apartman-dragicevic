import fs from "node:fs/promises";
import path from "node:path";
import geoContent from "../src/geo-content.json" with { type: "json" };

const siteUrl = "https://apartmandragicevic.com";
const ogImage = `${siteUrl}/og/apartman-dragicevic-og.jpg`;
const distDir = path.resolve("dist");

const pages = [
  {
    path: "/",
    locale: "sr",
    title: geoContent.locales.sr.title,
    description: geoContent.locales.sr.description,
  },
  {
    path: "/en/",
    locale: "en",
    title: geoContent.locales.en.title,
    description: geoContent.locales.en.description,
  },
  {
    path: "/o-nama/",
    locale: "sr",
    title: "O nama | Apartman Dragićević Bogatić",
    description:
      "Saznajte više o Apartmanu Dragićević u Bogatiću, našoj priči, gostoljubivosti i detaljima koji gostima daju osećaj kao kod kuće.",
  },
  {
    path: "/sadrzaj/",
    locale: "sr",
    title: "Sadržaj apartmana | Apartman Dragićević Bogatić",
    description:
      "Pogledajte sadržaj apartmana u Bogatiću: WiFi, klima, parking, Smart TV, opremljena kuhinja, moderno kupatilo i još mnogo pogodnosti.",
  },
  {
    path: "/galerija/",
    locale: "sr",
    title: "Galerija | Apartman Dragićević Bogatić",
    description:
      "Pregledajte galeriju fotografija apartmana u Bogatiću i upoznajte dnevni boravak, kuhinju, kupatilo, spavaću sobu i dvorište.",
  },
  {
    path: "/kontakt/",
    locale: "sr",
    title: "Kontakt i rezervacije | Apartman Dragićević Bogatić",
    description:
      "Kontaktirajte Apartman Dragićević u Bogatiću za rezervacije, proveru dostupnosti, adresu, mapu, email i direktan telefonski poziv.",
  },
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderTableRows = (rows) =>
  rows
    .map(
      ([label, value]) =>
        `<tr class="border-b border-border last:border-0"><th scope="row" class="w-1/3 py-3 pr-5 font-semibold">${escapeHtml(label)}</th><td class="py-3 text-muted-foreground">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

const renderGeoMarkup = (locale) => {
  const page = geoContent.locales[locale];
  const hero = geoContent.images[0];
  const intro = page.intro
    .map((paragraph) => `<p class="mt-4 text-lg leading-relaxed text-muted-foreground">${escapeHtml(paragraph)}</p>`)
    .join("");
  const photos = geoContent.images
    .map(
      (image, index) =>
        `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt[locale])}" class="aspect-[4/3] w-full rounded-2xl object-cover" width="800" height="600"${index === 0 ? "" : ' loading="lazy"'}>`,
    )
    .join("");
  const prices = page.prices
    .map(
      ([guests, price]) =>
        `<tr class="border-b border-border last:border-0"><td class="py-3 pr-5">${escapeHtml(guests)}</td><td class="py-3 font-semibold">${escapeHtml(price)}</td></tr>`,
    )
    .join("");
  const faq = page.faq
    .map(
      ([question, answer]) =>
        `<details class="rounded-2xl border border-border bg-card px-5 py-4"><summary class="cursor-pointer font-semibold">${escapeHtml(question)}</summary><p class="pt-3 leading-relaxed text-muted-foreground">${escapeHtml(answer)}</p></details>`,
    )
    .join("");

  return `<div class="min-h-screen flex flex-col"><main class="flex-1 pb-24">
    <section class="relative min-h-[100svh] flex items-center overflow-hidden">
      <div class="absolute inset-0"><img src="${escapeHtml(hero.src)}" alt="${escapeHtml(hero.alt[locale])}" class="h-full w-full object-cover" width="1920" height="1080"><div class="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background"></div></div>
      <div class="container relative z-10 pt-32 pb-20"><div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-border">${locale === "sr" ? "Pavla Orlovića 11 · 100 m od centra Bogatića" : "Pavla Orlovića 11 · 100 m from Bogatić town center"}</div>
        <h1 class="mt-6 font-display text-5xl md:text-7xl leading-[1.05] text-balance">${escapeHtml(page.h1)}</h1>
        <p class="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl text-balance">${escapeHtml(page.description)}</p>
        <a href="tel:+381658103247" class="mt-8 inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-7 py-4 rounded-full font-semibold">${locale === "sr" ? "Pozovite odmah" : "Call now"}</a>
      </div></div>
    </section>
    <section id="detalji" class="container space-y-12 py-16 md:py-24">
      <div class="mx-auto max-w-4xl text-center">${intro}</div>
      <section class="rounded-3xl border border-border bg-card p-6 shadow-card md:p-10"><h2 class="mb-6 font-display text-3xl md:text-4xl">${escapeHtml(page.sections.facts)}</h2><div class="overflow-x-auto"><table class="w-full border-collapse text-left"><tbody>${renderTableRows(page.facts)}</tbody></table></div></section>
      <section class="rounded-3xl bg-gradient-warm p-6 md:p-10"><h2 class="font-display text-3xl md:text-4xl">${escapeHtml(page.sections.prices)}</h2><p class="mt-3 max-w-3xl text-muted-foreground">${escapeHtml(page.sections.priceNote)}</p><div class="mt-6 overflow-x-auto"><table class="w-full max-w-xl border-collapse text-left"><thead><tr class="border-b border-border"><th scope="col" class="py-3 pr-5">${escapeHtml(page.sections.guests)}</th><th scope="col" class="py-3">${escapeHtml(page.sections.pricePerNight)}</th></tr></thead><tbody>${prices}</tbody></table></div></section>
      <section><h2 class="mb-6 font-display text-3xl md:text-4xl">${escapeHtml(page.sections.photos)}</h2><div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">${photos}</div></section>
      <section><h2 class="mb-6 font-display text-3xl md:text-4xl">${escapeHtml(page.sections.faq)}</h2><div class="space-y-3">${faq}</div></section>
    </section>
  </main></div>`;
};

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
  mainEntity: geoContent.locales[locale].faq.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
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
  const alternates =
    page.path === "/" || page.path === "/en/"
      ? [
          ["sr", `${siteUrl}/`],
          ["en", `${siteUrl}/en/`],
          ["x-default", `${siteUrl}/`],
        ]
          .map(([language, href]) => `<link rel="alternate" hreflang="${language}" href="${href}" />`)
          .join("\n    ")
      : "";
  html = html.replace(
    "</head>",
    `    ${alternates}\n    <meta name="twitter:image:alt" content="${escapeHtml(geoContent.images[0].alt[page.locale])}" />\n    </head>`,
  );

  if (page.locale === "sr" && page.path === "/" || page.locale === "en") {
    const markup = renderGeoMarkup(page.locale);
    html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${markup}</div>`, "prerendered page content");
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

  for (const page of pages) {
    const html = renderPage(template, page);
    const relativePath = page.path === "/" ? "index.html" : path.join(page.path.slice(1), "index.html");
    const outputPath = path.join(distDir, relativePath);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, html, "utf8");
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
