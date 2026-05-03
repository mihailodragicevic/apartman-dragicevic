import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/Logo_WEB 3.svg";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Link to="/" aria-label={SITE.name} className="inline-flex">
            <img src={logo} alt={SITE.name} className="h-14 w-auto transition-transform duration-300 group-hover:scale-[1.02] md:h-16" width={620} height={501} />
          </Link>
          <p className="mt-3 text-muted-foreground max-w-sm">
            Stan na dan u Bogatiću, na samo 100m od centra. Udobnost, mir i domaćinski pristup.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <a href={SITE.phoneHref} className="flex items-center gap-3 hover:text-accent transition-colors">
            <Phone className="h-4 w-4" /> {SITE.phone}
          </a>
          <a href={SITE.emailHref} className="flex items-center gap-3 hover:text-accent transition-colors">
            <Mail className="h-4 w-4" /> {SITE.email}
          </a>
          <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors">
            <MapPin className="h-4 w-4" /> {SITE.address}
          </a>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="font-medium text-foreground mb-3">Stranice</div>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-accent">Početna</Link></li>
            <li><Link to="/o-nama" className="hover:text-accent">O nama</Link></li>
            <li><Link to="/sadrzaj" className="hover:text-accent">Sadržaj</Link></li>
            <li><Link to="/galerija" className="hover:text-accent">Galerija</Link></li>
            <li><Link to="/kontakt" className="hover:text-accent">Kontakt</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Apartman Dragićević - Sva prava zadržana.
      </div>
      <div className="py-2 text-center text-xs text-muted-foreground">
        Developed by Mihailo Dragićević
      </div>
    </footer>
  );
}

