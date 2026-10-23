import geoContent from "@/geo-content.json";

type Locale = "sr" | "en";

export default function GeoDetails({ locale }: { locale: Locale }) {
  const page = geoContent.locales[locale];
  const imageAlt = locale;

  return (
    <section id="detalji" className="container space-y-12 py-16 md:py-24">
      <div className="mx-auto max-w-4xl space-y-4 text-center">
        {page.intro.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-10">
        <h2 className="mb-6 font-display text-3xl md:text-4xl">{page.sections.facts}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <tbody>
              {page.facts.map(([label, value]) => (
                <tr key={label} className="border-b border-border last:border-0">
                  <th scope="row" className="w-1/3 py-3 pr-5 font-semibold">{label}</th>
                  <td className="py-3 text-muted-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-warm p-6 md:p-10">
        <h2 className="font-display text-3xl md:text-4xl">{page.sections.prices}</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">{page.sections.priceNote}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full max-w-xl border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-5">{page.sections.guests}</th>
                <th scope="col" className="py-3">{page.sections.pricePerNight}</th>
              </tr>
            </thead>
            <tbody>
              {page.prices.map(([guests, price]) => (
                <tr key={guests} className="border-b border-border last:border-0">
                  <td className="py-3 pr-5">{guests}</td>
                  <td className="py-3 font-semibold">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-display text-3xl md:text-4xl">{page.sections.photos}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {geoContent.images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt[imageAlt]}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              width={800}
              height={600}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-display text-3xl md:text-4xl">{page.sections.faq}</h2>
        <div className="space-y-3">
          {page.faq.map(([question, answer]) => (
            <details key={question} className="rounded-2xl border border-border bg-card px-5 py-4">
              <summary className="cursor-pointer font-semibold">{question}</summary>
              <p className="pt-3 leading-relaxed text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </section>
  );
}
