import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export default function StickyCall() {
  return (
    <a
      href={SITE.phoneHref}
      aria-label={`Pozovite odmah ${SITE.phone}`}
      className="md:hidden fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex items-center justify-center gap-2 rounded-full bg-gradient-accent py-4 font-semibold text-accent-foreground shadow-glow"
    >
      <Phone className="h-5 w-5" /> Pozovite odmah · {SITE.phone}
    </a>
  );
}
