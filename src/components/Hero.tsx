import { useEffect, useRef } from "react";
import { Phone, MapPin } from "lucide-react";
import heroImg from "@/assets/hero.png";
import { SITE } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty("--mx", String(x));
        el.style.setProperty("--my", String(y));
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Ulaz u apartman u Bogaticu"
          className="w-full h-full object-cover"
          width={4624}
          height={2604}
          fetchPriority="high"
          style={{ transform: "translate3d(calc(var(--mx,0)*-10px), calc(var(--my,0)*-10px), 0) scale(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      </div>

      {/* Floating soft shapes */}
      <div
        className="absolute top-24 left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl animate-float"
        style={{ transform: "translate3d(calc(var(--mx,0)*30px), calc(var(--my,0)*30px), 0)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-32 right-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl animate-float"
        style={{ animationDelay: "1.5s", transform: "translate3d(calc(var(--mx,0)*-40px), calc(var(--my,0)*-40px), 0)" }}
        aria-hidden
      />

      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-border animate-fade-in-up">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            Pavla Orlovića 11 · 100m od centra Bogatića
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05] text-balance animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Apartman u Bogatiću gde se osećate <em className="italic text-accent">kao kod kuće</em>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl text-balance animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Savršeno opremljen stan na samo 100m od centra. Mir, udobnost i sve što vam treba - spremno za vaš dolazak.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-7 py-4 rounded-full font-semibold shadow-glow hover:-translate-y-0.5 transition-transform"
            >
              <Phone className="h-5 w-5" /> Pozovite odmah
            </a>
            <a
              href="#detalji"
              className="inline-flex items-center gap-2 bg-card border border-border px-7 py-4 rounded-full font-medium hover:bg-secondary transition-colors"
            >
              Saznajte više
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
