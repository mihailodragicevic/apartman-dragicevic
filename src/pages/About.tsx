import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/lib/site";
import { Phone, Heart, Home, Sparkles } from "lucide-react";
import { pageSeo, baseSchemas } from "@/lib/seo";
import Seo from "@/components/Seo";
import yard from "@/assets/yard.webp";
import { useLocation } from "react-router-dom";

const values = {
  sr: [
    { icon: Heart, title: "Gostoljubivost", text: "Dočekujemo vas kao prijatelje, ne kao goste." },
    { icon: Home, title: "Osećaj doma", text: "Toplina i mir, daleko od bezličnih hotelskih soba." },
    { icon: Sparkles, title: "Pažnja na detalje", text: "Sitnice koje čine boravak izuzetnim." },
  ],
  en: [
    { icon: Heart, title: "Hospitality", text: "We welcome you as friends, not just guests." },
    { icon: Home, title: "A feeling of home", text: "Warmth and peace, away from impersonal hotel rooms." },
    { icon: Sparkles, title: "Attention to detail", text: "The little things that make your stay special." },
  ],
};

export default function About() {
  const isEnglish = useLocation().pathname.startsWith("/en");
  const copy = isEnglish
    ? {
        title: "About us | Apartman Dragićević Bogatić",
        description: "Learn about Apartman Dragićević in Bogatić, our story, hospitality and the details that make guests feel at home.",
        path: "/en/about/",
        eyebrow: "About us",
        heading: <>A small apartment, <em className="italic text-accent">a big heart</em></>,
        intro: "Our story began with a wish to give every guest an experience to remember — the feeling you get when the door opens and you know you are in the right place.",
        paragraphs: [
          "Apartman Dragićević is in the heart of Bogatić, just 100 m from the town center. We created a space where you can feel at home, from the moment you arrive until it is time to leave.",
          "We believe the little things make all the difference: a warm cup of coffee in the morning, fresh fruit on the table, clean linen and a welcoming host who always has time for you.",
          "Whether you are traveling for work, visiting family or exploring Mačva, our apartment is your retreat: quiet, comfortable and thoughtfully equipped.",
        ],
        closingTitle: "Ready for your stay?",
        closingText: "Call us to check availability and book your dates.",
        call: "Call now",
      }
    : {
        ...pageSeo.about,
        eyebrow: "O nama",
        heading: <>Mali apartman, <em className="italic text-accent">veliko srce</em></>,
        intro: "Naša priča počinje željom da svakom gostu pružimo iskustvo koje ne zaboravlja - onaj osećaj kada se vrata otvore, a vi znate da ste na pravom mestu.",
        paragraphs: [
          "Apartman Dragićević nalazi se u srcu Bogatića, na samo 100m od centra. Kreirali smo prostor u kome ćete se osećati kao kod kuće - od trenutka kada uđete pa sve do polaska.",
          "Verujemo da pravu razliku čine sitnice. Topla šolja kafe ujutru, sveže voće na stolu, čista posteljina sa mirisom doma i osmeh domaćina koji uvek ima vremena za vas.",
          "Bilo da putujete poslovno, dolazite kod porodice ili istražujete Mačvu - naš stan je vaše utočište. Tiho, udobno i pažljivo opremljeno.",
        ],
        closingTitle: "Spremni smo za vaš dolazak",
        closingText: "Pozovite nas i rezervišite svoj termin.",
        call: "Pozovite odmah",
      };
  const pageValues = isEnglish ? values.en : values.sr;

  return (
    <Layout>
      <Seo title={copy.title} description={copy.description} path={copy.path} htmlLang={isEnglish ? "en" : "sr"} schema={baseSchemas} />
      <section className="container pt-36 pb-16">
        <SectionHeading
          as="h1"
          eyebrow={copy.eyebrow}
          title={copy.heading}
          subtitle={copy.intro}
        />
      </section>

      <section className="container grid lg:grid-cols-2 gap-14 items-center pb-24">
        <div className="reveal">
          <img
            src={yard}
            alt={isEnglish ? "Apartment garden in Bogatić" : "Dvorište apartmana u Bogatiću"}
            loading="lazy"
            width={1205}
            height={1600}
            className="rounded-3xl shadow-soft w-full object-cover aspect-[4/3]"
          />
        </div>
        <div className="reveal space-y-5 text-lg text-foreground/85 leading-relaxed">
          {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="container pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {pageValues.map((v, i) => (
            <div key={v.title} className="reveal bg-card border border-border rounded-2xl p-7 shadow-card"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="h-11 w-11 rounded-xl bg-accent-soft text-accent grid place-items-center mb-4">
                <v.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-xl">{v.title}</div>
              <p className="mt-2 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <div className="reveal text-center bg-gradient-warm border border-border rounded-3xl p-12">
          <h3 className="font-display text-3xl md:text-4xl">{copy.closingTitle}</h3>
          <p className="mt-3 text-muted-foreground">{copy.closingText}</p>
          <a href={SITE.phoneHref}
            className="cta-grow-button mt-6 inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-7 py-4 rounded-full font-semibold">
            <Phone className="h-5 w-5" /> {copy.call}: {SITE.phone}
          </a>
        </div>
      </section>
    </Layout>
  );
}
