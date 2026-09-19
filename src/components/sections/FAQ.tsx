import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/lib/data";

export function FAQ() {
  return (
    <section id="faq" className="py-10 sm:py-14">
      <Container className="flex flex-col gap-8 sm:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Частые вопросы"
            subtitle="Не нашли ответ? Напишите в поддержку — мы на связи 24/7."
          />
        </Reveal>

        <Reveal className="mx-auto w-full max-w-2xl">
          <Accordion items={faqItems} />
        </Reveal>
      </Container>
    </section>
  );
}
