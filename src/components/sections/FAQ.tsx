import { Plus } from "lucide-react";
import { faqs } from "@/content/site";

export function FAQ() {
  return (
    <div id="faq" className="mt-16 scroll-mt-24 border-t border-border pt-12">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-accent">
            Questions
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
            Before you reach out.
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            If something is not covered here, ask directly — you will get a straight
            answer.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-foreground transition-colors duration-200 hover:text-accent [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45 group-open:text-accent"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-4 pr-8 text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
