import { SITE } from "./site";

const buildAbsoluteUrl = (path: string) => {
  if (typeof window === "undefined") {
    return `${SITE.siteUrl}${path}`;
  }

  return new URL(path, window.location.origin).toString();
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: buildAbsoluteUrl("/"),
  logo: buildAbsoluteUrl("/brand/logo-512.png"),
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: [SITE.instagramUrl],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "LodgingBusiness"],
  name: SITE.name,
  description: SITE.defaultDescription,
  url: buildAbsoluteUrl("/"),
  image: [buildAbsoluteUrl(SITE.ogImage)],
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: "Bogatić",
    addressCountry: "RS",
  },
  sameAs: [SITE.instagramUrl],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: buildAbsoluteUrl("/"),
  inLanguage: SITE.htmlLang,
};

export const baseSchemas = [organizationSchema, localBusinessSchema, webSiteSchema];

type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
};

export const pageSeo: Record<"home" | "about" | "amenities" | "gallery" | "contact" | "notFound", PageSeoConfig> = {
  home: {
    title: "Apartman Dragićević | Stan na dan u Bogatiću",
    description:
      "Apartman u Bogatiću na samo 100m od centra. Smeštaj za do 4 osobe sa parkingom, WiFi internetom, klimom i domaćinskim pristupom.",
    path: "/",
  },
  about: {
    title: "O nama | Apartman Dragićević Bogatić",
    description:
      "Saznajte više o Apartmanu Dragićević u Bogatiću, našoj priči, gostoljubivosti i detaljima koji gostima daju osećaj kao kod kuće.",
    path: "/o-nama",
  },
  amenities: {
    title: "Sadržaj apartmana | Apartman Dragićević Bogatić",
    description:
      "Pogledajte sadržaj apartmana u Bogatiću: WiFi, klima, parking, Smart TV, opremljena kuhinja, moderno kupatilo i još mnogo pogodnosti.",
    path: "/sadrzaj",
  },
  gallery: {
    title: "Galerija | Apartman Dragićević Bogatić",
    description:
      "Pregledajte galeriju fotografija apartmana u Bogatiću i upoznajte dnevni boravak, kuhinju, kupatilo, spavaću sobu i dvorište.",
    path: "/galerija",
  },
  contact: {
    title: "Kontakt i rezervacije | Apartman Dragićević Bogatić",
    description:
      "Kontaktirajte Apartman Dragićević u Bogatiću za rezervacije, proveru dostupnosti, adresu, mapu, email i direktan telefonski poziv.",
    path: "/kontakt",
  },
  notFound: {
    title: "Stranica nije pronađena | Apartman Dragićević",
    description: "Tražena stranica ne postoji. Vratite se na početnu stranicu Apartmana Dragićević u Bogatiću.",
    path: "/404",
  },
};
