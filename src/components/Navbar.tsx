import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/Logo_WEB 3.svg";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function LanguageSwitcher({
  href,
  isEnglish,
  onClick,
}: {
  href: string;
  isEnglish: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      lang={isEnglish ? "sr" : "en"}
      aria-label={isEnglish ? "Switch language to Serbian" : "Switch language to English"}
      onClick={onClick}
      className="relative inline-flex h-10 w-[76px] shrink-0 items-center rounded-full bg-secondary p-1 transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className={cn(
        "absolute left-1 z-10 grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm transition-transform duration-300 ease-out",
        isEnglish && "translate-x-9",
      )}>
        {isEnglish ? "EN" : "SR"}
      </span>
      <span className={cn("absolute left-2 text-xs font-semibold text-muted-foreground", isEnglish && "opacity-40")}>SR</span>
      <span className={cn("absolute right-2 text-xs font-semibold text-muted-foreground", !isEnglish && "opacity-40")}>EN</span>
    </a>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const isEnglish = pathname.startsWith("/en");
  const routeName = pathname.replace(/^\/en\/?/, "").replace(/\/$/, "");
  const languagePath = isEnglish
    ? ({ about: "/o-nama", amenities: "/sadrzaj", gallery: "/galerija", contact: "/kontakt" }[routeName] ?? "/")
    : ({ "o-nama": "/en/about/", sadrzaj: "/en/amenities/", galerija: "/en/gallery/", kontakt: "/en/contact/" }[routeName] ?? "/en/");
  const links = isEnglish
    ? [
        { to: "/en/", label: "Home" },
        { to: "/en/about/", label: "About" },
        { to: "/en/amenities/", label: "Amenities" },
        { to: "/en/gallery/", label: "Gallery" },
        { to: "/en/contact/", label: "Contact" },
      ]
    : [
        { to: "/", label: "Početna" },
        { to: "/o-nama", label: "O nama" },
        { to: "/sadrzaj", label: "Sadržaj" },
        { to: "/galerija", label: "Galerija" },
        { to: "/kontakt", label: "Rezervacija" },
      ];
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
        <Link to={isEnglish ? "/en/" : "/"} className="flex items-center">
          <img
            src={logo}
            alt="Apartman Dragićević"
            className="h-10 w-auto sm:h-12"
            width={173}
            height={120}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/" || l.to === "/en/"}
              className={({ isActive }) =>
                cn(
                  "nav-underline-link px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "nav-underline-link-active text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher href={languagePath} isEnglish={isEnglish} />
          <a
            href={SITE.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" /> {isEnglish ? "Call now" : "Pozovite odmah"}
          </a>
          <button
            className="md:hidden h-10 w-10 rounded-full grid place-items-center bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label={isEnglish ? "Menu" : "Meni"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="md:hidden glass border-t border-border/60 mt-3 animate-fade-in-up">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/" || l.to === "/en/"}
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
            <div className="px-4 py-2">
              <LanguageSwitcher href={languagePath} isEnglish={isEnglish} onClick={() => setOpen(false)} />
            </div>
            <a
              href={SITE.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-gradient-accent text-accent-foreground px-5 py-3 rounded-full font-semibold"
            >
              <Phone className="h-4 w-4" /> {isEnglish ? "Call now" : "Pozovite odmah"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
