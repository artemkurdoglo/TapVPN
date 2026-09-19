import type { Metadata } from "next";
import { MiniHeader } from "@/components/layout/MiniHeader";
import { LoginPageClient } from "@/components/auth/LoginPageClient";

export const metadata: Metadata = {
  title: "Вход в личный кабинет",
  description: "Войдите в личный кабинет TAP VPN для управления подпиской.",
};

export default function LoginPage() {
  return (
    <>
      <MiniHeader />
      <main className="flex flex-1 items-center justify-center px-5 py-12 sm:py-24">
        <LoginPageClient />
      </main>
    </>
  );
}
