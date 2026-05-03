import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Početna" },
  { to: "/o-nama", label: "O nama" },
  { to: "/sadrzaj", label: "Sadržaj" },
  { to: "/galerija", label: "Galerija" },
  { to: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-border/60 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-9 w-9 rounded-full bg-gradient-accent grid place-items-center text-accent-foreground font-display text-lg shadow-card">
            D
          </span>
          <span className="font-display text-lg leading-tight">
            Apartman <span className="italic">Dragićević</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" /> Pozovite odmah
          </a>
          <button
            className="md:hidden h-10 w-10 rounded-full grid place-items-center bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Meni"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/60 mt-3 animate-fade-in-up">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 rounded-xl text-base font-medium",
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={SITE.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-gradient-accent text-accent-foreground px-5 py-3 rounded-full font-semibold"
            >
              <Phone className="h-4 w-4" /> Pozovite odmah
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
