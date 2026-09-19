"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { useScrolled } from "@/lib/hooks";
import { useAuth } from "@/components/auth/AuthProvider";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/#features", label: "Преимущества" },
  { href: "/#pricing", label: "Тарифы" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const accountHref = user ? "/dashboard" : "/login";
  const accountLabel = user ? "Кабинет" : "Войти";

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent bg-bg md:bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between px-5 sm:h-16 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-dim transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!loading ? (
            <Link
              href={accountHref}
              className="text-sm font-medium text-ink-dim transition-colors hover:text-ink"
            >
              {accountLabel}
            </Link>
          ) : null}
          <Button href="/#pricing" size="sm">
            Купить VPN
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-2 md:hidden"
        >
          {menuOpen ? (
            <CloseIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`overflow-hidden bg-bg/95 px-5 backdrop-blur-md ${
            menuOpen ? "border-t border-border py-5" : "border-t-0 py-0"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-ink-dim transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
            <Button
              href={accountHref}
              variant="secondary"
              fullWidth
              onClick={() => setMenuOpen(false)}
            >
              {accountLabel}
            </Button>
            <Button href="/#pricing" fullWidth onClick={() => setMenuOpen(false)}>
              Купить VPN
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
