import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { defaultPlan, getPlanById } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Оформление подписки",
  description: "Оформите подписку TAP VPN — выберите тариф и способ оплаты.",
};

export default async function CheckoutPage({
  searchParams,
}: PageProps<"/checkout">) {
  const params = await searchParams;
  const planParam = Array.isArray(params.plan) ? params.plan[0] : params.plan;
  const plan = getPlanById(planParam ?? defaultPlan.id);

  return (
    <>
      <Header />
      <main className="flex-1 py-14 sm:py-20">
        <Container className="flex flex-col gap-3">
          <div className="mb-6 flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Оформление
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Оформление подписки
            </h1>
            <p className="text-ink-dim">
              Проверьте тариф, укажите email и выберите способ оплаты.
            </p>
          </div>

          <CheckoutForm initialPlanId={plan.id} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
