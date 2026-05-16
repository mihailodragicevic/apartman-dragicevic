import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
};

export default function TypingText({
  text,
  className,
  typingSpeed = 95,
  deletingSpeed = 55,
  pauseMs = 1000,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayed(text);
      return;
    }

    const reachedEnd = !isDeleting && displayed === text;
    const reachedStart = isDeleting && displayed.length === 0;

    const delay = reachedEnd
      ? pauseMs
      : reachedStart
        ? 220
        : isDeleting
          ? deletingSpeed
          : typingSpeed;

    const timeout = window.setTimeout(() => {
      if (reachedEnd) {
        setIsDeleting(true);
        return;
      }

      if (reachedStart) {
        setIsDeleting(false);
        return;
      }

      setDisplayed((current) =>
        isDeleting
          ? text.slice(0, Math.max(current.length - 1, 0))
          : text.slice(0, current.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deletingSpeed, displayed, isDeleting, pauseMs, text, typingSpeed]);

  return (
    <span className={`typing-text ${className ?? ""}`.trim()}>
      <span className="typing-text-ghost" aria-hidden>
        {text}
      </span>
      <span className="typing-text-live" aria-label={text}>
        {displayed}
        <span className="typing-text-cursor" aria-hidden />
      </span>
    </span>
  );
}
