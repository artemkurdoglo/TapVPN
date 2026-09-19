export interface Plan {
  id: string;
  name: string;
  shortName: string;
  months: number;
  priceMonthly: number;
  totalPrice: number;
  savingsPercent: number;
  popular: boolean;
}

const BASE_MONTHLY_PRICE = 299;

function savings(priceMonthly: number): number {
  if (priceMonthly >= BASE_MONTHLY_PRICE) return 0;
  return Math.round((1 - priceMonthly / BASE_MONTHLY_PRICE) * 100);
}

// Порядок в ряду: 1 месяц | 12 месяцев (центр) | 6 месяцев
export const plans: Plan[] = [
  {
    id: "1m",
    name: "1 месяц",
    shortName: "1 месяц",
    months: 1,
    priceMonthly: 299,
    totalPrice: 299,
    savingsPercent: savings(299),
    popular: false,
  },
  {
    id: "12m",
    name: "12 месяцев",
    shortName: "12 месяцев",
    months: 12,
    priceMonthly: 199,
    totalPrice: 199 * 12,
    savingsPercent: savings(199),
    popular: true,
  },
  {
    id: "6m",
    name: "6 месяцев",
    shortName: "6 месяцев",
    months: 6,
    priceMonthly: 249,
    totalPrice: 249 * 6,
    savingsPercent: savings(249),
    popular: false,
  },
];

export const defaultPlan = plans.find((plan) => plan.popular) ?? plans[0];

export function getPlanById(id: string | undefined | null): Plan {
  return plans.find((plan) => plan.id === id) ?? defaultPlan;
}
