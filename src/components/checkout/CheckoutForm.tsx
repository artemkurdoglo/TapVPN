"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { plans, getPlanById } from "@/lib/plans";
import { formatPrice } from "@/lib/format";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import { CardIcon, QrIcon, CoinIcon, MailIcon, AlertIcon } from "@/components/ui/icons";
import { LegalConsentFields } from "@/components/legal/LegalConsentFields";
import { saveLegalConsent } from "@/lib/legal";

const paymentMethods = [
  { id: "card", label: "Банковская карта", icon: CardIcon },
  { id: "sbp", label: "СБП", icon: QrIcon },
  { id: "crypto", label: "Криптовалюта", icon: CoinIcon },
] as const;

type PaymentMethodId = (typeof paymentMethods)[number]["id"];

export function CheckoutForm({ initialPlanId }: { initialPlanId: string }) {
  const router = useRouter();
  const [planId, setPlanId] = useState(initialPlanId);
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<PaymentMethodId>("card");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const plan = useMemo(() => getPlanById(planId), [planId]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValidEmail) {
      setError("Введите корректный email - на него придёт ключ активации.");
      return;
    }

    if (!privacyAccepted || !termsAccepted || !offerAccepted) {
      setError(
        "Чтобы оплатить, подтвердите согласие с Политикой конфиденциальности, Пользовательским соглашением и Публичной офертой."
      );
      return;
    }

    setIsSubmitting(true);
    saveLegalConsent("checkout", {
      offer: true,
      marketing: marketingAccepted,
    });

    // Демо-режим: реальная оплата не выполняется, транзакция не имитируется.
    window.setTimeout(() => {
      router.push(`/success?plan=${plan.id}`);
    }, 900);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-ink">Тариф</span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {plans.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPlanId(item.id)}
                className={`flex flex-col items-start gap-1 rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                  planId === item.id
                    ? "border-accent-border bg-accent-soft"
                    : "border-border bg-surface/60 hover:border-border-strong"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    planId === item.id ? "text-accent" : "text-ink"
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-xs text-ink-faint">
                  {formatPrice(item.priceMonthly)} ₽/мес
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-ink">
            Email
          </label>
          <div className="relative">
            <MailIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-border bg-surface/60 py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent-border"
            />
          </div>
          <p className="text-xs text-ink-faint">
            На этот адрес мы отправим ключ активации и инструкции.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-ink">Способ оплаты</span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {paymentMethods.map((item) => {
              const Icon = item.icon;
              const active = method === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMethod(item.id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-4 text-center transition-colors duration-200 ${
                    active
                      ? "border-accent-border bg-accent-soft text-accent"
                      : "border-border bg-surface/60 text-ink-dim hover:border-border-strong"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {error ? (
          <div className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
            <AlertIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
            {error}
          </div>
        ) : null}

        <LegalConsentFields
          idPrefix="checkout"
          privacyAccepted={privacyAccepted}
          termsAccepted={termsAccepted}
          offerAccepted={offerAccepted}
          marketingAccepted={marketingAccepted}
          onPrivacyChange={setPrivacyAccepted}
          onTermsChange={setTermsAccepted}
          onOfferChange={setOfferAccepted}
          onMarketingChange={setMarketingAccepted}
          requireOffer
          showMarketing
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={
            isSubmitting ||
            !privacyAccepted ||
            !termsAccepted ||
            !offerAccepted ||
            email.trim().length === 0
          }
        >
          {isSubmitting ? "Обработка..." : `Оплатить ${formatPrice(plan.totalPrice)} ₽`}
        </Button>

        <p className="text-center text-xs leading-relaxed text-ink-faint">
          Нажимая «Оплатить», вы подтверждаете согласие на обработку email для
          выдачи ключа активации. Это демо-форма: реальные платёжные данные не
          запрашиваются, оплата фактически не производится.
        </p>
      </form>

      <OrderSummary plan={plan} />
    </div>
  );
}
