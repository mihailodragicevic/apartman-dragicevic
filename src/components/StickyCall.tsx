import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export default function StickyCall() {
  return (
    <a
      href={SITE.phoneHref}
      className="md:hidden fixed bottom-4 inset-x-4 z-40 flex items-center justify-center gap-2 bg-gradient-accent text-accent-foreground py-4 rounded-full font-semibold shadow-glow"
    >
      <Phone className="h-5 w-5" /> Pozovite odmah · {SITE.phone}
    </a>
  );
}
