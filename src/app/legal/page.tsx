import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { operator } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Юридическая информация",
  description: "Юридические документы сервиса TAP VPN.",
};

const documents = [
  { href: "/terms", label: "Пользовательское соглашение" },
  { href: "/privacy", label: "Политика конфиденциальности" },
  {
    href: "/privacy/processing",
    label:
      "Политика конфиденциальности (об обработке и защите персональных данных)",
  },
  {
    href: "/consent/personal-data",
    label: "Согласие на обработку персональных данных",
  },
  {
    href: "/consent/cookies",
    label: "Согласие на обработку файлов cookies",
  },
  {
    href: "/consent/marketing",
    label: "Согласие на получение рекламной и информационной рассылки",
  },
  { href: "/offer", label: "Публичная оферта" },
];

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16 sm:py-20">
        <Container className="flex max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Документы
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Юридическая информация
            </h1>
            <p className="text-sm text-ink-faint">
              Документы, регулирующие использование сервиса TAP VPN
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-surface/60 p-5 text-sm text-ink-dim">
            <p className="font-semibold text-ink">{operator.name}</p>
            {operator.inn ? (
              <p>Идентификационный номер: {operator.inn}</p>
            ) : null}
            {operator.address ? <p>Адрес: {operator.address}</p> : null}
            <p>
              Поддержка:{" "}
              <a
                href={`mailto:${operator.supportEmail}`}
                className="text-accent hover:underline"
              >
                {operator.supportEmail}
              </a>
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {documents.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="rounded-xl border border-border bg-surface/40 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent-border hover:text-accent"
              >
                {doc.label}
              </Link>
            ))}
          </nav>
        </Container>
      </main>
      <Footer />
    </>
  );
}
