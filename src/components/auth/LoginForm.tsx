"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ConfirmationResult } from "firebase/auth";
import { isSignInWithEmailLink } from "firebase/auth";
import { Button } from "@/components/ui/Button";
import { MailIcon, PhoneIcon, AlertIcon } from "@/components/ui/icons";
import {
  getPendingEmail,
  mapAuthError,
  RECAPTCHA_CONTAINER_ID,
  useAuth,
} from "@/components/auth/AuthProvider";
import { getFirebaseAuth } from "@/lib/firebase";
import {
  normalizeEmail,
  normalizePhone,
  formatPhoneDisplay,
  phoneDigits,
  formatSmsCode,
} from "@/lib/subscription";
import { LegalConsentFields } from "@/components/legal/LegalConsentFields";
import { saveLegalConsent } from "@/lib/legal";

type Method = "email" | "phone";
type Step = "identifier" | "email-sent" | "phone-code";

export function LoginForm() {
  const router = useRouter();
  const {
    configured,
    requestEmailLink,
    completeEmailLink,
    requestPhoneCode,
    confirmPhoneCode,
  } = useAuth();

  const [method, setMethod] = useState<Method>("email");
  const [step, setStep] = useState<Step>("identifier");
  const [email, setEmail] = useState("");
  /** Только локальные 10 цифр номера (без +7). */
  const [phoneLocal, setPhoneLocal] = useState("");
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finishingLink, setFinishingLink] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const phoneDisplay = formatPhoneDisplay(phoneLocal);
  const busy = isSubmitting || finishingLink;

  useEffect(() => {
    if (!configured || typeof window === "undefined") return;

    const href = window.location.href;
    if (!isSignInWithEmailLink(getFirebaseAuth(), href)) return;

    const pending = getPendingEmail();
    if (!pending) {
      setMethod("email");
      setStep("identifier");
      setError("Введите email, на который пришла ссылка для входа.");
      return;
    }

    setFinishingLink(true);
    setEmail(pending);
    setError(null);

    completeEmailLink(href, pending)
      .then(() => router.replace("/dashboard"))
      .catch((err) => {
        setError(mapAuthError(err));
        setFinishingLink(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured]);

  async function handleIdentifierSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!configured) {
      setError("Firebase не настроен.");
      return;
    }

    if (!privacyAccepted || !termsAccepted) {
      setError(
        "Чтобы продолжить, подтвердите согласие с Политикой конфиденциальности и Пользовательским соглашением."
      );
      return;
    }

    const href = typeof window !== "undefined" ? window.location.href : "";
    const isLink = Boolean(
      href && isSignInWithEmailLink(getFirebaseAuth(), href)
    );

    if (method === "email") {
      const normalized = normalizeEmail(email);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
        setError("Введите корректный email.");
        return;
      }

      setIsSubmitting(true);
      try {
        saveLegalConsent("login");
        if (isLink) {
          await completeEmailLink(href, normalized);
          router.push("/dashboard");
          return;
        }
        await requestEmailLink(normalized);
        setStep("email-sent");
      } catch (err) {
        setError(mapAuthError(err));
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (phoneLocal.length !== 10) {
      setError("Введите номер полностью: +7 (XXX) XXX-XX-XX.");
      return;
    }

    setIsSubmitting(true);
    try {
      saveLegalConsent("login");
      const result = await requestPhoneCode(normalizePhone(phoneLocal));
      setConfirmation(result);
      setCode("");
      setStep("phone-code");
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePhoneCodeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!confirmation) {
      setError("Сначала запросите код.");
      return;
    }
    if (code.length !== 6) {
      setError("Введите 6-значный код из SMS.");
      return;
    }

    setIsSubmitting(true);
    try {
      await confirmPhoneCode(confirmation, code);
      router.push("/dashboard");
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (finishingLink) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-ink-dim">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
        <p className="text-sm">Завершаем вход по ссылке...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-5">
      <div
        id={RECAPTCHA_CONTAINER_ID}
        className="fixed bottom-0 left-0 -z-10 h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />

      {step === "email-sent" ? (
        <>
          <div className="rounded-xl border border-accent-border bg-accent-soft px-4 py-4 text-sm text-ink">
            Мы отправили ссылку для входа на{" "}
            <span className="font-semibold">{normalizeEmail(email)}</span>.
            Откройте письмо и перейдите по ссылке.
          </div>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => setStep("identifier")}
          >
            Указать другой email
          </Button>
        </>
      ) : null}

      {step === "phone-code" ? (
        <form onSubmit={handlePhoneCodeSubmit} className="flex flex-col gap-5">
          <p className="text-sm text-ink-dim">
            Код отправлен на{" "}
            <span className="font-semibold text-ink">{phoneDisplay}</span>
          </p>
          <div className="flex flex-col gap-2">
            <label htmlFor="sms-code" className="text-sm font-semibold text-ink">
              Код из SMS
            </label>
            <input
              id="sms-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              required
              maxLength={6}
              disabled={busy}
              value={code}
              onChange={(event) => {
                if (busy) return;
                const next = formatSmsCode(event.target.value);
                setCode(next);
                if (next.length === 6 && confirmation && !isSubmitting) {
                  void (async () => {
                    setError(null);
                    setIsSubmitting(true);
                    try {
                      await confirmPhoneCode(confirmation, next);
                      router.push("/dashboard");
                    } catch (err) {
                      setError(mapAuthError(err));
                    } finally {
                      setIsSubmitting(false);
                    }
                  })();
                }
              }}
              placeholder="• • • • • •"
              className="w-full rounded-xl border border-border bg-surface/60 px-4 py-4 text-center font-mono text-2xl tracking-[0.55em] text-ink placeholder:tracking-[0.35em] placeholder:text-ink-faint outline-none transition-colors focus:border-accent-border disabled:cursor-not-allowed disabled:opacity-60"
            />
            <p className="text-center text-xs text-ink-faint">{code.length}/6</p>
          </div>

          {error ? <ErrorBox text={error} /> : null}

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={busy || code.length !== 6}
          >
            {isSubmitting ? "Проверяем..." : "Войти"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            fullWidth
            disabled={busy}
            onClick={() => {
              setStep("identifier");
              setCode("");
              setConfirmation(null);
              setError(null);
            }}
          >
            Изменить номер
          </Button>
        </form>
      ) : null}

      {step === "identifier" ? (
        <form onSubmit={handleIdentifierSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface/40 p-1">
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setMethod("email");
                setError(null);
              }}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                method === "email"
                  ? "bg-accent-soft text-accent"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setMethod("phone");
                setError(null);
              }}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                method === "phone"
                  ? "bg-accent-soft text-accent"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              Телефон
            </button>
          </div>

          {method === "email" ? (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-email"
                className="text-sm font-semibold text-ink"
              >
                Email
              </label>
              <div className="relative">
                <MailIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={busy}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-surface/60 py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent-border disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-phone"
                className="text-sm font-semibold text-ink"
              >
                Телефон
              </label>
              <div className="relative">
                <PhoneIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <input
                  id="login-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  required
                  disabled={busy}
                  value={phoneDisplay}
                  onChange={(event) => {
                    const input = event.target.value;
                    if (
                      !input ||
                      input === "+" ||
                      input === "+7" ||
                      input === "+7 "
                    ) {
                      setPhoneLocal("");
                      return;
                    }
                    setPhoneLocal(phoneDigits(input));
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Backspace" && event.key !== "Delete") {
                      return;
                    }
                    const el = event.currentTarget;
                    const start = el.selectionStart ?? 0;
                    const end = el.selectionEnd ?? 0;
                    if (start !== end) return;
                    if (
                      event.key === "Backspace" &&
                      start <= 3 &&
                      phoneLocal.length > 0
                    ) {
                      event.preventDefault();
                      setPhoneLocal((prev) => prev.slice(0, -1));
                    }
                  }}
                  placeholder="+7 (900) 000-00-00"
                  className="w-full rounded-xl border border-border bg-surface/60 py-3 pl-11 pr-4 text-sm tracking-wide text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent-border disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>
          )}

          {error ? <ErrorBox text={error} /> : null}

          <LegalConsentFields
            idPrefix="login"
            privacyAccepted={privacyAccepted}
            termsAccepted={termsAccepted}
            onPrivacyChange={setPrivacyAccepted}
            onTermsChange={setTermsAccepted}
            disabled={busy}
          />

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={
              busy ||
              !privacyAccepted ||
              !termsAccepted ||
              (method === "email"
                ? normalizeEmail(email).length === 0
                : phoneLocal.length !== 10)
            }
          >
            {isSubmitting
              ? "Проверяем..."
              : method === "email"
                ? "Получить ссылку для входа"
                : "Получить код"}
          </Button>
        </form>
      ) : null}
    </div>
  );
}

function ErrorBox({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
      <AlertIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
      {text}
    </div>
  );
}
