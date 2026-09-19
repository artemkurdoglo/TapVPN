import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { trustChecklist } from "@/lib/data";
import {
  BoltIcon,
  LockIcon,
  PowerIcon,
  HeadsetIcon,
  CheckIcon,
  type IconProps,
} from "@/components/ui/icons";

const iconMap: Record<string, ComponentType<IconProps>> = {
  bolt: BoltIcon,
  lock: LockIcon,
  power: PowerIcon,
  headset: HeadsetIcon,
};

export function WhyUs() {
  return (
    <section className="py-10 sm:py-14">
      <Container className="flex flex-col gap-8 sm:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Почему TAP VPN"
            title="Сервис, которому можно доверять"
            subtitle="Без компромиссов в скорости, конфиденциальности и удобстве использования."
          />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface/60 p-6 sm:grid-cols-2 sm:p-8">
            {trustChecklist.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0 sm:border-b-0"
                >
                  <span className="inline-flex items-center gap-3 text-[15px] font-medium text-ink">
                    <Icon className="h-5 w-5 shrink-0 text-accent" />
                    {item.label}
                  </span>
                  <CheckIcon className="h-5 w-5 shrink-0 text-success" />
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
