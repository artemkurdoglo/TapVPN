import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-xl text-base text-ink-dim sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
