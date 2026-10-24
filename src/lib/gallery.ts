import living from "@/assets/living.webp";
import bedroom from "@/assets/bedroom.webp";
import bedroom2 from "@/assets/bedroom2.webp";
import spavaca1 from "@/assets/spavaca1.webp";
import spavaca2 from "@/assets/spavaca2.webp";
import spavaca3 from "@/assets/spavaca3.webp";
import spavaca4 from "@/assets/spavaca4.webp";
import spavaca5 from "@/assets/spavaca5.webp";
import kupatiloNarandzasto from "@/assets/kupatilo-narandzasto.webp";
import kitchen from "@/assets/kitchen.webp";
import bathroom from "@/assets/bathroom.webp";
import coffee from "@/assets/coffee.webp";
import yard from "@/assets/yard.webp";
import interior1 from "@/assets/643299935.webp";
import interior2 from "@/assets/643299897.webp";
import interior3 from "@/assets/IMG-43eaaac53037ca7718c2f619b10446f7-V.webp";
import interior4 from "@/assets/IMG-f29421250edcc9ffa79cb580592ec8e3-V.webp";
import interior5 from "@/assets/20250905_140627.webp";
import interior6 from "@/assets/20250905_140638.webp";
import interior7 from "@/assets/20250905_140645.webp";
import interior8 from "@/assets/20250905_140747.webp";

export type GalleryItem = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

export const getEnglishGalleryAlt = (alt: string) => {
  const subject = alt.replace("Apartman Dragićević - ", "");
  if (subject.startsWith("dnevni boravak")) return "Apartman Dragićević - living room";
  if (subject.startsWith("spavaća soba detalj")) return `Apartman Dragićević - bedroom detail ${subject.slice(-1)}`;
  if (subject === "spavaća soba") return "Apartman Dragićević - bedroom";
  if (subject === "moderno kupatilo") return "Apartman Dragićević - modern bathroom";
  if (subject === "detalj kupatila") return "Apartman Dragićević - bathroom detail";
  if (subject === "opremljena kuhinja") return "Apartman Dragićević - equipped kitchen";
  if (subject === "kutak za kafu") return "Apartman Dragićević - coffee corner";
  if (subject === "dvorište") return "Apartman Dragićević - garden";
  return subject.startsWith("enterijer apartmana")
    ? `Apartman Dragićević - apartment interior ${subject.slice(-1)}`
    : `Apartman Dragićević - ${subject}`;
};

export const gallery: GalleryItem[] = [
  { src: living, alt: "Apartman Dragićević - dnevni boravak", w: 1205, h: 1600 },
  { src: bedroom, alt: "Apartman Dragićević - spavaća soba", w: 1200, h: 1600 },
  { src: spavaca1, alt: "Apartman Dragićević - spavaća soba detalj 1", w: 1200, h: 1600 },
  { src: spavaca2, alt: "Apartman Dragićević - spavaća soba detalj 2", w: 1200, h: 1600 },
  { src: spavaca3, alt: "Apartman Dragićević - spavaća soba detalj 3", w: 1200, h: 1600 },
  { src: spavaca4, alt: "Apartman Dragićević - spavaća soba detalj 4", w: 1200, h: 1600 },
  { src: spavaca5, alt: "Apartman Dragićević - spavaća soba detalj 5", w: 1200, h: 1600 },
  { src: kupatiloNarandzasto, alt: "Apartman Dragićević - moderno kupatilo", w: 4000, h: 2250 },
  { src: kitchen, alt: "Apartman Dragićević - opremljena kuhinja", w: 1024, h: 768 },
  { src: bathroom, alt: "Apartman Dragićević - detalj kupatila", w: 4000, h: 2250 },
  { src: coffee, alt: "Apartman Dragićević - kutak za kafu", w: 1205, h: 1600 },
  { src: yard, alt: "Apartman Dragićević - dvorište", w: 1205, h: 1600 },
  { src: interior1, alt: "Apartman Dragićević - enterijer apartmana 1", w: 576, h: 768 },
  { src: interior2, alt: "Apartman Dragićević - enterijer apartmana 2", w: 576, h: 768 },
  { src: interior3, alt: "Apartman Dragićević - enterijer apartmana 3", w: 1200, h: 1600 },
  { src: interior4, alt: "Apartman Dragićević - enterijer apartmana 4", w: 1200, h: 1600 },
  { src: interior5, alt: "Apartman Dragićević - enterijer apartmana 5", w: 4000, h: 2250 },
  { src: interior6, alt: "Apartman Dragićević - enterijer apartmana 6", w: 4000, h: 2250 },
  { src: interior7, alt: "Apartman Dragićević - enterijer apartmana 7", w: 4000, h: 2250 },
  { src: interior8, alt: "Apartman Dragićević - enterijer apartmana 8", w: 4000, h: 2250 },
];
