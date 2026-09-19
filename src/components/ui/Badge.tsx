import type { ReactNode } from "react";

type Tone = "accent" | "success" | "neutral" | "danger";

const tones: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent border-accent-border",
  success: "bg-success-soft text-success border-success/30",
  neutral: "bg-surface-2 text-ink-dim border-border",
  danger: "bg-danger-soft text-danger border-danger/30",
};

export function Badge({
  children,
  tone = "accent",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
