import fs from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://apartmandragicevic.com";
const ogImage = `${siteUrl}/og/apartman-dragicevic-og.jpg`;

const pages = [
  {
    path: "/",
    title: "Apartman Dragićević | Stan na dan u Bogatiću",
    description:
      "Apartman u Bogatiću na samo 100m od centra. Smeštaj za do 4 osobe sa parkingom, WiFi internetom, klimom i domaćinskim pristupom.",
  },
  {
    path: "/o-nama",
    title: "O nama | Apartman Dragićević Bogatić",
    description:
      "Saznajte više o Apartmanu Dragićević u Bogatiću, našoj priči, gostoljubivosti i detaljima koji gostima daju osećaj kao kod kuće.",
  },
  {
    path: "/sadrzaj",
    title: "Sadržaj apartmana | Apartman Dragićević Bogatić",
    description:
      "Pogledajte sadržaj apartmana u Bogatiću: WiFi, klima, parking, Smart TV, opremljena kuhinja, moderno kupatilo i još mnogo pogodnosti.",
  },
  {
    path: "/galerija",
    title: "Galerija | Apartman Dragićević Bogatić",
    description:
      "Pregledajte galeriju fotografija apartmana u Bogatiću i upoznajte dnevni boravak, kuhinju, kupatilo, spavaću sobu i dvorište.",
  },
  {
    path: "/kontakt",
    title: "Kontakt i rezervacije | Apartman Dragićević Bogatić",
    description:
      "Kontaktirajte Apartman Dragićević u Bogatiću za rezervacije, proveru dostupnosti, adresu, mapu, email i direktan telefonski poziv.",
  },
];

const distDir = path.resolve("dist");

const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    throw new Error(`Pattern not found: ${pattern}`);
  }

  return html.replace(pattern, replacement);
};

const renderPage = (template, page) => {
  const canonicalUrl = `${siteUrl}${page.path === "/" ? "/" : page.path}`;

  let html = template;
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`);
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${page.description}" />`,
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${page.title}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${page.description}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${ogImage}" />`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${page.title}" />`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${page.description}" />`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${ogImage}" />`,
  );

  return html;
};

const main = async () => {
  const indexPath = path.join(distDir, "index.html");
  const template = await fs.readFile(indexPath, "utf8");

  for (const page of pages) {
    const html = renderPage(template, page);
    const outputPath =
      page.path === "/" ? indexPath : path.join(distDir, page.path.slice(1), "index.html");

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, html, "utf8");
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
