import { useEffect } from "react";
import geoContent from "@/geo-content.json";

type Locale = "sr" | "en";

export default function FaqSection({ locale = "sr" }: { locale?: Locale }) {
  const page = geoContent.locales[locale];
  const questions = geoContent.faq;

  useEffect(() => {
    const openLinkedQuestion = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith("faq-")) return;

      const question = document.getElementById(id);
      if (question instanceof HTMLDetailsElement) question.open = true;
    };

    openLinkedQuestion();
    window.addEventListener("hashchange", openLinkedQuestion);
    return () => window.removeEventListener("hashchange", openLinkedQuestion);
  }, []);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="container py-20 md:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="faq-heading" className="font-display text-4xl leading-tight text-balance md:text-5xl">
          {page.sections.faq}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-balance">
          {locale === "sr"
            ? "Odgovori na najčešća pitanja o boravku i rezervaciji."
            : "Answers to common questions about your stay and booking."}
        </p>
      </div>

      <div className="faq-grid mx-auto mt-10 max-w-5xl md:mt-14">
        {[questions.slice(0, 6), questions.slice(6)].map((column, columnIndex) => (
          <div className="faq-column" key={columnIndex}>
            {column.map(({ id, [locale]: content }) => (
              <details
                className="faq-card group rounded-2xl border border-border bg-card shadow-card transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-soft"
                id={`faq-${id}`}
                key={id}
              >
                <summary className="faq-question flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-base font-semibold leading-snug text-card-foreground marker:hidden md:text-lg [&::-webkit-details-marker]:hidden">
                  <span>{content.question}</span>
                  <span className="faq-indicator" aria-hidden="true" />
                </summary>
                <div className="faq-answer px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground md:px-6 md:pb-6 md:text-base">
                  <p className="max-w-[60ch]">{content.answer}</p>
                </div>
              </details>
            ))}
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-5xl text-center text-base text-muted-foreground">
        {locale === "sr" ? (
          <>
            Niste našli odgovor? Pozovite{" "}
            <a className="font-semibold text-foreground underline decoration-accent underline-offset-4" href="tel:+381658103247">
              +381 65 8103247
            </a>{" "}
            ili{" "}
            <a
              className="font-semibold text-foreground underline decoration-accent underline-offset-4"
              href="/kontakt/"
            >
              pošaljite zahtev
            </a>
            .
          </>
        ) : (
          <>
            Can&apos;t find your answer? Call{" "}
            <a className="font-semibold text-foreground underline decoration-accent underline-offset-4" href="tel:+381658103247">
              +381 65 8103247
            </a>{" "}
            or{" "}
            <a
              className="font-semibold text-foreground underline decoration-accent underline-offset-4"
              href="/en/contact/"
            >
              send a request
            </a>
            .
          </>
        )}
      </p>
    </section>
  );
}
