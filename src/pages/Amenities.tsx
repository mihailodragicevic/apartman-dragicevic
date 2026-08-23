import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import bathroom from "@/assets/bathroom.webp";
import coffee from "@/assets/coffee.webp";
import living from "@/assets/living.webp";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { amenities } from "@/lib/amenities";
import { baseSchemas, pageSeo } from "@/lib/seo";
import { SITE } from "@/lib/site";

const sections = [
  {
    title: "Jutro bez zurbe",
    lead:
      "Ovo je onaj deo boravka koji ne mora da se planira. Kafa je tu, kuhinja je spremna, a ritam dana moze da pocne polako.",
    image: coffee,
    imageAlt: "Kutak za kafu u apartmanu Dragicevic",
    labels: ["Aparat za kafu", "4 vrste kafe", "Opremljena kuhinja", "Dvoriste"],
    tone: "warm" as const,
  },
  {
    title: "Vece za odmor",
    lead:
      "Kada se dan zavrsi, prostor postaje tih, udoban i lagan za boravak. Sve je podredjeno tome da se stvarno odmorite.",
    image: living,
    imageAlt: "Dnevni boravak apartmana Dragicevic",
    labels: ["2 bracna kreveta", "1 ugaona garnitura na rasklapanje", "Klima", "Smart TV", "Brz WiFi"],
    tone: "soft" as const,
  },
  {
    title: (
      <>
        Sve sto <span className="font-display text-accent italic">ne morate</span> da nosite sa sobom
      </>
    ),
    lead:
      (
        <>
          Najlepse je kada stignete i <span className="font-display text-accent italic">ne morate</span> da razmisljate sta fali. Sitnice koje obicno zatrebaju vec cekaju svoje mesto.
        </>
      ),
    image: bathroom,
    imageAlt: "Kupatilo apartmana Dragicevic",
    labels: [
      "Cisti peskiri i posteljina",
      "Higijenski setovi",
      "Ves masina",
      "Pegla i daska",
      "Fen za kosu",
    ],
    tone: "clean" as const,
  },
];

const amenityMap = new Map(amenities.map((item) => [item.label, item]));

export default function Amenities() {
  return (
    <Layout>
      <Seo {...pageSeo.amenities} schema={baseSchemas} />

      <section className="container pt-36 pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="reveal">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Sadrzaj
            </div>
            <h1 className="mt-4 max-w-xl font-display text-5xl leading-[0.95] text-balance md:text-6xl">
              Nije pretrpano.
              <br />
              Samo je
              {" "}
              <em className="italic text-accent">dobro smisljeno.</em>
            </h1>
          </div>

          <div className="reveal max-w-2xl lg:justify-self-end" style={{ transitionDelay: "90ms" }}>
            <p className="text-lg leading-8 text-muted-foreground">
              Umesto da samo nabrajamo sta se sve nalazi u apartmanu,
              ovu stranicu smo slozili kao mali pregled boravka: kako izgleda
              jutro, gde se najlakse odmara i koje sitnice vas sacekaju spremne.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE.phoneHref}
                className="cta-grow-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-accent px-6 py-3.5 font-semibold text-accent-foreground"
              >
                <Phone className="h-4 w-4" />
                Pozovite odmah
              </a>
              <Link
                to="/galerija"
                className="hero-secondary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 font-semibold text-foreground"
              >
                Pogledajte fotografije
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-10">
        <div className="reveal rounded-[2rem] border border-border bg-card px-6 py-7 shadow-card md:px-8 md:py-8">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Ukratko
              </div>
              <p className="mt-3 max-w-2xl font-display text-2xl leading-snug text-balance md:text-3xl">
                Ovaj prostor nije pun stvari koje samo stoje.
                Svaka od njih ima razlog da bude tu.
              </p>
            </div>
            <div className="grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
              <div className="rounded-2xl bg-secondary/70 p-4">
                Za sporija jutra, bez zurbe i trcanja.
              </div>
              <div className="rounded-2xl bg-secondary/70 p-4">
                Za miran odmor kada se dan zavrsi.
              </div>
              <div className="rounded-2xl bg-secondary/70 p-4">
                Za praktican boravak bez nosenja pola kuce.
              </div>
              <div className="rounded-2xl bg-secondary/70 p-4">
                Za utisak da je neko razmisljao unapred.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-24">
        <div className="space-y-16">
          {sections.map((section, sectionIndex) => {
            const items = section.labels
              .map((label) => amenityMap.get(label))
              .filter((item): item is NonNullable<typeof item> => Boolean(item));

            const imageFirst = sectionIndex % 2 === 0;
            const articleTone =
              section.tone === "warm"
                ? "bg-gradient-warm"
                : section.tone === "clean"
                  ? "bg-secondary/45"
                  : "bg-card";

            return (
              <article
                key={section.title}
                className="grid gap-8 lg:grid-cols-2 lg:items-center"
              >
                <div
                  className={`reveal ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
                  style={{ transitionDelay: `${sectionIndex * 70}ms` }}
                >
                  <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      loading="lazy"
                      width={1205}
                      height={1600}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`reveal ${imageFirst ? "lg:order-2" : "lg:order-1"}`}
                  style={{ transitionDelay: `${sectionIndex * 70 + 80}ms` }}
                >
                  <div className={`rounded-[2rem] border border-border p-6 shadow-card md:p-8 ${articleTone}`}>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                      {sectionIndex === 0 ? "Prvi utisak" : sectionIndex === 1 ? "Ritam veceri" : "Miran detalj"}
                    </div>
                    <h2 className="mt-3 font-display text-3xl leading-tight text-balance md:text-4xl">
                      {section.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                      {section.lead}
                    </p>

                    <div className="mt-7 grid gap-3">
                      {items.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-start gap-4 rounded-2xl bg-background/80 px-4 py-4"
                        >
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{item.label}</div>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container pb-24">
        <div className="reveal grid gap-6 rounded-[2rem] border border-border bg-card p-6 shadow-card md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Ako vam treba jos jedan detalj
            </div>
            <h3 className="mt-3 font-display text-3xl leading-tight text-balance">
              Najlakse je da pitate direktno.
            </h3>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">
              Nekad je dovoljno samo da proverite termin, a nekad da pitate za
              nesto sasvim malo. U oba slucaja, brz poziv resava sve jednostavnije
              nego dugacko dopisivanje.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={SITE.phoneHref}
              className="cta-grow-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-accent px-6 py-3.5 font-semibold text-accent-foreground"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="hero-secondary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-secondary/70 px-6 py-3.5 font-semibold text-foreground"
            >
              <MapPin className="h-4 w-4" />
              Kako do nas
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
