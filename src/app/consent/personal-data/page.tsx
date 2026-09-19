import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { LEGAL_POLICY_VERSION, LEGAL_EFFECTIVE_DATE, operator } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description:
    "Согласие на обработку персональных данных пользователей сервиса TAP VPN.",
};

export default function PersonalDataConsentPage() {
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
              Согласие на обработку персональных данных
            </h1>
            <p className="text-sm text-ink-faint">
              Редакция {LEGAL_EFFECTIVE_DATE} · {LEGAL_POLICY_VERSION}
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink-dim">
            <p>
              Настоящим свободно, своей волей и в своём интересе, даю согласие
              организации:{" "}
              <span className="font-semibold text-ink">{operator.name}</span>
              {operator.inn
                ? `. Идентификационный номер / Identification Number: ${operator.inn}`
                : ""}
              {operator.address ? `. Юридический адрес: ${operator.address}` : ""}
              . (далее по тексту - Оператор), на автоматизированную и
              неавтоматизированную обработку своих персональных данных в
              соответствии со следующим перечнем:
            </p>

            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                Сведения о пользователе: идентификатор аккаунта (UID), адрес
                электронной почты и/или номер телефона;
              </li>
              <li>
                Сведения о подписке: тариф, статус, срок действия, ключ
                активации;
              </li>
              <li>
                Сведения о подключении и устройстве: платформа, модель
                устройства, идентификатор устройства в рамках аккаунта, время
                последней активности сессии; технические данные, необходимые для
                работы VPN и личного кабинета;
              </li>
              <li>
                Сведения об активности: тип устройства; операционная система;
                версия приложения (если передаётся клиентом); сведения о
                браузере при использовании Сайта.
              </li>
            </ul>

            <p>
              Персональные данные Заказчика используются Оператором для целей:
            </p>

            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>заключение и исполнение гражданско-правовых договоров;</li>
              <li>
                реагирование на запросы действующих или потенциальных клиентов;
              </li>
              <li>
                предоставление доступа к Сайту, приложению TAP VPN и личному
                кабинету;
              </li>
              <li>
                распространение рекламных и информационных материалов Оператора
                (только при отдельном согласии на рассылку, если оно запрошено);
              </li>
              <li>
                улучшение функционирования Сайта, приложения и личного кабинета;
              </li>
              <li>
                исполнение обязанностей, возложенных на Оператора в соответствии
                с применимым законодательством.
              </li>
            </ul>

            <p>
              В целях обеспечения реализации требований законодательства в
              области обработки персональных данных Оператор может осуществлять
              обработку персональных данных путем сбора, хранения,
              систематизации, накопления, изменения, уточнения, использования,
              распространения, обезличивания, блокирования, уничтожения
              персональных данных.
            </p>

            <p>
              Настоящее согласие вступает в силу с момента его подтверждения
              (отметка на форме входа или оплаты на Сайте) и действует до
              наступления любого из следующих условий: отзыв согласия на
              обработку персональных данных; истечение срока хранения
              персональных данных, установленного законом; достижение целей
              обработки.
            </p>

            <p>
              Отзыв согласия на обработку персональных данных осуществляется
              путем направления заявления в письменной форме на электронный
              адрес Оператора{" "}
              <a
                href={`mailto:${operator.email}`}
                className="font-semibold text-accent hover:underline"
              >
                {operator.email}
              </a>
              .
            </p>

            <p>
              Я подтверждаю, что мне известно о праве отозвать своё согласие
              посредством составления соответствующего письменного документа,
              который может быть направлен мной в адрес Оператора посредством
              электронной почты{" "}
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
              href="/privacy"
              className="font-semibold text-accent hover:underline"
            >
              Политику конфиденциальности
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
