"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { readCookieConsent, saveCookieConsent } from "@/lib/legal";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!readCookieConsent());
  }, []);

  function accept(analytics: boolean) {
    saveCookieConsent(analytics);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border-strong bg-surface-2 p-5 shadow-card sm:flex-row sm:items-end sm:gap-6 sm:p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-sm font-semibold text-ink">Мы используем cookies</p>
          <p className="text-xs leading-relaxed text-ink-dim sm:text-sm">
            Необходимые cookies нужны для входа и работы личного кабинета.
            Аналитические - только с вашего согласия. Подробнее в{" "}
            <Link
              href="/consent/cookies"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Согласии на обработку cookies
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => accept(false)}
          >
            Только необходимые
          </Button>
          <Button type="button" size="sm" onClick={() => accept(true)}>
            Принять все
          </Button>
        </div>
      </div>
    </div>
  );
}
