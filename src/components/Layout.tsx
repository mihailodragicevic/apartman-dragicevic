import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import StickyCall from "./StickyCall";
import { useReveal } from "@/hooks/useReveal";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "auto" });
    }

    root.style.scrollBehavior = previousScrollBehavior;
  }, [pathname, hash]);
  useReveal();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />
      <StickyCall />
    </div>
  );
}
