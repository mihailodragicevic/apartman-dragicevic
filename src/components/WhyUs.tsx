import SectionHeading from "./SectionHeading";
import { Check } from "lucide-react";
import { publicAssetPath } from "@/lib/publicAsset";

const coffeeImageSrc = publicAssetPath("/images/gallery/apartman-bogatic-kafa-i-detali-1200.webp");
const coffeeImageSrcSet = [
  `${publicAssetPath("/images/gallery/apartman-bogatic-kafa-i-detali-480.webp")} 480w`,
  `${publicAssetPath("/images/gallery/apartman-bogatic-kafa-i-detali-768.webp")} 768w`,
  `${publicAssetPath("/images/gallery/apartman-bogatic-kafa-i-detali-1200.webp")} 1200w`,
].join(", ");

const details = [
  "Aparat za kafu + više vrsta kafe",
  "Voće, sokovi i mleko za kafu",
  "Higijenski setovi i čisti peškiri",
  "Pegla, fen i veš mašina",
  "Posteljina visokog kvaliteta",
  "Domaćinski pristup od dolaska do odlaska",
];

export default function WhyUs() {
  return (
    <section className="bg-secondary/50">
      <div className="container py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div className="reveal relative">
          <picture className="block">
            <source srcSet={coffeeImageSrcSet} sizes="(min-width: 1024px) 50vw, 100vw" type="image/webp" />
            <img
              src={coffeeImageSrc}
              srcSet={coffeeImageSrcSet}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="Aparat za kafu i šolje na pultu apartmana"
              loading="lazy"
              width={1205}
              height={1600}
              className="rounded-3xl shadow-soft w-full object-cover aspect-square"
            />
          </picture>
          <div className="absolute -bottom-6 -right-4 md:-right-8 bg-card border border-border rounded-2xl px-5 py-4 shadow-card max-w-[14rem]">
            <div className="text-xs text-muted-foreground">Ocena gostiju</div>
            <div className="font-display text-2xl">5.0 / 5.0</div>
            <div className="text-xs text-accent">★★★★★</div>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Zašto baš mi"
            title={<>Detalji koji prave <em className="italic text-accent">razliku</em></>}
            subtitle="Verujemo da je gostoljubivost u sitnicama. Svaki detalj je tu da se osećate prijatno."
          />
          <ul className="mt-8 space-y-3">
            {details.map((d, i) => (
              <li key={d} className="reveal flex items-start gap-3" style={{ transitionDelay: `${i * 50}ms` }}>
                <span className="mt-0.5 h-6 w-6 rounded-full bg-accent/15 text-accent grid place-items-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-foreground/90">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
