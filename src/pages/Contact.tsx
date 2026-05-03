import { useEffect } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/lib/site";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  useEffect(() => { document.title = "Kontakt · Apartman Dragićević"; }, []);
  return (
    <Layout>
      <section className="container pt-36 pb-12">
        <SectionHeading
          eyebrow="Kontakt"
          title={<>Pozovite za <em className="italic text-accent">rezervaciju</em></>}
          subtitle="Najbrži način — jedan poziv. Tu smo svakog dana, spremni da odgovorimo na sva vaša pitanja."
        />
      </section>

      <section className="container grid lg:grid-cols-2 gap-8 pb-24">
        <div className="reveal space-y-4">
          <a href={SITE.phoneHref}
            className="flex items-center gap-5 bg-gradient-accent text-accent-foreground rounded-3xl p-7 shadow-glow hover:-translate-y-0.5 transition-transform">
            <span className="h-14 w-14 rounded-2xl bg-accent-foreground/15 grid place-items-center">
              <Phone className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm opacity-90">Pozovite odmah</div>
              <div className="font-display text-2xl md:text-3xl">{SITE.phone}</div>
            </span>
          </a>

          <a href={SITE.emailHref}
            className="flex items-center gap-5 bg-card border border-border rounded-3xl p-7 hover:bg-secondary transition-colors">
            <span className="h-14 w-14 rounded-2xl bg-accent-soft text-accent grid place-items-center">
              <Mail className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-display text-xl">{SITE.email}</div>
            </span>
          </a>

          <a href={SITE.mapsUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-5 bg-card border border-border rounded-3xl p-7 hover:bg-secondary transition-colors">
            <span className="h-14 w-14 rounded-2xl bg-accent-soft text-accent grid place-items-center">
              <MapPin className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm text-muted-foreground">Adresa</div>
              <div className="font-display text-xl">{SITE.address}</div>
            </span>
          </a>

          <div className="flex items-center gap-5 bg-card border border-border rounded-3xl p-7">
            <span className="h-14 w-14 rounded-2xl bg-accent-soft text-accent grid place-items-center">
              <Clock className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm text-muted-foreground">Radno vreme</div>
              <div className="font-display text-xl">Svakog dana · 08–22h</div>
            </span>
          </div>
        </div>

        <div className="reveal rounded-3xl overflow-hidden shadow-soft border border-border min-h-[420px]">
          <iframe
            title="Mapa - Pavla Orlovića 11, Bogatić"
            src="https://www.google.com/maps?q=Pavla+Orlovi%C4%87a+11+Bogati%C4%87&output=embed"
            width="100%" height="100%" style={{ border: 0, minHeight: 420 }}
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </Layout>
  );
}
