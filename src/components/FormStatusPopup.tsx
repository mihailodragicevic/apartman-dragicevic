import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormStatusVariant = "success" | "error";

type FormStatusPopupProps = {
  variant: FormStatusVariant;
  title: string;
  message: string;
  details?: string[];
  /** Koliko dugo popup ostaje otvoren (ms); isti period vazi i za progress liniju. */
  duration?: number;
  onClose: () => void;
};

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    panel: "border-emerald-200 bg-emerald-50 ring-emerald-500/20",
    iconBox: "bg-emerald-500/15 text-emerald-700",
    title: "text-emerald-900",
    body: "text-emerald-900/80",
    bar: "bg-emerald-500/70",
  },
  error: {
    icon: AlertTriangle,
    panel: "border-red-200 bg-red-50 ring-red-500/20",
    iconBox: "bg-red-500/15 text-red-600",
    title: "text-red-900",
    body: "text-red-900/80",
    bar: "bg-red-500/70",
  },
} as const;

export default function FormStatusPopup({
  variant,
  title,
  message,
  details = [],
  duration = 8000,
  onClose,
}: FormStatusPopupProps) {
  const styles = VARIANTS[variant];
  const Icon = styles.icon;
  const isError = variant === "error";

  useEffect(() => {
    const timeout = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timeout);
  }, [duration, onClose]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-4 top-20 z-[60] sm:left-auto sm:right-6 sm:top-24 sm:w-[26rem]"
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
    >
      <div
        className={cn(
          "animate-popup-in pointer-events-auto relative overflow-hidden rounded-3xl border py-5 pl-6 pr-14 shadow-soft ring-1",
          styles.panel
        )}
      >
        <div className="flex items-start gap-4">
          <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl", styles.iconBox)} aria-hidden="true">
            <Icon className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className={cn("font-display text-lg leading-tight", styles.title)}>{title}</p>
            <p className={cn("mt-1.5 text-sm leading-relaxed", styles.body)}>{message}</p>
            {details.length > 0 && (
              <ul className={cn("mt-3 space-y-1.5 text-sm", styles.body)}>
                {details.map((detail) => (
                  <li key={detail} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Zatvori obaveštenje"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-foreground/35 transition-colors hover:bg-foreground/5 hover:text-foreground/70"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <span
          aria-hidden="true"
          className={cn("popup-progress-bar absolute inset-x-0 bottom-0 h-1 origin-left", styles.bar)}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>,
    document.body
  );
}
