import { Star } from "lucide-react";
import { SITE } from "@/lib/site";
import SectionHeading from "./SectionHeading";

export default function ReviewSection({ locale = "sr" }: { locale?: "sr" | "en" }) {
  return (
    <section className="container py-24">
      <SectionHeading
        center
        eyebrow={locale === "sr" ? "Recenzije" : "Reviews"}
        title={locale === "sr" ? <>Vaše mišljenje nam <em className="italic text-accent">znači</em></> : <>Your feedback <em className="italic text-accent">matters</em></>}
        subtitle={locale === "sr" ? "Ako ste boravili kod nas, podelite svoje iskustvo i pomozite drugim gostima." : "If you have stayed with us, share your experience and help future guests."}
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
          {locale === "sr" ? "Ocenite nas na Google-u" : "Rate us on Google"}
        </a>
      </div>
    </section>
  );
}
