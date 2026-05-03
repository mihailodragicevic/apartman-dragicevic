import { ReactNode } from "react";

export default function SectionHeading({
  eyebrow, title, subtitle, center = false,
}: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} reveal`}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">{eyebrow}</div>
      )}
      <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-lg text-balance">{subtitle}</p>}
    </div>
  );
}
