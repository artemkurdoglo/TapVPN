import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { features } from "@/lib/data";
import {
  ShieldIcon,
  BoltIcon,
  SparkleIcon,
  GlobeIcon,
  type IconProps,
} from "@/components/ui/icons";

const iconMap: Record<string, ComponentType<IconProps>> = {
  shield: ShieldIcon,
  bolt: BoltIcon,
  sparkle: SparkleIcon,
  globe: GlobeIcon,
};

export function Features() {
  return (
    <section id="features" className="py-10 sm:py-14">
      <Container className="flex flex-col gap-8 sm:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Преимущества"
            title="Всё нужное для безопасного интернета"
            subtitle="TAP VPN сочетает надёжную защиту и стабильную скорость без лишних настроек."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <Reveal key={feature.title} delay={index * 80}>
                <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-border hover:shadow-glow-xs">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-bold text-ink">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-dim">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
