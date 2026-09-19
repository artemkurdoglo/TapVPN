import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { legalNav, operator } from "@/lib/legal";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/#pricing", label: "Тарифы" },
  { href: "/#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft">
      <Container className="flex flex-col gap-10 py-14">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-ink-dim">
              Быстрый, безопасный и анонимный VPN для комфортной работы в
              интернете.
            </p>
            <div className="flex flex-col gap-1 text-xs leading-relaxed text-ink-faint">
              <span className="font-semibold text-ink-dim">{operator.name}</span>
              {operator.inn ? (
                <span>Идентификационный номер: {operator.inn}</span>
              ) : null}
              {operator.address ? <span>{operator.address}</span> : null}
              <span>
                Поддержка:{" "}
                <a
                  href={`mailto:${operator.supportEmail}`}
                  className="text-accent hover:underline"
                >
                  {operator.supportEmail}
                </a>
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-3 sm:items-end">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Навигация
            </span>
            <div className="flex flex-col gap-2 sm:items-end">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ink-dim transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-col-reverse items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} TAP VPN. Все права защищены.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-ink-faint transition-colors hover:text-ink-dim"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
