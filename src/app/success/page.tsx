import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import { defaultPlan } from "@/lib/plans";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Оплата прошла успешно",
  description: "Подписка TAP VPN активирована.",
};

export default function SuccessPage() {
  const plan = defaultPlan;

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center py-16 sm:py-24">
        <Container className="flex justify-center">
          <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl border border-accent-border bg-surface-2 px-6 py-12 text-center shadow-glow-md sm:px-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-soft">
              <CheckIcon className="h-8 w-8 text-success" strokeWidth={2} />
            </span>

            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Оплата прошла успешно
            </h1>

            <p className="max-w-sm text-ink-dim">
              Ваша подписка TAP VPN «{plan.name}» активирована. Дальнейшие
              инструкции отправлены на вашу почту.
            </p>

            <div className="flex w-full items-center justify-between rounded-xl border border-border bg-surface/60 px-5 py-4 text-left">
              <span className="text-sm text-ink-dim">Тариф</span>
              <span className="text-sm font-semibold text-ink">
                {plan.name} · {formatPrice(plan.totalPrice)} ₽
              </span>
            </div>

            <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row">
              <Button href="/dashboard" fullWidth size="lg">
                Перейти в личный кабинет
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>

            <Button href="/" variant="ghost" size="sm">
              Вернуться на главную
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}