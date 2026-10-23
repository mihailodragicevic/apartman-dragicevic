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

const renderHeroMarkup = (locale) => {
  const page = geoContent.locales[locale];
  const hero = geoContent.images[0];
  const lead =
    locale === "sr"
      ? "Apartman u Bogatiću gde se osećate "
      : "Apartman in Bogatić where you feel ";
  const typedText = locale === "sr" ? "kao kod kuće" : "at home";
  const description =
    locale === "sr"
      ? "Savršeno opremljen stan na samo 100m od centra. Mir, udobnost i sve što vam treba - spremno za vaš dolazak."
      : page.description;

  return `<section class="relative min-h-[100svh] flex items-center overflow-hidden">
    <div class="absolute inset-0"><picture class="block h-full w-full"><source srcset="${escapeHtml(hero.src)}" sizes="100vw" type="image/webp"><img src="${escapeHtml(hero.src)}" srcset="${escapeHtml(hero.src)}" sizes="100vw" alt="${escapeHtml(hero.alt[locale])}" class="h-full w-full object-cover" width="1920" height="1080" fetchpriority="high" style="transform:translate3d(calc(var(--mx,0)*-10px),calc(var(--my,0)*-10px),0) scale(1.05)"></picture><div class="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background"></div></div>
    <div class="hero-soft-shape absolute top-24 left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl animate-float" style="transform:translate3d(calc(var(--mx,0)*30px),calc(var(--my,0)*30px),0)" aria-hidden="true"></div>
    <div class="hero-soft-shape absolute bottom-32 right-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl animate-float" style="animation-delay:1.5s;transform:translate3d(calc(var(--mx,0)*-40px),calc(var(--my,0)*-40px),0)" aria-hidden="true"></div>
    <div class="container relative z-10 pt-32 pb-20"><div class="max-w-3xl">
      <div class="inline-flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-border animate-fade-in-up">${locale === "sr" ? "Pavla Orlovića 11 · 100m od centra Bogatića" : "Pavla Orlovića 11 · 100 m from Bogatić town center"}</div>
      <h1 class="mt-6 font-display text-5xl md:text-7xl leading-[1.05] text-balance animate-fade-in-up" style="animation-delay:0.1s">${escapeHtml(lead)}<span class="typing-text italic text-accent"><span class="typing-text-ghost" aria-hidden="true">${escapeHtml(typedText)}</span><span class="typing-text-live" aria-label="${escapeHtml(typedText)}">${escapeHtml(typedText)}<span class="typing-text-cursor" aria-hidden="true"></span></span></span></h1>
      <p class="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl text-balance animate-fade-in-up" style="animation-delay:0.2s">${escapeHtml(description)}</p>
      <div class="mt-8 flex flex-wrap gap-3 animate-fade-in-up" style="animation-delay:0.3s"><a href="tel:+381658103247" class="hero-call-button inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-7 py-4 rounded-full font-semibold shadow-glow hover:-translate-y-0.5 transition-transform">${locale === "sr" ? "Pozovite odmah" : "Call now"}</a><a href="#detalji" class="hero-secondary-button inline-flex items-center gap-2 bg-card border border-border px-7 py-4 rounded-full font-medium">${locale === "sr" ? "Saznajte više" : "Learn more"}</a></div>
    </div></div>
  </section>`;
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
    const markup = renderHeroMarkup(page.locale);
    html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${markup}</div>`, "prerendered hero");
    const schema = `<script type="application/ld+json">${JSON.stringify(rentalSchema(page.locale))}</script>`;
    html = html.replace("</head>", `${schema}\n    </head>`);
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
