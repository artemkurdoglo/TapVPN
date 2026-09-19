import { PowerIcon } from "@/components/ui/icons";

export function ConnectionOrb({ size = 280 }: { size?: number }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />

      <span className="absolute inset-[6%] rounded-full border border-accent/15 animate-ring" />
      <span
        className="absolute inset-[6%] rounded-full border border-accent/15 animate-ring"
        style={{ animationDelay: "1.4s" }}
      />

      <span className="absolute inset-[14%] rounded-full border border-border" />
      <span className="absolute inset-[26%] rounded-full border border-border-strong bg-surface/60 backdrop-blur-sm" />

      <span className="relative flex h-[46%] w-[46%] items-center justify-center rounded-full bg-gradient-to-b from-surface-2 to-surface border border-accent-border shadow-glow-md animate-pulse-soft">
        <PowerIcon className="h-[38%] w-[38%] text-accent" strokeWidth={1.8} />
      </span>
    </div>
  );
}
