import { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} reveal`}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">{eyebrow}</div>
      )}
      <Tag className="font-display text-4xl md:text-5xl leading-tight text-balance">{title}</Tag>
      {subtitle && <p className="mt-4 text-muted-foreground text-lg text-balance">{subtitle}</p>}
    </div>
  );
}
