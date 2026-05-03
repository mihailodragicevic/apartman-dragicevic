import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export default function PriceSection() {
  return (
    <section className="container py-24">
      <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-warm border border-border p-10 md:p-16 text-center">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Cenovnik</div>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            Cene već od <span className="text-accent">30€</span> po osobi
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Cena može varirati u zavisnosti od broja noćenja i gostiju. Pozovite nas za preciznu ponudu i dostupnost.
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-8 inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-7 py-4 rounded-full font-semibold shadow-glow hover:-translate-y-0.5 transition-transform"
          >
            <Phone className="h-5 w-5" /> Pozovite za rezervaciju
          </a>
        </div>
      </div>
    </section>
  );
}
