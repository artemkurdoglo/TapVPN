import type { Plan } from "@/lib/plans";
import { formatPrice } from "@/lib/format";
import { CheckIcon } from "@/components/ui/icons";

export function OrderSummary({ plan }: { plan: Plan }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface/60 p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
          Ваш заказ
        </span>
        {plan.popular ? (
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
            Популярно
          </span>
        ) : null}
      </div>

      <div className="flex items-center justify-between border-b border-border pb-5">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-bold text-ink">TAP VPN — {plan.name}</span>
          <span className="text-sm text-ink-dim">
            {formatPrice(plan.priceMonthly)} ₽ / месяц
          </span>
        </div>
        <span className="text-2xl font-extrabold text-ink">
          {formatPrice(plan.totalPrice)} ₽
        </span>
      </div>

      <ul className="flex flex-col gap-2.5">
        {["Высокая скорость", "Снятие ограничений в 1 клик", "Поддержка 24/7", "Простая активация"].map(
          (item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-ink-dim">
              <CheckIcon className="h-4 w-4 shrink-0 text-success" />
              {item}
            </li>
          )
        )}
      </ul>

      {plan.savingsPercent > 0 ? (
        <div className="flex items-center justify-between rounded-xl bg-success-soft px-4 py-3 text-sm font-semibold text-success">
          <span>Ваша экономия</span>
          <span>{plan.savingsPercent}%</span>
        </div>
      ) : null}

      <div className="flex items-center justify-between pt-1">
        <span className="text-sm font-medium text-ink-dim">Итого к оплате</span>
        <span className="text-xl font-extrabold text-ink">
          {formatPrice(plan.totalPrice)} ₽
        </span>
      </div>
    </div>
  );
}
