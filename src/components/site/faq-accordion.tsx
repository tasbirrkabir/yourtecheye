"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/content/faq";

/**
 * Minimal brutalist FAQ: hairline-separated rows, mono index, plus/minus.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className="border-b border-line last:border-b-0"
        >
          <AccordionTrigger className="items-baseline gap-4 py-5 text-left text-base font-bold text-ink hover:no-underline hover:text-signal sm:text-lg">
            <span className="font-mono text-xs font-bold text-signal sm:text-sm">
              Q.{String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">{faq.question}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 pl-0 text-base leading-relaxed text-smoke sm:pl-10">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
