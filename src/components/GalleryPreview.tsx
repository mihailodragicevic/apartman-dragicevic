import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/lib/gallery";
import SectionHeading from "./SectionHeading";

export default function GalleryPreview() {
  const items = gallery.slice(1, 5);
  return (
    <section className="container py-24">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <SectionHeading eyebrow="Galerija" title={<>Pogled u <em className="italic text-accent">prostor</em></>} />
        <Link to="/galerija" className="gallery-link reveal inline-flex items-center gap-2 text-accent font-medium">
          Cela galerija <ArrowRight className="gallery-link-arrow h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((g, i) => (
          <Link
            to="/galerija"
            key={i}
            className="reveal group relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              width={g.w}
              height={g.h}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
