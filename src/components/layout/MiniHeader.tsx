"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useAuth } from "@/components/auth/AuthProvider";

export function MiniHeader({
  backHref = "/",
  backLabel = "На главную",
  showSignOut = false,
}: {
  backHref?: string;
  backLabel?: string;
  showSignOut?: boolean;
}) {
  const router = useRouter();
  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.replace("/");
  }

  return (
    <header className="w-full border-b border-border bg-bg">
      <div className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between px-5 sm:h-16 sm:px-8">
        <Logo />
        {showSignOut ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Выйти
          </button>
        ) : (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            {backLabel}
          </Link>
        )}
      </div>
    </header>
  );
}
