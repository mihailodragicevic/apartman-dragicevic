import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Car,
  Coffee,
  Shirt,
  ShowerHead,
  Sofa,
  Sparkles,
  Trees,
  Tv,
  Utensils,
  WashingMachine,
  Wifi,
  Wind,
  Wind as Fan,
} from "lucide-react";

export const amenityCategories = [
  {
    title: "Komfor i odmor",
    description: "Sve sto stvara osecaj doma, mira i opustenog boravka.",
  },
  {
    title: "Prakticne stvari",
    description: "Detalji koji olaksavaju kraci i duzi boravak bez dodatnog planiranja.",
  },
  {
    title: "Sitnice koje znace",
    description: "Male paznje koje apartman cine toplijim i prijatnijim.",
  },
] as const;

export type AmenityCategory = (typeof amenityCategories)[number]["title"];

export type Amenity = {
  icon: LucideIcon;
  label: string;
  description: string;
  category: AmenityCategory;
  featured?: boolean;
};

export const amenities: Amenity[] = [
  {
    icon: Wind,
    label: "Klima",
    description: "Prijatna temperatura tokom cele godine, bez obzira na vreme napolju.",
    category: "Komfor i odmor",
  },
  {
    icon: BedDouble,
    label: "2 bracna kreveta",
    description: "Komforan raspored za parove, porodice ili goste koji zele vise prostora.",
    category: "Komfor i odmor",
    featured: true,
  },
  {
    icon: Sofa,
    label: "1 ugaona garnitura na rasklapanje",
    description: "Dodatno mesto za odmor preko dana i prakticno spavanje po potrebi.",
    category: "Komfor i odmor",
    featured: true,
  },
  {
    icon: Tv,
    label: "Smart TV",
    description: "Omiljene aplikacije, filmovi i serije na velikom ekranu kada pozelite predah.",
    category: "Komfor i odmor",
  },
  {
    icon: Wifi,
    label: "Brz WiFi",
    description: "Stabilna internet veza za posao, dopisivanje i opustanje bez prekida.",
    category: "Komfor i odmor",
  },
  {
    icon: Trees,
    label: "Dvoriste",
    description: "Miran kutak za jutarnju kafu, predah i malo vise privatnosti.",
    category: "Komfor i odmor",
  },
  {
    icon: Car,
    label: "Besplatan parking",
    description: "Mesto za automobil odmah uz apartman, bez trazenja parkinga po kraju.",
    category: "Prakticne stvari",
  },
  {
    icon: WashingMachine,
    label: "Ves masina",
    description: "Prakticno resenje za duzi boravak i goste koji zele dodatnu slobodu.",
    category: "Prakticne stvari",
  },
  {
    icon: Shirt,
    label: "Pegla i daska",
    description: "Sve je spremno ako treba da se brzo osvezite pre izlaska ili puta.",
    category: "Prakticne stvari",
  },
  {
    icon: Fan,
    label: "Fen za kosu",
    description: "U kupatilu vas ceka sve sto je potrebno za svakodnevnu rutinu.",
    category: "Prakticne stvari",
  },
  {
    icon: Utensils,
    label: "Opremljena kuhinja",
    description: "Sve osnovno za pripremu dorucka, obroka ili kratke pauze uz nesto toplo.",
    category: "Prakticne stvari",
  },
  {
    icon: ShowerHead,
    label: "Moderno kupatilo",
    description: "Uredno, funkcionalno i prijatno sredjeno za lagodan pocetak i kraj dana.",
    category: "Prakticne stvari",
  },
  {
    icon: Sparkles,
    label: "Cisti peskiri i posteljina",
    description: "Sveze pripremljeno i uredno slozeno za svaki novi dolazak.",
    category: "Sitnice koje znace",
    featured: true,
  },
  {
    icon: Sparkles,
    label: "Higijenski setovi",
    description: "Male korisne stvari koje boravak cine jednostavnijim i prijatnijim.",
    category: "Sitnice koje znace",
  },
  {
    icon: Coffee,
    label: "Aparat za kafu",
    description: "Jutarnja kafa vas ceka bez zurbe, cim pozelite da zapocnete dan polako.",
    category: "Sitnice koje znace",
  },
  {
    icon: Coffee,
    label: "4 vrste kafe",
    description: "Izaberite ukus koji vam najvise prija i napravite mali ritual za sebe.",
    category: "Sitnice koje znace",
    featured: true,
  },
];
