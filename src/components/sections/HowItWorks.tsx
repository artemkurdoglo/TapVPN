import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/lib/data";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-10 sm:py-14">
      <Container className="flex flex-col gap-8 sm:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Как это работает"
            title="Подключение за три простых шага"
            subtitle="От выбора тарифа до защищённого интернета — меньше пяти минут."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.index} delay={index * 100}>
              <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 sm:p-7">
                <span className="text-4xl font-extrabold text-ink-faint/40">
                  {step.index}
                </span>
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-dim">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
