import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { sitePublicUrl } from "@/lib/legal";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = sitePublicUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TAP VPN — Быстрый, безопасный и анонимный VPN",
    template: "%s · TAP VPN",
  },
  description:
    "TAP VPN защищает ваше соединение и открывает доступ к интернету без ограничений. Высокая скорость, шифрование трафика и поддержка 24/7. Первая неделя — за 1 ₽.",
  keywords: [
    "TAP VPN",
    "VPN",
    "купить VPN",
    "безопасный VPN",
    "быстрый VPN",
    "анонимный VPN",
  ],
  openGraph: {
    title: "TAP VPN — Быстрый, безопасный и анонимный VPN",
    description:
      "Защищайте своё соединение и пользуйтесь интернетом без ограничений с TAP VPN.",
    url: siteUrl,
    siteName: "TAP VPN",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TAP VPN — Быстрый, безопасный и анонимный VPN",
    description:
      "Защищайте своё соединение и пользуйтесь интернетом без ограничений с TAP VPN.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050711",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <noscript>
          <style>{`[class*="opacity-0"]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <AuthProvider>
          {children}
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  );
}
