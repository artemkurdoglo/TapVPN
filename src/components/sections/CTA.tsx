import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

export function CTA() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-accent-border bg-surface-2 px-6 py-12 text-center sm:px-12 sm:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[110px]"
            />
            <h2 className="relative max-w-lg text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Попробуйте первую неделю за 1 ₽
            </h2>
            <p className="relative max-w-md text-base text-ink-dim sm:text-lg">
              Подключите TAP VPN за несколько минут и оцените защиту без риска.
            </p>
            <Button href="/#pricing" size="lg" className="relative">
              Выбрать тариф
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
