import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { gallery, getEnglishGalleryAlt } from "@/lib/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "@/components/Seo";
import { baseSchemas, pageSeo } from "@/lib/seo";
import { useLocation } from "react-router-dom";

export default function Gallery() {
  const isEnglish = useLocation().pathname.startsWith("/en");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i! + 1) % gallery.length);
      if (e.key === "ArrowLeft") setActive((i) => (i! - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [active]);

  return (
    <Layout>
      <Seo
        title={isEnglish ? "Gallery | Apartman Dragićević Bogatić" : pageSeo.gallery.title}
        description={isEnglish ? "Browse photos of Apartman Dragićević in Bogatić, including the living room, kitchen, bathroom, bedroom and garden." : pageSeo.gallery.description}
        path={isEnglish ? "/en/gallery/" : pageSeo.gallery.path}
        htmlLang={isEnglish ? "en" : "sr"}
        schema={baseSchemas}
      />
      <section className="container pt-36 pb-10">
        <SectionHeading
          as="h1"
          eyebrow={isEnglish ? "Gallery" : "Galerija"}
          title={isEnglish ? <>Every corner has a <em className="italic text-accent">story</em></> : <>Svaki ćošak ima svoju <em className="italic text-accent">priču</em></>}
          subtitle={isEnglish ? "Take a look inside, from the living room and kitchen to the peaceful garden." : "Pogledajte kako apartman izgleda - od dnevnog boravka, preko kuhinje, do mirnog dvorišta."}
        />
      </section>

      <section className="container pb-24">
        <div className="gallery-masonry columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {gallery.map((g, i) => (
            <button
              key={i}
              type="button"
              aria-label={isEnglish ? `Open photo ${i + 1}` : `Otvori fotografiju ${i + 1}`}
              onClick={() => setActive(i)}
              className="gallery-masonry-item reveal group mb-4 block w-full overflow-hidden rounded-2xl bg-secondary"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
            >
              <img
                src={g.src}
                alt={isEnglish ? getEnglishGalleryAlt(g.alt) : g.alt}
                loading="lazy"
                width={g.w}
                height={g.h}
                className="gallery-masonry-image h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {active !== null && (
        <div className="fixed inset-0 z-[60] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setActive(null)}>
          <button type="button" className="absolute top-5 right-5 h-11 w-11 rounded-full bg-card/90 grid place-items-center" onClick={() => setActive(null)} aria-label={isEnglish ? "Close gallery" : "Zatvori galeriju"}>
            <X className="h-5 w-5" />
          </button>
          <button type="button" className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 grid place-items-center"
            aria-label={isEnglish ? "Previous photo" : "Prethodna fotografija"}
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i! - 1 + gallery.length) % gallery.length); }}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <img
            src={gallery[active].src}
            alt={isEnglish ? getEnglishGalleryAlt(gallery[active].alt) : gallery[active].alt}
            width={gallery[active].w}
            height={gallery[active].h}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-2xl shadow-soft"
            onClick={(e) => e.stopPropagation()}
          />
          <button type="button" className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 grid place-items-center"
            aria-label={isEnglish ? "Next photo" : "Sledeća fotografija"}
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i! + 1) % gallery.length); }}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </Layout>
  );
}
