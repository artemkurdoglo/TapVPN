"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/components/auth/AuthProvider";

export function LoginPageClient() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface/60 p-7 sm:p-8">
      <div className="mb-7 flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">
          С возвращением
        </h1>
        <p className="text-sm text-ink-dim">
          Войдите по email или телефону, который привязан к вашему ключу
          активации.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
        </div>
      ) : (
        <LoginForm />
      )}

      <p className="mt-6 text-center text-sm text-ink-dim">
        Ещё нет подписки?{" "}
        <Link href="/#pricing" className="font-semibold text-accent hover:underline">
          Купить VPN
        </Link>
      </p>
    </div>
  );
}
