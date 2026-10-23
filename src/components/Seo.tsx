import { useEffect } from "react";
import { SITE } from "@/lib/site";

type ImagePreload = {
  href: string;
  srcSet?: string;
  sizes?: string;
};

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  htmlLang?: string;
  preloadImage?: ImagePreload;
  schema?: Array<Record<string, unknown>>;
};

const ensureMeta = (selector: string, factory: () => HTMLElement) => {
  const existing = document.head.querySelector<HTMLElement>(selector);
  if (existing) return existing;
  const element = factory();
  document.head.appendChild(element);
  return element;
};

const absoluteUrl = (path: string) => {
  if (typeof window === "undefined") {
    return `${SITE.siteUrl}${path}`;
  }

  return new URL(path, window.location.origin).toString();
};

export default function Seo({
  title,
  description,
  path,
  image = SITE.ogImage,
  imageAlt = SITE.ogImageAlt,
  type = "website",
  noIndex = false,
  htmlLang = SITE.htmlLang,
  preloadImage,
  schema = [],
}: SeoProps) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);
    const ogImageUrl = absoluteUrl(image);
    document.title = title;
    document.documentElement.lang = htmlLang;

    ensureMeta('meta[name="description"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      return meta;
    }).setAttribute("content", description);

    ensureMeta('meta[name="robots"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      return meta;
    }).setAttribute("content", noIndex ? "noindex, nofollow" : "index, follow");

    ensureMeta('meta[name="theme-color"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      return meta;
    }).setAttribute("content", SITE.themeColor);

    const canonicalLink = ensureMeta('link[rel="canonical"]', () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      return link;
    }) as HTMLLinkElement;
    canonicalLink.href = canonicalUrl;

    const metaMap: Array<[string, string, string]> = [
      ['meta[property="og:title"]', "property", "og:title"],
      ['meta[property="og:description"]', "property", "og:description"],
      ['meta[property="og:url"]', "property", "og:url"],
      ['meta[property="og:type"]', "property", "og:type"],
      ['meta[property="og:image"]', "property", "og:image"],
      ['meta[property="og:image:alt"]', "property", "og:image:alt"],
      ['meta[property="og:site_name"]', "property", "og:site_name"],
      ['meta[property="og:locale"]', "property", "og:locale"],
      ['meta[name="twitter:card"]', "name", "twitter:card"],
      ['meta[name="twitter:title"]', "name", "twitter:title"],
      ['meta[name="twitter:description"]', "name", "twitter:description"],
      ['meta[name="twitter:image"]', "name", "twitter:image"],
      ['meta[name="twitter:image:alt"]', "name", "twitter:image:alt"],
    ];

    for (const [selector, attribute, value] of metaMap) {
      ensureMeta(selector, () => {
        const meta = document.createElement("meta");
        meta.setAttribute(attribute, value);
        return meta;
      });
    }

    (document.head.querySelector('meta[property="og:title"]') as HTMLMetaElement).content = title;
    (document.head.querySelector('meta[property="og:description"]') as HTMLMetaElement).content = description;
    (document.head.querySelector('meta[property="og:url"]') as HTMLMetaElement).content = canonicalUrl;
    (document.head.querySelector('meta[property="og:type"]') as HTMLMetaElement).content = type;
    (document.head.querySelector('meta[property="og:image"]') as HTMLMetaElement).content = ogImageUrl;
    (document.head.querySelector('meta[property="og:image:alt"]') as HTMLMetaElement).content = imageAlt;
    (document.head.querySelector('meta[property="og:site_name"]') as HTMLMetaElement).content = SITE.name;
    (document.head.querySelector('meta[property="og:locale"]') as HTMLMetaElement).content = SITE.locale;
    (document.head.querySelector('meta[name="twitter:card"]') as HTMLMetaElement).content = "summary_large_image";
    (document.head.querySelector('meta[name="twitter:title"]') as HTMLMetaElement).content = title;
    (document.head.querySelector('meta[name="twitter:description"]') as HTMLMetaElement).content = description;
    (document.head.querySelector('meta[name="twitter:image"]') as HTMLMetaElement).content = ogImageUrl;
    (document.head.querySelector('meta[name="twitter:image:alt"]') as HTMLMetaElement).content = imageAlt;

    const managedSchemas: HTMLScriptElement[] = [];
    schema.forEach((entry, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoManaged = "true";
      script.dataset.schemaIndex = String(index);
      script.textContent = JSON.stringify(entry);
      document.head.appendChild(script);
      managedSchemas.push(script);
    });

    const preloadLink = preloadImage
      ? (() => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = preloadImage.href;
          if (preloadImage.srcSet) link.setAttribute("imagesrcset", preloadImage.srcSet);
          if (preloadImage.sizes) link.setAttribute("imagesizes", preloadImage.sizes);
          link.dataset.seoManaged = "true";
          document.head.appendChild(link);
          return link;
        })()
      : null;

    return () => {
      managedSchemas.forEach((script) => script.remove());
      preloadLink?.remove();
    };
  }, [description, htmlLang, image, imageAlt, noIndex, path, preloadImage, schema, title, type]);

  return null;
}
