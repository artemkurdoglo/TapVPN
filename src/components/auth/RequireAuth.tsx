"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading, configured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!configured || !user) {
      router.replace("/login");
    }
  }, [user, loading, configured, router]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center px-5 py-20">
        <div className="flex flex-col items-center gap-3 text-ink-dim">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
          <span className="text-sm">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (!configured || !user) {
    return null;
  }

  return <>{children}</>;
}
