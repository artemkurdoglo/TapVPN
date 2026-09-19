import Link from "next/link";
import { PowerIcon } from "@/components/ui/icons";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-ink ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 shadow-glow-xs">
        <PowerIcon className="h-4 w-4 text-accent-ink" strokeWidth={2.2} />
      </span>
      <span>
        TAP{" "}
        <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
          VPN
        </span>
      </span>
    </Link>
  );
}
