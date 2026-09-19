import type { Metadata } from "next";
import { MiniHeader } from "@/components/layout/MiniHeader";
import { Container } from "@/components/ui/Container";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { RequireAuth } from "@/components/auth/RequireAuth";

export const metadata: Metadata = {
  title: "Личный кабинет",
  description: "Управляйте своей подпиской TAP VPN.",
};

export default function DashboardPage() {
  return (
    <RequireAuth>
      <MiniHeader showSignOut />
      <main className="flex-1 py-10 sm:py-14">
        <Container className="flex flex-col gap-2">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Личный кабинет
            </h1>
            <p className="text-ink-dim">Управляйте своей подпиской TAP VPN.</p>
          </div>

          <DashboardOverview />
        </Container>
      </main>
    </RequireAuth>
  );
}
