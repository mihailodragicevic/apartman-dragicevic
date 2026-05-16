import { Star } from "lucide-react";
import { SITE } from "@/lib/site";
import SectionHeading from "./SectionHeading";

export default function ReviewSection() {
  return (
    <section className="container py-24">
      <SectionHeading
        center
        eyebrow="Recenzije"
        title={<>Vaše mišljenje nam <em className="italic text-accent">znači</em></>}
        subtitle="Ako ste boravili kod nas, podelite svoje iskustvo i pomozite drugim gostima."
      />
      <div className="reveal mt-10 flex flex-col items-center gap-5">
        <div className="flex gap-1 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-6 w-6 fill-current" />
          ))}
        </div>
        <a
          href={SITE.reviewUrl}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-card border border-border px-7 py-4 rounded-full font-semibold hover:bg-secondary transition-colors"
        >
          Ocenite nas na Google-u
        </a>
      </div>
    </section>
  );
}
