import { useEffect } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { amenities } from "@/lib/amenities";
import { SITE } from "@/lib/site";
import { Phone } from "lucide-react";

export default function Amenities() {
  useEffect(() => { document.title = "Sadržaj · Apartman Dragićević"; }, []);
  return (
    <Layout>
      <section className="container pt-36 pb-12">
        <SectionHeading
          eyebrow="Sadržaj"
          title={<>Sve pogodnosti pod <em className="italic text-accent">jednim krovom</em></>}
          subtitle="Apartman je opremljen tako da imate sve što vam je potrebno za udoban boravak - bez kompromisa."
        />
      </section>

      <section className="container pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map((a, i) => (
            <div key={a.label} className="reveal bg-card border border-border rounded-2xl p-6 hover:shadow-card hover:-translate-y-0.5 transition-all"
              style={{ transitionDelay: `${i * 40}ms` }}>
              <div className="h-11 w-11 rounded-xl bg-accent-soft text-accent grid place-items-center mb-4">
                <a.icon className="h-5 w-5" />
              </div>
              <div className="font-medium">{a.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <div className="reveal flex flex-col md:flex-row md:items-center justify-between gap-6 bg-secondary/60 border border-border rounded-3xl p-8 md:p-10">
          <div>
            <div className="font-display text-2xl md:text-3xl">Imate posebnu želju?</div>
            <p className="text-muted-foreground mt-1">Slobodno nas pitajte - trudimo se da izađemo u susret.</p>
          </div>
          <a href={SITE.phoneHref}
            className="inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-6 py-3.5 rounded-full font-semibold shadow-card hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap">
            <Phone className="h-4 w-4" /> Pozovite odmah
          </a>
        </div>
      </section>
    </Layout>
  );
}
