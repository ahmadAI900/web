import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { testimonials } from "@/content/site";

export function Testimonials() {
  return (
    <section aria-label="Testimonials" className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Client feedback"
        title="What working together sounds like."
        description={testimonials.sampleNote}
      />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {testimonials.items.map((item) => (
          <figure
            key={`${item.name}-${item.role}`}
            className="flex h-full flex-col rounded-[16px] border border-dashed border-border bg-surface/40 p-6"
          >
            <Quote className="size-5 text-accent/70" aria-hidden="true" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
              {item.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-border/70 pt-4">
              <p className="text-sm font-semibold text-foreground">{item.name}</p>
              <p className="mt-0.5 text-xs text-muted">{item.role}</p>
              <span className="mt-2 inline-flex rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">
                Sample
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
