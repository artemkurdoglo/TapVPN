import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import {
  LEGAL_POLICY_VERSION,
  LEGAL_EFFECTIVE_DATE,
  operator,
  sitePublicUrl,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Согласие на обработку файлов cookies",
  description: "Согласие на обработку файлов cookies сервиса TAP VPN.",
};

export default function CookiesConsentPage() {
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
              Согласие на обработку файлов cookies
            </h1>
            <p className="text-sm text-ink-faint">
              Редакция {LEGAL_EFFECTIVE_DATE} · {LEGAL_POLICY_VERSION}
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink-dim">
            <p>
              Продолжая использовать сайт{" "}
              <span className="font-semibold text-ink">{sitePublicUrl}</span> и
              подтверждая выбор в баннере cookies, вы даёте организации:{" "}
              <span className="font-semibold text-ink">{operator.name}</span>
              {operator.inn
                ? `, Идентификационный номер / Identification Number: ${operator.inn}`
                : ""}
              {operator.address ? `, юридический адрес: ${operator.address}` : ""}
              , согласие на обработку файлов cookies и связанных пользовательских
              данных в объёме, необходимом для работы Сайта и (при вашем
              согласии) аналитики / улучшения сервиса.
            </p>

            <p>Мы можем использовать:</p>
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                необходимые cookies и локальное хранилище браузера - для входа в
                аккаунт, сохранения сессии и фиксации ваших согласий;
              </li>
              <li>
                аналитические cookies - только после согласия через баннер на
                Сайте, для понимания того, как используется Сайт, и улучшения его
                работы.
              </li>
            </ul>

            <p>
              Продолжая пользоваться Сайтом и/или принимая cookies через баннер,
              вы подтверждаете, что были проинформированы об использовании файлов
              cookies на Сайте {sitePublicUrl} и согласны с{" "}
              <Link
                href="/privacy"
                className="font-semibold text-accent hover:underline"
              >
                Политикой конфиденциальности
              </Link>{" "}
              и{" "}
              <Link
                href="/consent/personal-data"
                className="font-semibold text-accent hover:underline"
              >
                Согласием на обработку персональных данных
              </Link>
              .
            </p>

            <p>
              Согласие на получение{" "}
              <Link
                href="/consent/marketing"
                className="font-semibold text-accent hover:underline"
              >
                рекламной и информационной рассылки
              </Link>{" "}
              запрашивается отдельно и не считается данным только из факта
              использования cookies.
            </p>

            <p>
              Если вы не хотите, чтобы ваши вышеперечисленные данные
              обрабатывались сверх необходимого минимума, отключите обработку
              необязательных cookies через баннер («Только необходимые»),
              отключите cookies в настройках браузера или покиньте Сайт.
              Необходимые cookies могут оставаться активными для корректной
              работы входа и личного кабинета.
            </p>

            <p>
              По вопросам обработки данных:{" "}
              <a
                href={`mailto:${operator.email}`}
                className="font-semibold text-accent hover:underline"
              >
                {operator.email}
              </a>
              .
            </p>
          </div>

          <p className="text-sm text-ink-dim">
            См. также{" "}
            <Link
              href="/privacy#cookies"
              className="font-semibold text-accent hover:underline"
            >
              раздел Cookies в Политике конфиденциальности
            </Link>{" "}
            и{" "}
            <Link
              href="/legal"
              className="font-semibold text-accent hover:underline"
            >
              Юридическую информацию
            </Link>
            .
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
