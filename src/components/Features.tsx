import { Users, Car, Wifi, Wind, Home } from "lucide-react";
import SectionHeading from "./SectionHeading";

const items = [
  { icon: Users, title: "Do 4 osobe", text: "Idealno za porodicu ili manje društvo." },
  { icon: Car, title: "Besplatan parking", text: "Sigurno parking mesto ispred apartmana." },
  { icon: Wifi, title: "WiFi + Smart TV", text: "Brz internet i sve omiljene aplikacije." },
  { icon: Wind, title: "Klima", text: "Prijatna temperatura tokom cele godine." },
  { icon: Home, title: "Kao kod kuće", text: "Kompletno opremljen do najsitnijih detalja." },
];

export default function Features() {
  return (
    <section id="detalji" className="container py-24">
      <SectionHeading
        eyebrow="Pogodnosti"
        title="Sve što vam je potrebno za savršen boravak"
        subtitle="Pažljivo osmišljen prostor sa svim pogodnostima koje očekujete od premium smeštaja."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((it, i) => (
          <div
            key={it.title}
            className="reveal bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-500"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="h-11 w-11 rounded-xl bg-accent-soft text-accent grid place-items-center mb-4">
              <it.icon className="h-5 w-5" />
            </div>
            <div className="font-display text-lg">{it.title}</div>
            <p className="text-sm text-muted-foreground mt-1.5">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
