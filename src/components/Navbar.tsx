import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/Logo_WEB 3.svg";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function LanguageSwitcher({
  currentHref,
  otherLanguageHref,
  isEnglish,
}: {
  currentHref: string;
  otherLanguageHref: string;
  isEnglish: boolean;
}) {
  const prefetchPage = (href: string) => {
    const url = new URL(href, window.location.href);
    url.hash = "";
    const alreadyPrefetched = [...document.head.querySelectorAll<HTMLLinkElement>('link[rel="prefetch"]')]
      .some((link) => link.href === url.href);
    if (alreadyPrefetched) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url.href;
    document.head.appendChild(link);
  };

  const optionClassName = (isCurrent: boolean) =>
    cn(
      "relative z-10 inline-flex h-full w-12 md:w-14 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.06em] transition-[color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      isCurrent
        ? "text-primary-foreground"
        : "text-foreground/80 hover:text-foreground",
    );

  return (
    <nav
      aria-label={isEnglish ? "Language" : "Jezik"}
      className="language-switcher relative inline-flex h-12 w-24 md:w-28 shrink-0 items-center overflow-hidden rounded-full border border-white/70 bg-[hsl(40_33%_98%/0.9)] shadow-card backdrop-blur-md transition-colors hover:border-accent/50 hover:bg-[hsl(40_33%_98%/0.96)]"
    >
      <span
        aria-hidden="true"
        className={cn(
          "language-switcher-thumb absolute left-1 top-1 bottom-1 z-0 w-11 md:w-[52px] rounded-full bg-primary shadow-sm transition-transform duration-300 ease-out",
          isEnglish && "translate-x-11 md:translate-x-[52px]",
        )}
      />
      <a
        href={isEnglish ? otherLanguageHref : currentHref}
        lang="sr"
        hrefLang="sr"
        aria-label={isEnglish ? "Prebaci na srpski" : "Srpski, trenutni jezik"}
        aria-current={isEnglish ? undefined : "page"}
        className={optionClassName(!isEnglish)}
        onPointerEnter={() => isEnglish && prefetchPage(otherLanguageHref)}
        onFocus={() => isEnglish && prefetchPage(otherLanguageHref)}
        onTouchStart={() => isEnglish && prefetchPage(otherLanguageHref)}
      >
        SR
      </a>
      <a
        href={isEnglish ? currentHref : otherLanguageHref}
        lang="en"
        hrefLang="en"
        aria-label={isEnglish ? "English, current language" : "Switch to English"}
        aria-current={isEnglish ? "page" : undefined}
        className={optionClassName(isEnglish)}
        onPointerEnter={() => !isEnglish && prefetchPage(otherLanguageHref)}
        onFocus={() => !isEnglish && prefetchPage(otherLanguageHref)}
        onTouchStart={() => !isEnglish && prefetchPage(otherLanguageHref)}
      >
        EN
      </a>
    </nav>
  );
}

export default function Navbar() {
  const { pathname, search, hash } = useLocation();
  const isEnglish = pathname.startsWith("/en");
  const routeName = pathname.replace(/^\/en\/?/, "").replace(/\/$/, "");
  const languagePath = isEnglish
    ? ({ about: "/o-nama", amenities: "/sadrzaj", gallery: "/galerija", contact: "/kontakt" }[routeName] ?? "/")
    : ({ "o-nama": "/en/about/", sadrzaj: "/en/amenities/", galerija: "/en/gallery/", kontakt: "/en/contact/" }[routeName] ?? "/en/");
  const currentHref = `${pathname}${search}${hash}`;
  const otherLanguageHref = `${languagePath}${search}${hash}`;
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
          <div className={cn(open && "max-md:hidden")}>
            <LanguageSwitcher
              currentHref={currentHref}
              otherLanguageHref={otherLanguageHref}
              isEnglish={isEnglish}
            />
          </div>
          <a
            href={SITE.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" /> {isEnglish ? "Call now" : "Pozovite odmah"}
          </a>
          <button
            className="md:hidden h-11 w-11 rounded-full grid place-items-center bg-secondary"
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
              <LanguageSwitcher
                currentHref={currentHref}
                otherLanguageHref={otherLanguageHref}
                isEnglish={isEnglish}
              />
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
