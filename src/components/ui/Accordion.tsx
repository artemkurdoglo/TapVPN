"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";

export interface AccordionItemData {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`rounded-2xl border bg-surface/60 transition-colors duration-300 ${
              isOpen ? "border-accent-border" : "border-border"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="text-[15px] font-semibold text-ink sm:text-base">
                {item.question}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 text-ink-dim transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-accent" : ""
                }`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-ink-dim sm:px-6 sm:pb-5">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
