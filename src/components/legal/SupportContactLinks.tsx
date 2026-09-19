import { operator, operatorTelegramUrl } from "@/lib/legal";

/** Ссылка на email и (если задан) Telegram поддержки. */
export function SupportContactLinks({
  email = operator.email,
  className = "font-semibold text-accent hover:underline",
}: {
  email?: string;
  className?: string;
}) {
  const telegramUrl = operatorTelegramUrl();

  return (
    <>
      <a href={`mailto:${email}`} className={className}>
        {email}
      </a>
      {telegramUrl && operator.telegram ? (
        <>
          {" "}
          или в Telegram{" "}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className={className}
          >
            @{operator.telegram}
          </a>
        </>
      ) : null}
    </>
  );
}
