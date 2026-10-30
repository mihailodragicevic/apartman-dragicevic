export type GuestTestimonial = {
  author: string;
  country?: string;
  rating: number;
  paragraphs: string[];
};

export const guestTestimonials: GuestTestimonial[] = [
  {
    author: "Jovana",
    country: "Srbija",
    rating: 10,
    paragraphs: [
      "Sve je bilo baš kako treba: čisto, funkcionalno i veoma ljubazno. Osećaj je bio kao da smo došli kod rodbine, a lokacija je odlična i mirna.",
    ],
  },
  {
    author: "Dušica",
    country: "Srbija",
    rating: 10,
    paragraphs: [
      "Apartman je bio prostran, uredan i pun sitnica koje olakšavaju boravak. Domaćica Mira je predivna, predusretljiva i uvek spremna da pomogne.",
    ],
  },
  {
    author: "Snežana",
    country: "Srbija",
    rating: 10,
    paragraphs: [
      "Mirno, čisto i lepo opremljeno. Na lokaciji je sve bilo na par koraka, a ipak smo imali tišinu i povratak u spokoj. Toplo preporučujem.",
    ],
  },
  {
    author: "Filipović",
    country: "Srbija",
    rating: 10,
    paragraphs: [
      "Apartman je bio potpuno opremljen i vrlo čist. Domaćini su bili divni, komunikacija je bila odlična, a boravak je bio prijatan i bez stresa.",
    ],
  },
  {
    author: "Sale",
    country: "Nemačka",
    rating: 10,
    paragraphs: [
      "Topao prijem, odlična komunikacija i veoma uredan apartman. Sve što nam je bilo potrebno bilo je dostupno, a osećaj je bio veoma ugodan i opuštajući.",
    ],
  },
  {
    author: "Predrag",
    country: "Holandija",
    rating: 10,
    paragraphs: [
      "Usluga je bila izuzetno dobra i sve je bilo u savršenom redu. Čistoća, mir i pažnja u detaljima ostavili su veoma pozitivan utisak.",
    ],
  },
  {
    author: "Saša",
    country: "Austrija",
    rating: 10,
    paragraphs: [
      "Centralna lokacija, ljubazni stanodavci i vrlo prijatan boravak. Sve je bilo povezano s malo više pažnje i topline, što se odmah oseća.",
    ],
  },
  {
    author: "Miroslav Štrniša",
    rating: 5,
    paragraphs: ["Sve pohvale! Imate sve što je potrebno za odmor."],
  },
  {
    author: "Ratko Papić",
    rating: 5,
    paragraphs: [
      "Usluga, gostoprimstvo, higijena, čista desetka! Odlično opremljeno, vodilo se računa o svakom detalju.\nTopla preporuka.",
    ],
  },
  {
    author: "Denis Ponjević",
    rating: 5,
    paragraphs: [
      "Apartman za poželjeti 🥰👌 Sve tip top nemam zamjerke od gostoprimstva do sadrzaja apartmana, vidimo se uskoro 🍀👍",
    ],
  },
];
