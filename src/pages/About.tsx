import { useEffect } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/lib/site";
import { Phone, Heart, Home, Sparkles } from "lucide-react";
import yard from "@/assets/yard.jpg";

const values = [
  { icon: Heart, title: "Gostoljubivost", text: "Dočekujemo vas kao prijatelje, ne kao goste." },
  { icon: Home, title: "Osećaj doma", text: "Toplina i mir, daleko od bezličnih hotelskih soba." },
  { icon: Sparkles, title: "Pažnja na detalje", text: "Sitnice koje čine boravak izuzetnim." },
];

export default function About() {
  useEffect(() => { document.title = "O nama · Apartman Dragićević"; }, []);
  return (
    <Layout>
      <section className="container pt-36 pb-16">
        <SectionHeading
          eyebrow="O nama"
          title={<>Mali apartman, <em className="italic text-accent">veliko srce</em></>}
          subtitle="Naša priča počinje željom da svakom gostu pružimo iskustvo koje ne zaboravlja — onaj osećaj kada se vrata otvore, a vi znate da ste na pravom mestu."
        />
      </section>

      <section className="container grid lg:grid-cols-2 gap-14 items-center pb-24">
        <div className="reveal">
          <img src={yard} alt="Dvorište apartmana" loading="lazy" width={1280} height={896}
            className="rounded-3xl shadow-soft w-full object-cover aspect-[4/3]" />
        </div>
        <div className="reveal space-y-5 text-lg text-foreground/85 leading-relaxed">
          <p>
            Apartman Dragićević nalazi se u srcu Bogatića, na samo 100m od centra. Kreirali smo
            prostor u kome ćete se osećati kao kod kuće — od trenutka kada uđete pa sve do polaska.
          </p>
          <p>
            Verujemo da pravu razliku čine sitnice. Topla šolja kafe ujutru, sveže voće na stolu,
            čista posteljina sa mirisom doma i osmeh domaćina koji uvek ima vremena za vas.
          </p>
          <p>
            Bilo da putujete poslovno, dolazite kod porodice ili istražujete Mačvu —
            naš stan je vaše utočište. Tiho, udobno i pažljivo opremljeno.
          </p>
        </div>
      </section>

      <section className="container pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {values.map((v, i) => (
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
          <h3 className="font-display text-3xl md:text-4xl">Spremni smo za vaš dolazak</h3>
          <p className="mt-3 text-muted-foreground">Pozovite nas i rezervišite svoj termin.</p>
          <a href={SITE.phoneHref}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-7 py-4 rounded-full font-semibold shadow-glow">
            <Phone className="h-5 w-5" /> {SITE.phone}
          </a>
        </div>
      </section>
    </Layout>
  );
}
