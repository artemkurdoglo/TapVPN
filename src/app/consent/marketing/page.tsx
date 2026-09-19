import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { operator, sitePublicUrl, LEGAL_EFFECTIVE_DATE_LONG } from "@/lib/legal";
import { SupportContactLinks } from "@/components/legal/SupportContactLinks";

export const metadata: Metadata = {
  title: "Согласие на получение рекламной и информационной рассылки",
  description:
    "Согласие на получение рекламной и информационной рассылки сервиса TAP VPN.",
};

export default function MarketingConsentPage() {
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
              Согласие на получение рекламной и информационной рассылки
            </h1>
            <p className="text-sm text-ink-faint">
              Редакция от {LEGAL_EFFECTIVE_DATE_LONG} года
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink-dim">
            <p>
              Я, предоставляя свои данные на Сайте{" "}
              <span className="font-semibold text-ink">{sitePublicUrl}</span>{" "}
              и/или в приложении TAP VPN и/или в личном кабинете и/или в ходе
              переписки, даю своё согласие на получение рассылки, в том числе
              рекламной, содержащей информацию, в том числе, но не
              ограничиваясь, о товарах и услугах, наличии специальных
              предложений, акций в отношении них, условиях, связанных с
              приобретением и использованием указанных товаров и услуг, о
              проведении мероприятий, презентаций, предложениях партнёров, а
              также рассылок, подготовленных в качестве личных рекомендаций для
              меня с учётом анализа покупательского поведения посредством
              e-mail-рассылки (направление сообщений на электронную почту),
              SMS-рассылки (служба коротких сообщений, в том числе в
              мессенджеры), почтовой рассылки, любых иных средств связи,
              посредством сети Интернет от:
            </p>

            <div className="rounded-xl border border-border bg-surface/60 px-4 py-3">
              <p className="font-semibold text-ink">{operator.name}</p>
              {operator.inn ? (
                <p>Идентификационный номер: {operator.inn}</p>
              ) : null}
              {operator.address ? <p>Юридический адрес: {operator.address}</p> : null}
              <p>{operator.email}</p>
            </div>

            <p>
              Даю согласие на направление мне рассылок рекламно-информационного
              характера путём: SMS-сообщений на номер телефона (указанный при
              заполнении формы на Сайте и/или в ходе переписки), а также в
              мессенджеры, прикреплённые к номеру телефона; сообщений через
              социальные сети; сообщений на электронную почту (указанную при
              заполнении формы на Сайте и/или в ходе переписки).
            </p>

            <p>
              Давая такое согласие, я подтверждаю, что действую по своей воле и
              в своём интересе, а также обязуюсь предоставить достоверные
              данные.
            </p>

            <p>
              Я подтверждаю, что владею информацией о том, что в любой момент в
              течение всего срока действия настоящего согласия я вправе отозвать
              согласие и отписаться от получения рассылок путём направления
              запроса на эл. почту <SupportContactLinks email={operator.email} />
              .
            </p>

            <p>
              Также я информирован(а), что при возникновении вопросов
              относительно отказа, в том числе от SMS-рассылок, я могу
              обратиться за помощью, отправив письмо на адрес электронной почты:{" "}
              <SupportContactLinks email={operator.supportEmail} />.
            </p>

            <p>
              Служебные сообщения, необходимые для оказания услуги (ключ
              активации, уведомления о подписке, безопасность аккаунта), могут
              направляться независимо от согласия на рекламную рассылку.
            </p>
          </div>

          <p className="text-sm text-ink-dim">
            См. также{" "}
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
