import { Plus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import geoContent from "@/geo-content.json";

type Locale = "sr" | "en";

export default function FaqSection({ locale = "sr" }: { locale?: Locale }) {
  const page = geoContent.locales[locale];

  return (
    <section id="faq" className="container py-20 md:py-24">
      <SectionHeading
        eyebrow={locale === "sr" ? "Pitanja i odgovori" : "Questions and answers"}
        title={page.sections.faq}
        subtitle={
          locale === "sr"
            ? "Odgovori na najčešća pitanja o boravku, sadržaju i rezervaciji."
            : "Answers to common questions about the apartment, amenities and booking."
        }
        center
      />
      <div className="mx-auto mt-10 max-w-5xl columns-1 gap-4 md:mt-14 md:columns-2">
        {page.faq.map(([question, answer], index) => (
          <details
            key={question}
            name="apartment-faq"
            className="faq-card reveal mb-4 break-inside-avoid rounded-2xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft open:border-accent/40 open:shadow-soft"
            style={{ transitionDelay: `${Math.min(index % 4, 3) * 60}ms` }}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold marker:hidden md:p-6 [&::-webkit-details-marker]:hidden">
              <span>{question}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-300 group-open:rotate-45">
                <Plus className="h-4 w-4" aria-hidden="true" />
              </span>
            </summary>
            <div className="faq-answer px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6 md:pb-6 md:text-base">
              {answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
