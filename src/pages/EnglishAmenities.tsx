import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import bathroom from "@/assets/bathroom.webp";
import coffee from "@/assets/coffee.webp";
import living from "@/assets/living.webp";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionHeading from "@/components/SectionHeading";
import { amenities } from "@/lib/amenities";
import { baseSchemas } from "@/lib/seo";
import { SITE } from "@/lib/site";

const groups = [
  {
    title: "Slow mornings",
    lead: "This is the part of your stay that needs no planning. Coffee is ready, the kitchen is equipped, and the day can begin at an easy pace.",
    image: coffee,
    imageAlt: "Coffee corner in the apartment",
    labels: ["Aparat za kafu", "4 vrste kafe", "Opremljena kuhinja", "Dvoriste"],
    tone: "bg-gradient-warm",
    tag: "A gentle start",
  },
  {
    title: "Evenings made for rest",
    lead: "When the day is done, the apartment becomes a quiet, comfortable place to unwind. Everything is arranged to help you truly relax.",
    image: living,
    imageAlt: "Living room in the apartment",
    labels: ["2 bracna kreveta", "1 ugaona garnitura na rasklapanje", "Klima", "Smart TV", "Brz WiFi"],
    tone: "bg-card",
    tag: "Room to unwind",
  },
  {
    title: "Everything you don't need to bring",
    lead: "It is a pleasure to arrive and not have to wonder what is missing. The useful little things are already waiting for you.",
    image: bathroom,
    imageAlt: "Apartment bathroom",
    labels: ["Cisti peskiri i posteljina", "Higijenski setovi", "Ves masina", "Pegla i daska", "Fen za kosu"],
    tone: "bg-secondary/45",
    tag: "Thoughtful details",
  },
];

const translations: Record<string, [string, string]> = {
  "Aparat za kafu": ["Coffee machine", "Enjoy a coffee in the morning whenever you are ready to start the day."],
  "4 vrste kafe": ["4 coffee varieties", "Choose the flavor you like and make a little ritual of your own."],
  "Opremljena kuhinja": ["Equipped kitchen", "The essentials for breakfast, a meal or a quick warm drink."],
  Dvoriste: ["Garden", "A quiet spot for morning coffee, a break and a little extra privacy."],
  "2 bracna kreveta": ["2 double beds", "A comfortable layout for couples, families or guests who would like more space."],
  "1 ugaona garnitura na rasklapanje": ["1 sofa bed", "Extra space to relax during the day and a practical sleeping option when needed."],
  Klima: ["Air conditioning", "A comfortable temperature throughout the year, whatever the weather outside."],
  "Smart TV": ["Smart TV", "Enjoy your favorite apps, films and series on the big screen."],
  "Brz WiFi": ["Fast Wi-Fi", "A stable internet connection for work, messaging and relaxing."],
  "Cisti peskiri i posteljina": ["Fresh towels and linen", "Freshly prepared and neatly arranged for every new arrival."],
  "Higijenski setovi": ["Toiletries", "Useful little items to make your stay simpler and more comfortable."],
  "Ves masina": ["Washing machine", "A practical option for longer stays and extra flexibility."],
  "Pegla i daska": ["Iron and ironing board", "Ready if you need to freshen up before heading out or traveling."],
  "Fen za kosu": ["Hair dryer", "Everyday essentials are ready for you in the bathroom."],
};

const amenityMap = new Map(amenities.map((amenity) => [amenity.label, amenity]));

export default function EnglishAmenities() {
  return (
    <Layout>
      <Seo
        title="Apartment amenities | Apartman Dragićević Bogatić"
        description="Explore the amenities at Apartman Dragićević in Bogatić: Wi-Fi, air conditioning, parking, Smart TV, equipped kitchen, modern bathroom and more."
        path="/en/amenities/"
        htmlLang="en"
        schema={baseSchemas}
      />
      <section className="container pt-36 pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="reveal">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Amenities</div>
            <h1 className="mt-4 max-w-xl font-display text-5xl leading-[0.95] text-balance md:text-6xl">
              Not overdone.
              <br />
              Just <em className="italic text-accent">thoughtfully equipped.</em>
            </h1>
          </div>
          <div className="reveal max-w-2xl lg:justify-self-end" style={{ transitionDelay: "90ms" }}>
            <p className="text-lg leading-8 text-muted-foreground">
              Rather than simply listing everything in the apartment, this page gives you a feel for your stay: how mornings begin, where to unwind and which useful details are ready for you.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={SITE.phoneHref} className="cta-grow-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-accent px-6 py-3.5 font-semibold text-accent-foreground">
                <Phone className="h-4 w-4" /> Call now
              </a>
              <Link to="/en/gallery/" className="hero-secondary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 font-semibold text-foreground">
                View photos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-10">
        <div className="reveal rounded-[2rem] border border-border bg-card px-6 py-7 shadow-card md:px-8 md:py-8">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">At a glance</div>
              <p className="mt-3 max-w-2xl font-display text-2xl leading-snug text-balance md:text-3xl">
                Nothing is here just to take up space. Everything has a reason to be here.
              </p>
            </div>
            <div className="grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
              <div className="rounded-2xl bg-secondary/70 p-4">For slower mornings, without rushing.</div>
              <div className="rounded-2xl bg-secondary/70 p-4">For a peaceful rest at the end of the day.</div>
              <div className="rounded-2xl bg-secondary/70 p-4">For a practical stay without packing half your home.</div>
              <div className="rounded-2xl bg-secondary/70 p-4">For the feeling that someone thought ahead.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-24">
        <div className="space-y-16">
          {groups.map((group, index) => (
            <article key={group.title} className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className={`reveal ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`} style={{ transitionDelay: `${index * 70}ms` }}>
                <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
                  <img src={group.image} alt={group.imageAlt} loading="lazy" width={1205} height={1600} className="aspect-[4/3] w-full object-cover" />
                </div>
              </div>
              <div className={`reveal ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`} style={{ transitionDelay: `${index * 70 + 80}ms` }}>
                <div className={`rounded-[2rem] border border-border p-6 shadow-card md:p-8 ${group.tone}`}>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{group.tag}</div>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-balance md:text-4xl">{group.title}</h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">{group.lead}</p>
                  <div className="mt-7 grid gap-3">
                    {group.labels.map((label) => {
                      const amenity = amenityMap.get(label);
                      const translation = translations[label];
                      if (!amenity || !translation) return null;
                      return (
                        <div key={label} className="flex items-start gap-4 rounded-2xl bg-background/80 px-4 py-4">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                            <amenity.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{translation[0]}</div>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">{translation[1]}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <div className="reveal grid gap-6 rounded-[2rem] border border-border bg-card p-6 shadow-card md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Need one more detail?</div>
            <h2 className="mt-3 font-display text-3xl leading-tight text-balance">The easiest way is to ask us directly.</h2>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">
              Sometimes you just need to check availability; other times, you have a small question. In either case, a quick call is easier than a long exchange of messages.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href={SITE.phoneHref} className="cta-grow-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-accent px-6 py-3.5 font-semibold text-accent-foreground">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="hero-secondary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-secondary/70 px-6 py-3.5 font-semibold text-foreground">
              <MapPin className="h-4 w-4" /> How to find us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
