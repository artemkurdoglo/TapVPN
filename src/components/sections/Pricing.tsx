import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { plans } from "@/lib/plans";
import { formatPrice } from "@/lib/format";

export function Pricing() {
  return (
    <section id="pricing" className="py-10 sm:py-14">
      <Container className="flex flex-col gap-8 sm:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Тарифы"
            title="Выберите тариф"
            subtitle="Простой выбор. Честные цены — без скрытых платежей. Первая неделя — 1 ₽."
          />
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:items-center">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 90} className="h-full">
              <div
                className={`relative flex h-full flex-col gap-6 rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                  plan.popular
                    ? "border-accent-border bg-surface-2 shadow-glow-md lg:scale-105"
                    : "border-border bg-surface/60 hover:border-border-strong"
                }`}
              >
                {plan.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-1 text-xs font-bold uppercase tracking-wide text-accent-ink">
                    Популярно
                  </span>
                ) : null}

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold uppercase tracking-wide text-ink-dim">
                    {plan.name}
                  </span>
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-4xl font-extrabold tracking-tight text-ink">
                    {formatPrice(plan.priceMonthly)} ₽
                  </span>
                  <span className="pb-1 text-sm text-ink-faint">в месяц</span>
                </div>

                {plan.savingsPercent > 0 ? (
                  <span className="text-sm font-semibold text-success">
                    Экономия {plan.savingsPercent}%
                  </span>
                ) : (
                  <span className="text-sm text-ink-faint">
                    Всего {formatPrice(plan.totalPrice)} ₽
                  </span>
                )}

                <Button
                  href={`/checkout?plan=${plan.id}`}
                  fullWidth
                  variant={plan.popular ? "primary" : "secondary"}
                  className="mt-2"
                >
                  Выбрать
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
