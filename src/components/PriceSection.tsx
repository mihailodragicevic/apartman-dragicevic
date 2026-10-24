import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export default function PriceSection({ locale = "sr" }: { locale?: "sr" | "en" }) {
  return (
    <section className="container py-24">
      <div className="reveal relative overflow-hidden rounded-3xl border border-border bg-gradient-warm p-10 text-center md:p-16">
        <div className="ambient-blob absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" aria-hidden />
        <div className="ambient-blob absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{locale === "sr" ? "Cenovnik" : "Pricing"}</div>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            {locale === "sr" ? <>Cene već od <span className="text-accent">19€</span> po osobi</> : <>Rates from <span className="text-accent">€19</span> per person</>}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {locale === "sr"
              ? "Cena može varirati u zavisnosti od broja noćenja i gostiju. Pozovite nas za preciznu ponudu i dostupnost."
              : "Rates may vary depending on the length of stay and number of guests. Call us for a quote and availability."}
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-7 py-4 font-semibold text-accent-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            <Phone className="h-5 w-5" /> {locale === "sr" ? "Pozovite za rezervaciju" : "Call to book"}
          </a>
        </div>
      </div>
    </section>
  );
}
