import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/lib/site";
import { Phone, Mail, MapPin, LogIn, LogOut } from "lucide-react";
import Seo from "@/components/Seo";
import { baseSchemas, pageSeo } from "@/lib/seo";

export default function Contact() {
  return (
    <Layout>
      <Seo {...pageSeo.contact} schema={baseSchemas} />
      <section className="container pb-12 pt-36">
        <SectionHeading
          as="h1"
          eyebrow="Kontakt"
          title={<>Pozovite za <em className="italic text-accent">rezervaciju</em></>}
          subtitle="Najbrži način - jedan poziv. Tu smo svakog dana, spremni da odgovorimo na sva vaša pitanja."
        />
      </section>

      <section className="container grid gap-8 pb-24 lg:grid-cols-2">
        <div className="reveal space-y-4">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-5 rounded-3xl bg-gradient-accent p-7 text-accent-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-foreground/15">
              <Phone className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm opacity-90">Pozovite odmah</div>
              <div className="font-display text-2xl md:text-3xl">{SITE.phone}</div>
            </span>
          </a>

          <a
            href={SITE.emailHref}
            className="flex items-center gap-5 rounded-3xl border border-border bg-card p-7 transition-colors hover:bg-secondary"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Mail className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-display text-xl">{SITE.email}</div>
            </span>
          </a>

          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 rounded-3xl border border-border bg-card p-7 transition-colors hover:bg-secondary"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
              <MapPin className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm text-muted-foreground">Adresa</div>
              <div className="font-display text-xl">{SITE.address}</div>
            </span>
          </a>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                <LogIn className="h-5 w-5" />
              </span>
              <span>
                <div className="text-sm text-muted-foreground">Prijava (check-in)</div>
                <div className="font-display text-xl">od 14:00h</div>
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                <LogOut className="h-5 w-5" />
              </span>
              <span>
                <div className="text-sm text-muted-foreground">Odjava (check-out)</div>
                <div className="font-display text-xl">do 11:00h</div>
              </span>
            </div>
          </div>
        </div>

        <div className="reveal min-h-[420px] overflow-hidden rounded-3xl border border-border shadow-soft">
          <iframe
            title="Mapa - Pavla Orlovića 11, Bogatić"
            src="https://www.google.com/maps?q=Pavla+Orlovi%C4%87a+11+Bogati%C4%87&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 420 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </Layout>
  );
}
