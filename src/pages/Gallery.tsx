import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { gallery } from "@/lib/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "@/components/Seo";
import { baseSchemas, pageSeo } from "@/lib/seo";

export default function Gallery() {
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
      <Seo {...pageSeo.gallery} schema={baseSchemas} />
      <section className="container pt-36 pb-10">
        <SectionHeading
          as="h1"
          eyebrow="Galerija"
          title={<>Svaki ćošak ima svoju <em className="italic text-accent">priču</em></>}
          subtitle="Pogledajte kako apartman izgleda - od dnevnog boravka, preko kuhinje, do mirnog dvorišta."
        />
      </section>

      <section className="container pb-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {gallery.map((g, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Otvori fotografiju ${i + 1}`}
              onClick={() => setActive(i)}
              className="reveal mb-4 block w-full overflow-hidden rounded-2xl bg-secondary group"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={g.w}
                height={g.h}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {active !== null && (
        <div className="fixed inset-0 z-[60] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setActive(null)}>
          <button type="button" className="absolute top-5 right-5 h-11 w-11 rounded-full bg-card/90 grid place-items-center" onClick={() => setActive(null)} aria-label="Zatvori galeriju">
            <X className="h-5 w-5" />
          </button>
          <button type="button" className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 grid place-items-center"
            aria-label="Prethodna fotografija"
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i! - 1 + gallery.length) % gallery.length); }}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <img
            src={gallery[active].src}
            alt={gallery[active].alt}
            width={gallery[active].w}
            height={gallery[active].h}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-2xl shadow-soft"
            onClick={(e) => e.stopPropagation()}
          />
          <button type="button" className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 grid place-items-center"
            aria-label="Sledeća fotografija"
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i! + 1) % gallery.length); }}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </Layout>
  );
}
