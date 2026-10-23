import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const distDir = path.join(projectDir, "dist");
const siteUrl = "https://apartmandragicevic.com";
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
  assertThat(!hasPlaceholder(bodyText), `${prefix} visible content contains a square-bracket placeholder.`);
  assertThat(document.querySelectorAll("h1").length === 1, `${prefix} must contain exactly one H1.`);
  assertThat(document.querySelectorAll("img:not([alt]), img[alt='']").length === 0, `${prefix} contains an image with missing alt text.`);
  assertThat(document.querySelectorAll("table, details").length === 0, `${prefix} unexpectedly contains the removed facts, prices or FAQ sections.`);
  assertThat(document.querySelectorAll("#root img").length === 1, `${prefix} should contain only the original hero image, not the added gallery.`);
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
  }
  assertThat(document.querySelector("#root .animate-fade-in-up") !== null, `${prefix} hero entrance animation is missing.`);
  assertThat(document.querySelector("#root .animate-float") !== null, `${prefix} floating hero animation is missing.`);
  assertThat(document.querySelector("#root .typing-text") !== null, `${prefix} animated hero text is missing.`);

  const schemaScripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
  assertThat(schemaScripts.length === 1, `${prefix} expected one VacationRental JSON-LD block.`);
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
  assertThat(Boolean(rental), `${prefix} is missing VacationRental JSON-LD.`);

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
  const expectedRoutes = ["/", "/en/", "/o-nama/", "/sadrzaj/", "/galerija/", "/kontakt/"];
  assertThat(entries.length === expectedRoutes.length, "sitemap.xml must contain both language home routes and all existing site pages.");
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
    if (location !== `${siteUrl}/` && location !== `${siteUrl}/en/`) continue;
    const alternates = new Map(
      [...entry.getElementsByTagName("xhtml:link")].map((link) => [
        link.getAttribute("hreflang"),
        link.getAttribute("href"),
      ]),
    );
    assertThat(alternates.get("sr") === `${siteUrl}/`, "sitemap hreflang sr alternate is missing or incorrect.");
    assertThat(alternates.get("en") === `${siteUrl}/en/`, "sitemap hreflang en alternate is missing or incorrect.");
    assertThat(alternates.get("x-default") === `${siteUrl}/`, "sitemap x-default alternate is missing or incorrect.");
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
  await verifyPublicFiles();
  console.log("verify:geo: passed for / and /en/ (static HTML, metadata, JSON-LD, facts, images, robots, sitemap and Vercel config).");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
