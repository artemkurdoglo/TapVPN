/** Юридические константы и согласия TAP VPN. */

/**
 * Единая дата редакции и вступления в силу документов TAP VPN на сайте.
 * 19.09.2026 - день публикации актуального юридического пакета.
 */
export const LEGAL_POLICY_VERSION = "2026-09-19";
export const LEGAL_EFFECTIVE_DATE = "19.09.2026";
export const LEGAL_EFFECTIVE_DATE_LONG = "19 сентября 2026";
export const OFFER_EFFECTIVE_DATE = LEGAL_EFFECTIVE_DATE;

export const LEGAL_CONSENT_KEY = "tapvpn_legal_consent";
export const COOKIE_CONSENT_KEY = "tapvpn_cookie_consent";

export type LegalConsentRecord = {
  privacy: boolean;
  terms: boolean;
  offer?: boolean;
  marketing?: boolean;
  version: string;
  acceptedAt: string;
  source: "login" | "checkout";
};

export type CookieConsentRecord = {
  necessary: true;
  analytics: boolean;
  acceptedAt: string;
  version: string;
};

/**
 * Реквизиты Исполнителя / оператора.
 * Заполните реальные значения в .env.local (NEXT_PUBLIC_OPERATOR_*).
 * Дефолты - заглушки TAP VPN, не контакты сторонних сервисов.
 */
export const operator = {
  name: process.env.NEXT_PUBLIC_OPERATOR_NAME?.trim() || "Oko.Labs LLC",
  inn:
    process.env.NEXT_PUBLIC_OPERATOR_INN?.trim() ||
    process.env.NEXT_PUBLIC_OPERATOR_ID?.trim() ||
    "447011313",
  ogrn: process.env.NEXT_PUBLIC_OPERATOR_OGRN?.trim() || "",
  address:
    process.env.NEXT_PUBLIC_OPERATOR_ADDRESS?.trim() ||
    "Georgia, Kobuleti Municipality, Tsikhisdziri Village, 10th Street, N 2",
  email:
    process.env.NEXT_PUBLIC_OPERATOR_EMAIL?.trim() ||
    "support@tapvpn.example",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() ||
    "support@tapvpn.example",
  /** Ник Telegram без @; пусто = канал не публикуем */
  telegram:
    process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM?.trim().replace(/^@/, "") || "",
};

export const sitePublicUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://tapvpn.example";

export function operatorTelegramUrl(): string | null {
  if (!operator.telegram) return null;
  return `https://t.me/${operator.telegram}`;
}

export const legalNav = [
  { href: "/legal", label: "Юридическая информация" },
  { href: "/terms", label: "Пользовательское соглашение" },
  { href: "/privacy", label: "Политика конфиденциальности" },
  {
    href: "/privacy/processing",
    label: "Политика конфиденциальности (об обработке ПД)",
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
    label: "Согласие на рекламную и информационную рассылку",
  },
  { href: "/offer", label: "Публичная оферта" },
] as const;

export function readLegalConsent(): LegalConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LEGAL_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LegalConsentRecord;
  } catch {
    return null;
  }
}

export function saveLegalConsent(
  source: LegalConsentRecord["source"],
  extras?: { offer?: boolean; marketing?: boolean }
): LegalConsentRecord {
  const record: LegalConsentRecord = {
    privacy: true,
    terms: true,
    offer: extras?.offer ?? source === "checkout",
    marketing: extras?.marketing ?? false,
    version: LEGAL_POLICY_VERSION,
    acceptedAt: new Date().toISOString(),
    source,
  };
  window.localStorage.setItem(LEGAL_CONSENT_KEY, JSON.stringify(record));
  return record;
}

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentRecord;
  } catch {
    return null;
  }
}

export function saveCookieConsent(analytics: boolean): CookieConsentRecord {
  const record: CookieConsentRecord = {
    necessary: true,
    analytics,
    acceptedAt: new Date().toISOString(),
    version: LEGAL_POLICY_VERSION,
  };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));
  return record;
}
