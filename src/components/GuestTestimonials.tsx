import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { guestTestimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

function getRelativeOffset(index: number, selected: number, total: number) {
  let diff = index - selected;

  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  return diff;
}

export default function GuestTestimonials({ locale = "sr" }: { locale?: "sr" | "en" }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateSelected = () => setSelectedIndex(api.selectedScrollSnap());

    updateSelected();
    api.on("select", updateSelected);
    api.on("reInit", updateSelected);

    return () => {
      api.off("select", updateSelected);
      api.off("reInit", updateSelected);
    };
  }, [api]);

  return (
    <section className="container py-24 overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={locale === "sr" ? "Utisci gostiju" : "Guest experiences"}
          title={locale === "sr" ? <>Kako boravak izgleda kada ga <em className="italic text-accent">prepričaju gosti</em></> : <>A stay, told in our guests’ <em className="italic text-accent">own words</em></>}
          subtitle={locale === "sr" ? "Jedan po jedan utisak, bez žurbe. Glavna kartica je u fokusu, a sledeće se blago naziru sa strane kao naredni kadar." : "Take your time with each review. The active card stays in focus while the next ones peek in at the sides."}
        />

        <div className="reveal flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={locale === "sr" ? "Prethodna recenzija" : "Previous review"}
            className="h-11 w-11 rounded-full border-border bg-card/90 shadow-card hover:bg-secondary"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={locale === "sr" ? "Sledeća recenzija" : "Next review"}
            className="h-11 w-11 rounded-full border-border bg-card/90 shadow-card hover:bg-secondary"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="reveal mt-12"
      >
        <CarouselContent className="-ml-0">
          {guestTestimonials.map((testimonial, index) => {
            const offset = getRelativeOffset(index, selectedIndex, guestTestimonials.length);
            const isActive = offset === 0;
            const isNeighbor = Math.abs(offset) === 1;

            return (
              <CarouselItem
                key={`${testimonial.author}-${index}`}
                className="basis-[88%] pl-4 sm:basis-[78%] md:basis-[68%] lg:basis-[60%] xl:basis-[56%]"
              >
                <article
                  className={cn(
                    "testimonial-stage-card relative min-h-full rounded-[2rem] border border-border/80 bg-card p-6 shadow-soft transition-all duration-500 md:p-8",
                    isActive && "opacity-100 scale-100 translate-y-0",
                    isNeighbor && "opacity-60 scale-[0.92] translate-y-5",
                    !isActive && !isNeighbor && "opacity-20 scale-[0.86] translate-y-8",
                  )}
                  aria-hidden={!isActive}
                >
                  <div className="pointer-events-none absolute right-6 top-6 text-accent/18">
                    <Quote className="h-12 w-12" />
                  </div>

                  <div className="flex flex-wrap items-start justify-between gap-4 pr-10">
                    <div>
                      <div className="font-display text-2xl leading-tight">{testimonial.author}</div>
                      <p className="mt-1 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                        {locale === "en"
                          ? ({ Srbija: "Serbia", Nemačka: "Germany", Holandija: "the Netherlands", Austrija: "Austria" }[testimonial.country] ?? testimonial.country)
                          : testimonial.country}
                      </p>
                    </div>

                    <div className="rounded-full bg-accent-soft px-4 py-2 text-right">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                        {locale === "sr" ? "Ocena" : "Rating"}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="font-display text-2xl leading-none text-foreground">
                          {testimonial.rating}
                        </div>
                        <div className="flex gap-1 text-accent">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-[15px] leading-7 text-foreground/85 md:text-base md:leading-8">
                    {(locale === "en"
                      ? [
                          "Everything was just as it should be: clean, functional and very welcoming. It felt as if we had come to visit relatives, and the location was excellent and peaceful.",
                          "The apartment was spacious, tidy and full of little touches that made the stay easier. Our host Mira is wonderful, considerate and always ready to help.",
                          "Peaceful, clean and nicely equipped. Everything was just a few steps away, yet we still had quiet and could return to a peaceful place. I highly recommend it.",
                          "The apartment was fully equipped and very clean. The hosts were lovely, communication was excellent, and the stay was pleasant and stress-free.",
                          "A warm welcome, excellent communication and a very tidy apartment. Everything we needed was available, and the stay felt very comfortable and relaxing.",
                          "The service was exceptionally good and everything was in perfect order. The cleanliness, peace and attention to detail left a very positive impression.",
                          "A central location, kind hosts and a very pleasant stay. Everything had a little extra care and warmth, which you notice right away.",
                        ][index] ?? ""
                      : testimonial.paragraphs[0] ?? "").split("\n").map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
