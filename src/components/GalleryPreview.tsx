import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gallery, getEnglishGalleryAlt } from "@/lib/gallery";
import SectionHeading from "./SectionHeading";

const previewImages = [
  gallery.find((item) => item.alt.includes("spavaća soba detalj 1")) ?? gallery[0],
  gallery.find((item) => item.alt.includes("enterijer apartmana 5")) ?? gallery[1],
  gallery.find((item) => item.alt.includes("kutak za kafu")) ?? gallery[2],
  gallery.find((item) => item.alt.includes("dnevni boravak")) ?? gallery[3],
];

export default function GalleryPreview({ locale = "sr" }: { locale?: "sr" | "en" }) {
  const items = previewImages;
  const galleryPath = locale === "sr" ? "/galerija" : "/en/gallery/";
  return (
    <section className="container py-24">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <SectionHeading eyebrow={locale === "sr" ? "Galerija" : "Gallery"} title={locale === "sr" ? <>Pogled u <em className="italic text-accent">prostor</em></> : <>Take a look <em className="italic text-accent">inside</em></>} />
        <Link to={galleryPath} className="gallery-link reveal inline-flex items-center gap-2 text-accent font-medium">
          {locale === "sr" ? "Cela galerija" : "View the gallery"} <ArrowRight className="gallery-link-arrow h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((g, i) => (
          <Link
            to={galleryPath}
            key={i}
            className="reveal group relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <img
              src={g.src}
              alt={locale === "en" ? getEnglishGalleryAlt(g.alt) : g.alt}
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
