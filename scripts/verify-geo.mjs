import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import geoContent from "../src/geo-content.json" with { type: "json" };

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const distDir = path.join(projectDir, "dist");
const siteUrl = "https://apartmandragicevic.com";
const expectedFaqIds = [
  "kapacitet",
  "deca-besplatno",
  "rezervacija",
  "check-in-check-out",
  "lokacija",
  "parking",
  "klima-wifi",
  "kuhinja",
  "peskiri-posteljina",
  "ves-masina",
  "dvoriste",
  "ljubimci-pusenje",
];
const expectedFaqQuestions = {
  sr: [
    "Za koliko osoba je Apartman Dragićević?",
    "Da li deca borave besplatno?",
    "Kako mogu da rezervišem direktno?",
    "Kada je check-in i check-out?",
    "Gde se nalazi Apartman Dragićević?",
    "Da li apartman ima parking?",
    "Da li apartman ima klimu i Wi-Fi?",
    "Da li je kuhinja opremljena?",
    "Da li su peškiri i posteljina uključeni u cenu?",
    "Da li apartman ima veš mašinu?",
    "Da li apartman ima dvorište?",
    "Da li su kućni ljubimci i pušenje dozvoljeni?",
  ],
  en: [
    "How many guests can stay at Apartman Dragićević?",
    "Do children stay for free?",
    "How can I book directly?",
    "What are the check-in and check-out times?",
    "Where is Apartman Dragićević located?",
    "Is there parking?",
    "Does the apartment have air conditioning and Wi-Fi?",
    "Is the kitchen fully equipped?",
    "Are towels and bed linen included?",
    "Is there a washing machine?",
    "Is there a yard or garden?",
    "Are pets and smoking allowed?",
  ],
};
const routes = [
  { path: "/", file: path.join(distDir, "index.html"), lang: "sr" },
  { path: "/en/", file: path.join(distDir, "en", "index.html"), lang: "en" },
];

const fail = (message) => {
  throw new Error(`verify:geo: ${message}`);
};

const assertThat = (condition, message) => {
  if (!condition) fail(message);
};

const normalize = (value) => value.replace(/\s+/g, " ").trim();
const hasPlaceholder = (value) => /\[[^\]]*\]/.test(value);
const containsPlaceholder = (value) => {
  if (typeof value === "string") return hasPlaceholder(value);
  if (Array.isArray(value)) return value.some(containsPlaceholder);
  if (value && typeof value === "object") return Object.values(value).some(containsPlaceholder);
  return false;
};

const verifyImagePaths = async (document, prefix) => {
  assertThat(!document.documentElement.outerHTML.includes("/src/assets/"), `${prefix} contains unresolved source asset paths.`);
  for (const image of document.querySelectorAll("img[src]")) {
    const source = image.getAttribute("src");
    if (!source || /^https?:\/\//i.test(source) || source.startsWith("data:")) continue;
    const imagePath = path.join(distDir, decodeURIComponent(source.split(/[?#]/)[0].replace(/^\/+/, "")));
    try {
      await fs.access(imagePath);
    } catch {
      fail(`${prefix} references an image missing from build output: ${source}`);
    }
  }
};

const runBuild = () => {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) fail("Run this check through `npm run verify:geo` so the production build can be invoked.");
  execFileSync(process.execPath, [npmCli, "run", "build"], {
    cwd: projectDir,
    stdio: "inherit",
  });
};

const verifyRoute = async ({ path: routePath, file, lang }) => {
  let html;
  try {
    html = await fs.readFile(file, "utf8");
  } catch {
    fail(`missing prerendered HTML for ${routePath}: ${path.relative(projectDir, file)}`);
  }
  const { document } = new JSDOM(html).window;
  const prefix = `${routePath}:`;
  const canonical = `${siteUrl}${routePath}`;
  const description = document.querySelector('meta[name="description"]')?.content ?? "";
  assertThat(document.documentElement.lang === lang, `${prefix} expected <html lang="${lang}">.`);
  assertThat(Boolean(document.title.trim()), `${prefix} missing <title>.`);
  assertThat(description.length >= 50 && description.length <= 170, `${prefix} meta description length is ${description.length}; expected 50–170 characters.`);
  assertThat(
    document.querySelector('link[rel="canonical"]')?.href === canonical,
    `${prefix} canonical must be ${canonical}.`,
  );

  const hreflang = new Map(
    [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [
      link.hreflang,
      link.href,
    ]),
  );
  const expectedAlternates = {
    sr: `${siteUrl}/`,
    en: `${siteUrl}/en/`,
    "x-default": `${siteUrl}/`,
  };
  for (const [language, url] of Object.entries(expectedAlternates)) {
    assertThat(hreflang.get(language) === url, `${prefix} hreflang ${language} must point to ${url}.`);
  }
  assertThat(hreflang.size === 3, `${prefix} must have exactly sr, en and x-default alternates.`);
  assertThat(
    document.querySelector('meta[name="robots"]')?.content.toLowerCase().includes("noindex") !== true,
    `${prefix} contains a noindex robots meta tag.`,
  );

  const bodyText = normalize(document.body.textContent);
  await verifyImagePaths(document, prefix);
  assertThat(!hasPlaceholder(bodyText), `${prefix} visible content contains a square-bracket placeholder.`);
  assertThat(document.querySelectorAll("h1").length === 1, `${prefix} must contain exactly one H1.`);
  assertThat(document.querySelectorAll("img:not([alt]), img[alt='']").length === 0, `${prefix} contains an image with missing alt text.`);
  assertThat(document.querySelectorAll("table").length === 0, `${prefix} unexpectedly contains a facts or prices table.`);
  assertThat(geoContent.faq.length === 12, "the shared FAQ data source must contain exactly 12 questions.");
  assertThat(geoContent.faq.every((item, index) => item.id === expectedFaqIds[index]), "FAQ IDs are missing, duplicated, or out of order.");
  const faqSection = document.querySelector("#faq");
  assertThat(faqSection?.getAttribute("aria-labelledby") === "faq-heading", `${prefix} FAQ section must reference its heading.`);
  assertThat(
    normalize(faqSection?.querySelector("h2")?.textContent ?? "") ===
      (lang === "sr" ? "Česta pitanja" : "Frequently asked questions"),
    `${prefix} FAQ heading is missing or incorrect.`,
  );
  assertThat(
    faqSection?.querySelectorAll(".faq-column").length === 2,
    `${prefix} FAQ must render two independent columns.`,
  );
  const faqColumns = [...(faqSection?.querySelectorAll(".faq-column") ?? [])];
  assertThat(
    faqColumns.length === 2 &&
      faqColumns[0].querySelectorAll("details").length === 6 &&
      faqColumns[1].querySelectorAll("details").length === 6,
    `${prefix} FAQ columns must each contain six cards.`,
  );
  const faqCards = [...(faqSection?.querySelectorAll("details") ?? [])];
  assertThat(faqCards.length === 12, `${prefix} FAQ must contain exactly 12 native details cards.`);
  assertThat(faqCards.every((card) => !card.open && !card.hasAttribute("name")), `${prefix} FAQ cards must be closed by default and allow multiple openings.`);
  assertThat(
    faqCards.map((card) => card.id).join(",") === expectedFaqIds.map((id) => `faq-${id}`).join(","),
    `${prefix} FAQ cards must have stable IDs in the requested DOM order.`,
  );
  assertThat(
    normalize(faqSection?.querySelector("h2 + p")?.textContent ?? "").length > 0,
    `${prefix} FAQ heading must have an introductory sentence.`,
  );
  for (const [index, card] of faqCards.entries()) {
    const item = geoContent.faq[index];
    const content = item[lang];
    const question = normalize(card.querySelector("summary")?.textContent ?? "");
    const answer = normalize(card.querySelector(".faq-answer")?.textContent ?? "");
    assertThat(question === expectedFaqQuestions[lang][index], `${prefix} FAQ question ${index + 1} is incorrect or out of order.`);
    assertThat(question === normalize(content.question), `${prefix} FAQ question is not from the shared bilingual data: ${question}`);
    assertThat(answer === normalize(content.answer), `${prefix} FAQ answer is missing from static HTML or differs from the shared data: ${question}`);
  }
  const faqRequestHref = lang === "sr" ? "/kontakt/" : "/en/contact/";
  assertThat(
    Boolean(faqSection?.querySelector(`a[href="${faqRequestHref}"]`)),
    `${prefix} FAQ request CTA must point to the existing booking form.`,
  );
  assertThat(
    Boolean(faqSection?.querySelector('a[href="tel:+381658103247"]')),
    `${prefix} FAQ call CTA must use the booking phone number.`,
  );
  assertThat(document.querySelectorAll("#root img").length >= 6, `${prefix} is missing static homepage sections and images.`);
  for (const requiredText of [
    lang === "sr" ? "Pogodnosti" : "Amenities",
    lang === "sr" ? "Cenovnik" : "Pricing",
    lang === "sr" ? "Galerija" : "Gallery",
    lang === "sr" ? "Recenzije" : "Reviews",
  ]) {
    assertThat(bodyText.includes(requiredText), `${prefix} is missing the localized homepage section "${requiredText}".`);
  }
  const heroHeading = normalize(document.querySelector("#root h1")?.textContent ?? "");
  const heroLead = lang === "sr"
    ? "Apartman u Bogatiću gde se osećate"
    : "Apartman in Bogatić where you feel";
  const heroEnding = lang === "sr" ? "kao kod kuće" : "at home";
  assertThat(heroHeading.startsWith(heroLead) && heroHeading.includes(heroEnding), `${prefix} is missing restored hero heading copy.`);
  if (lang === "sr") {
    assertThat(
      bodyText.includes("Savršeno opremljen stan na samo 100m od centra. Mir, udobnost i sve što vam treba - spremno za vaš dolazak."),
      `${prefix} is missing the original hero introduction.`,
    );
  } else {
    assertThat(
      bodyText.includes("A fully equipped apartment just 100 m from the town center. Peace, comfort and everything you need — ready for your arrival."),
      `${prefix} is missing the English translation of the original hero introduction.`,
    );
  }
  assertThat(document.querySelector("#root .animate-fade-in-up") !== null, `${prefix} hero entrance animation is missing.`);
  assertThat(document.querySelector("#root .animate-float") !== null, `${prefix} floating hero animation is missing.`);
  assertThat(document.querySelector("#root .typing-text") !== null, `${prefix} animated hero text is missing.`);

  const schemaScripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
  assertThat(schemaScripts.length === 2, `${prefix} expected VacationRental and FAQPage JSON-LD blocks.`);
  const schemas = schemaScripts.map((script, index) => {
    try {
      const schema = JSON.parse(script.textContent ?? "");
      assertThat(!containsPlaceholder(schema), `${prefix} JSON-LD block ${index + 1} contains a placeholder.`);
      assertThat(!JSON.stringify(schema).includes("aggregateRating"), `${prefix} JSON-LD must not contain aggregateRating.`);
      return schema;
    } catch (error) {
      if (error instanceof SyntaxError) fail(`${prefix} JSON-LD block ${index + 1} is not valid JSON: ${error.message}`);
      throw error;
    }
  });
  const rental = schemas.find((schema) => schema["@type"] === "VacationRental");
  const faqPage = schemas.find((schema) => schema["@type"] === "FAQPage");
  assertThat(Boolean(rental), `${prefix} is missing VacationRental JSON-LD.`);
  assertThat(Boolean(faqPage), `${prefix} is missing FAQPage JSON-LD.`);
  assertThat(faqPage.inLanguage === lang, `${prefix} FAQPage language must match the route.`);
  assertThat(
    faqPage.mainEntity.length === 12,
    `${prefix} FAQPage must contain exactly 12 questions.`,
  );
  for (const [index, item] of geoContent.faq.entries()) {
    const { question, answer } = item[lang];
    const structuredQuestion = faqPage.mainEntity[index];
    assertThat(
      structuredQuestion.name === question && structuredQuestion.acceptedAnswer.text === answer,
      `${prefix} FAQ JSON-LD does not match the visible FAQ content: ${question}`,
    );
    assertThat(bodyText.includes(normalize(question)), `${prefix} visible FAQ question is missing: ${question}`);
    assertThat(bodyText.includes(normalize(answer)), `${prefix} visible FAQ answer is missing: ${question}`);
  }
  assertThat(
    faqPage.mainEntity.map((question) => normalize(question.name)).join("|") === expectedFaqQuestions[lang].join("|"),
    `${prefix} JSON-LD questions are missing or out of order.`,
  );
  const serializedFaq = JSON.stringify(faqPage);
  assertThat(!serializedFaq.toLowerCase().includes("airbnb"), `${prefix} FAQPage JSON-LD contains a forbidden brand reference.`);
  assertThat(!containsPlaceholder(faqPage), `${prefix} FAQPage JSON-LD contains a placeholder.`);
  const criticalFaqFacts = lang === "sr"
    ? ["+381 65 8103247", "14:00", "11:00", "Pavla Orlovića 11", "100 m", "450 m", "21 km", "89,4 km", "Deca od 0 do 7 godina borave besplatno.", "Kućni ljubimci nisu dozvoljeni. Pušenje je dozvoljeno."]
    : ["+381 65 8103247", "2:00 PM", "11:00 AM", "Pavla Orlovića 11", "100 m", "450 m", "21 km", "89.4 km", "Children aged 0 to 7 stay for free.", "Pets are not allowed. Smoking is allowed."];
  for (const fact of criticalFaqFacts) {
    assertThat(serializedFaq.includes(fact), `${prefix} FAQ is missing required fact "${fact}".`);
  }

  const additionalProperties = new Map(
    rental.additionalProperty.map((property) => [property.name, property.value]),
  );
  const serializedRental = JSON.stringify(rental);
  for (const fact of [
    "Pavla Orlovića 11",
    "15350",
    "+381658103247",
    "44.833022",
    "19.479516",
    '"maxValue":4',
    '"checkinTime":"14:00"',
    '"checkoutTime":"11:00"',
    '"petsAllowed":false',
    '"smokingAllowed":true',
  ]) {
    assertThat(serializedRental.includes(fact), `${prefix} VacationRental JSON-LD is missing required fact: ${fact}`);
  }
  for (const [name, value] of [
    ["Od centra Bogatića", "100 m"],
    ["Od autobuske stanice", "450 m"],
    ["Od Šapca", "21 km"],
    ["Od aerodroma Nikola Tesla (Beograd)", "89,4 km"],
    ["Cena za 1 osobu po noćenju", "3.000 RSD"],
    ["Cena za 2 osobe po noćenju", "5.200 RSD"],
    ["Cena za 3 osobe po noćenju", "7.000 RSD"],
    ["Cena za 4 osobe po noćenju", "9.000 RSD"],
  ]) {
    assertThat(additionalProperties.get(name) === value, `${prefix} VacationRental JSON-LD property "${name}" must be "${value}".`);
  }

  assertThat(!html.toLowerCase().includes("airbnb"), `${prefix} output HTML contains a forbidden brand reference.`);
  assertThat(!rental.image.some((image) => /-[A-Za-z0-9_-]{8}\./.test(new URL(image).pathname)), `${prefix} JSON-LD image URL contains a build hash.`);
  for (const image of rental.image) {
    const imagePath = path.join(distDir, new URL(image).pathname.slice(1));
    try {
      await fs.access(imagePath);
    } catch {
      fail(`${prefix} JSON-LD image does not exist in build output: ${image}`);
    }
  }

  return { html, rental };
};

const verifyOtherRoutes = async () => {
  const routePairs = [
    ["/o-nama/", "/en/about/"],
    ["/sadrzaj/", "/en/amenities/"],
    ["/galerija/", "/en/gallery/"],
    ["/kontakt/", "/en/contact/"],
  ];
  for (const [serbianPath, englishPath] of routePairs) {
    for (const [routePath, lang] of [[serbianPath, "sr"], [englishPath, "en"]]) {
      const file = path.join(distDir, routePath.slice(1), "index.html");
      const html = await fs.readFile(file, "utf8");
      const { document } = new JSDOM(html).window;
      const bodyText = normalize(document.body.textContent);
      const prefix = `${routePath}:`;
      const alternates = new Map(
        [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [
          link.hreflang,
          link.href,
        ]),
      );
      const expectedSr = `${siteUrl}${serbianPath}`;
      const expectedEn = `${siteUrl}${englishPath}`;
      assertThat(document.documentElement.lang === lang, `${prefix} has the wrong document language.`);
      assertThat(Boolean(document.title.trim()), `${prefix} is missing its title.`);
      assertThat(
        document.querySelector('meta[name="description"]')?.content.length >= 50,
        `${prefix} is missing a useful meta description.`,
      );
      assertThat(
        document.querySelector('link[rel="canonical"]')?.href === `${siteUrl}${routePath}`,
        `${prefix} has the wrong canonical URL.`,
      );
      if (routePath === "/kontakt/" || routePath === "/en/contact/") {
        assertThat(document.querySelector("form") !== null, `${prefix} is missing the booking request form targeted by the FAQ CTA.`);
      }
      assertThat(alternates.get("sr") === expectedSr, `${prefix} has the wrong sr hreflang alternate.`);
      assertThat(alternates.get("en") === expectedEn, `${prefix} has the wrong en hreflang alternate.`);
      assertThat(alternates.get("x-default") === expectedSr, `${prefix} has the wrong x-default alternate.`);
      assertThat(document.querySelectorAll("h1").length === 1, `${prefix} must contain exactly one H1.`);
      assertThat(bodyText.length > 100, `${prefix} is missing its statically rendered page content.`);
      assertThat(document.querySelectorAll("#root img").length > 0, `${prefix} is missing its static page imagery or brand mark.`);
      await verifyImagePaths(document, prefix);
      assertThat(!hasPlaceholder(bodyText), `${prefix} contains a square-bracket placeholder.`);
      assertThat(!html.toLowerCase().includes("airbnb"), `${prefix} output contains a forbidden brand reference.`);
      assertThat(
        document.querySelector('meta[name="robots"]')?.content.toLowerCase().includes("noindex") !== true,
        `${prefix} contains a noindex robots meta tag.`,
      );
    }
  }
};

const walkFiles = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const children = await Promise.all(
    entries.map((entry) => {
      const child = path.join(directory, entry.name);
      return entry.isDirectory() ? walkFiles(child) : [child];
    }),
  );
  return children.flat();
};

const verifyPublicFiles = async () => {
  const robots = await fs.readFile(path.join(distDir, "robots.txt"), "utf8");
  assertThat(/^User-agent:\s*\*\s*$/m.test(robots), "robots.txt must allow all user agents.");
  assertThat(/^Allow:\s*\/\s*$/m.test(robots), "robots.txt must allow crawling of the site.");
  assertThat(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), "robots.txt is missing the canonical sitemap URL.");
  assertThat(!/^Disallow:\s*\/\s*$/m.test(robots), "robots.txt blocks the entire site.");

  const sitemap = await fs.readFile(path.join(distDir, "sitemap.xml"), "utf8");
  const sitemapDocument = new JSDOM(sitemap, { contentType: "application/xml" }).window.document;
  assertThat(!sitemapDocument.querySelector("parsererror"), "sitemap.xml is not valid XML.");
  const entries = [...sitemapDocument.getElementsByTagName("url")];
  const expectedRoutes = [
    "/", "/en/", "/o-nama/", "/sadrzaj/", "/galerija/", "/kontakt/",
    "/en/about/", "/en/amenities/", "/en/gallery/", "/en/contact/",
  ];
  assertThat(entries.length === expectedRoutes.length, "sitemap.xml must contain both language versions of all site pages.");
  const locations = entries.map((entry) => entry.getElementsByTagName("loc")[0]?.textContent);
  for (const route of expectedRoutes) {
    assertThat(locations.includes(`${siteUrl}${route}`), `sitemap.xml is missing canonical route ${route}.`);
    const filePath = route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.slice(1), "index.html");
    try {
      await fs.access(filePath);
    } catch {
      fail(`sitemap.xml lists a route without a prerendered file: ${route}`);
    }
  }
  for (const entry of entries) {
    const location = entry.getElementsByTagName("loc")[0]?.textContent;
    const pathName = location?.replace(siteUrl, "");
    const translatedPath = {
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
    }[pathName];
    if (!translatedPath) continue;
    const alternates = new Map(
      [...entry.getElementsByTagName("xhtml:link")].map((link) => [
        link.getAttribute("hreflang"),
        link.getAttribute("href"),
      ]),
    );
    const srPath = pathName.startsWith("/en/") ? translatedPath : pathName;
    const enPath = pathName.startsWith("/en/") ? pathName : translatedPath;
    assertThat(alternates.get("sr") === `${siteUrl}${srPath}`, `sitemap hreflang sr alternate is incorrect for ${pathName}.`);
    assertThat(alternates.get("en") === `${siteUrl}${enPath}`, `sitemap hreflang en alternate is incorrect for ${pathName}.`);
    assertThat(alternates.get("x-default") === `${siteUrl}${srPath}`, `sitemap x-default alternate is incorrect for ${pathName}.`);
  }

  const vercel = JSON.parse(await fs.readFile(path.join(projectDir, "vercel.json"), "utf8"));
  const vercelText = JSON.stringify(vercel).toLowerCase();
  assertThat(
    !(vercelText.includes("x-robots-tag") && vercelText.includes("noindex")),
    "vercel.json must not configure X-Robots-Tag: noindex.",
  );
  assertThat(vercel.trailingSlash === true, "vercel.json must enforce the canonical trailing-slash policy.");
  assertThat(!vercel.rewrites?.some((rewrite) => rewrite.source === "/(.*)"), "vercel.json must not contain a catch-all SPA rewrite.");
  const wwwRedirect = vercel.redirects?.find((redirect) =>
    redirect.has?.some((condition) => condition.type === "host" && condition.value === "www.apartmandragicevic.com"),
  );
  assertThat(
    wwwRedirect?.destination === "https://apartmandragicevic.com/:path*" && wwwRedirect.permanent,
    "vercel.json must permanently redirect www to the canonical apex domain.",
  );

  const textExtensions = new Set([".html", ".js", ".css", ".json", ".xml", ".txt", ".svg", ".webmanifest"]);
  for (const file of await walkFiles(distDir)) {
    if (!textExtensions.has(path.extname(file).toLowerCase())) continue;
    const content = await fs.readFile(file, "utf8");
    assertThat(!content.toLowerCase().includes("airbnb"), `build output contains a forbidden brand reference in ${path.relative(distDir, file)}.`);
  }
};

const main = async () => {
  runBuild();
  const pages = await Promise.all(routes.map(verifyRoute));
  assertThat(
    pages[0].rental.description !== pages[1].rental.description,
    "VacationRental description must be localized for the English page.",
  );
  await verifyOtherRoutes();
  await verifyPublicFiles();
  console.log("verify:geo: passed for all 10 routes (static HTML, metadata, JSON-LD, facts, images, robots, sitemap and Vercel config).");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
