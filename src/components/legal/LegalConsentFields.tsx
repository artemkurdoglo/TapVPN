"use client";

import Link from "next/link";

export function LegalConsentFields({
  privacyAccepted,
  termsAccepted,
  offerAccepted,
  marketingAccepted,
  onPrivacyChange,
  onTermsChange,
  onOfferChange,
  onMarketingChange,
  requireOffer,
  showMarketing,
  disabled,
  idPrefix,
}: {
  privacyAccepted: boolean;
  termsAccepted: boolean;
  offerAccepted?: boolean;
  marketingAccepted?: boolean;
  onPrivacyChange: (value: boolean) => void;
  onTermsChange: (value: boolean) => void;
  onOfferChange?: (value: boolean) => void;
  onMarketingChange?: (value: boolean) => void;
  /** Оферта обязательна на оплате */
  requireOffer?: boolean;
  /** Опциональное согласие на рассылку */
  showMarketing?: boolean;
  disabled?: boolean;
  idPrefix: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface/40 px-4 py-3.5">
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-ink-dim">
        <input
          id={`${idPrefix}-privacy`}
          type="checkbox"
          checked={privacyAccepted}
          disabled={disabled}
          onChange={(e) => onPrivacyChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-teal-400"
          required
        />
        <span>
          Я согласен(на) на{" "}
          <Link
            href="/consent/personal-data"
            target="_blank"
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            обработку персональных данных
          </Link>{" "}
          и принимаю{" "}
          <Link
            href="/privacy"
            target="_blank"
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            Политику конфиденциальности
          </Link>
        </span>
      </label>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-ink-dim">
        <input
          id={`${idPrefix}-terms`}
          type="checkbox"
          checked={termsAccepted}
          disabled={disabled}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-teal-400"
          required
        />
        <span>
          Я принимаю{" "}
          <Link
            href="/terms"
            target="_blank"
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            Пользовательское соглашение
          </Link>
        </span>
      </label>

      {requireOffer ? (
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-ink-dim">
          <input
            id={`${idPrefix}-offer`}
            type="checkbox"
            checked={Boolean(offerAccepted)}
            disabled={disabled}
            onChange={(e) => onOfferChange?.(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-teal-400"
            required
          />
          <span>
            Я принимаю условия{" "}
            <Link
              href="/offer"
              target="_blank"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Публичной оферты
            </Link>
          </span>
        </label>
      ) : null}

      {showMarketing ? (
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-ink-dim">
          <input
            id={`${idPrefix}-marketing`}
            type="checkbox"
            checked={Boolean(marketingAccepted)}
            disabled={disabled}
            onChange={(e) => onMarketingChange?.(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-teal-400"
          />
          <span>
            Я согласен(на) получать{" "}
            <Link
              href="/consent/marketing"
              target="_blank"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              рекламную и информационную рассылку
            </Link>{" "}
            (необязательно)
          </span>
        </label>
      ) : null}
    </div>
  );
}
