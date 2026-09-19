import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ConnectionOrb } from "@/components/ui/ConnectionOrb";
import { ArrowRightIcon, ShieldIcon, BoltIcon } from "@/components/ui/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-5 sm:pb-14 sm:pt-12 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-[140px]"
      />

      <Container className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex max-w-xl flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <Link
            href="/#pricing"
            className="group relative inline-flex max-w-full flex-col items-center gap-1 overflow-hidden rounded-2xl border border-accent-border bg-accent-soft/70 px-5 py-3 text-center shadow-glow-xs transition-all duration-300 hover:shadow-glow-sm sm:flex-row sm:gap-3 sm:text-left lg:items-start"
          >
            <span className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-accent-ink">
              1 ₽
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-ink sm:text-[15px]">
                Попробуйте TAP VPN первую неделю за 1 ₽
              </span>
              <span className="text-xs text-ink-dim">
                Без риска — оцените скорость и защиту на себе
              </span>
            </span>
          </Link>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Быстрый. Безопасный.
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              Без лишнего.
            </span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-ink-dim sm:text-lg">
            Защищайте своё соединение и пользуйтесь интернетом без
            ограничений с TAP VPN.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/#pricing" size="lg">
              Попробовать за 1 ₽
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button href="/#how-it-works" variant="secondary" size="lg">
              Как это работает
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-1 text-sm text-ink-faint lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <ShieldIcon className="h-4 w-4 text-accent" />
              Безопасное соединение
            </span>
            <span className="inline-flex items-center gap-2">
              <BoltIcon className="h-4 w-4 text-accent" />
              Высокая скорость
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center scale-90 sm:scale-100">
          <ConnectionOrb size={260} />
        </div>
      </Container>
    </section>
  );
}
