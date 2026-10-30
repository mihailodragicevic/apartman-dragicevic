import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import logo from "@/assets/Logo_WEB 3.svg";
import { SITE } from "@/lib/site";

export default function Footer() {
  const isEnglish = useLocation().pathname.startsWith("/en");
  const pages = isEnglish
    ? [
        ["/en/", "Home"],
        ["/en/about/", "About"],
        ["/en/amenities/", "Amenities"],
        ["/en/gallery/", "Gallery"],
        ["/en/contact/", "Contact"],
      ]
    : [
        ["/", "Početna"],
        ["/o-nama", "O nama"],
        ["/sadrzaj", "Sadržaj"],
        ["/galerija", "Galerija"],
        ["/kontakt", "Rezervacija"],
      ];
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <img
            src={logo}
            alt="Apartman Dragićević"
            className="h-14 w-auto"
            width={202}
            height={140}
          />
          <p className="mt-3 max-w-sm text-muted-foreground">
            {isEnglish
              ? "A short-stay apartment in Bogatić, just 100 m from the town center. Comfort, peace and a warm welcome."
              : "Stan na dan u Bogatiću, na samo 100m od centra. Udobnost, mir i domaćinski pristup."}
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <a href={SITE.phoneHref} className="flex items-center gap-3 transition-colors hover:text-accent">
            <Phone className="h-4 w-4" /> {SITE.phone}
          </a>
          <a href={SITE.emailHref} className="flex items-center gap-3 transition-colors hover:text-accent">
            <Mail className="h-4 w-4" /> {SITE.email}
          </a>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-accent">
            <MapPin className="h-4 w-4" /> {SITE.address}
          </a>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="mb-3 font-medium text-foreground">{isEnglish ? "Pages" : "Stranice"}</div>
          <ul className="space-y-2">
            {pages.map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-accent">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="mb-3 font-medium text-foreground">Instagram</div>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 transition-colors hover:text-accent"
          >
            <Instagram className="h-4 w-4" /> @apartman_dragicevic
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 Apartman Dragićević · Bogatić</div>
          <div>
            {isEnglish ? "Made by" : "Izradio"}{" "}
            <a
              href="https://mihailodev.com/sr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              Mihailo Dragićević
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
