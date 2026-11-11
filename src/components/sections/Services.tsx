import {
  ArrowUpRight,
  Brain,
  Check,
  Code2,
  Globe,
  Layers,
  MessageCircle,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { FAQ } from "@/components/sections/FAQ";
import { Process } from "@/components/sections/Process";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { services } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  brain: Brain,
  code: Code2,
  layers: Layers,
  globe: Globe,
  wrench: Wrench,
};

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-surface/25 py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Services & Buy"
              title="Five ways to get the software you actually need."
              description="Every engagement is scoped directly with me. Choose a starting point, then we shape the details together."
            />
            <p className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted lg:text-right">
              5 service lines
              <br />
              End-to-end delivery
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? Brain;
            const message = `Hi Ahmad, I'm interested in ${service.name}. Here's what I need:`;

            return (
              <Reveal
                key={service.slug}
                delay={(index % 2) * 0.06}
                className={index === services.length - 1 ? "md:col-span-2" : undefined}
              >
                <article
                  id={`service-${service.slug}`}
                  className="flex h-full scroll-mt-24 flex-col rounded-[16px] border border-border bg-background/50 p-6 transition-colors duration-300 hover:border-accent/30 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-accent/25 bg-accent/10 text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-[0.18em] text-muted">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[clamp(1.3rem,2.2vw,1.7rem)] font-semibold leading-tight text-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-accent">
                    {service.tagline}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {service.idealFor.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/80 bg-surface/60 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.08em] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                    <a
                      href={whatsappLink(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group glass-button inline-flex h-11 items-center gap-2 rounded-[8px] px-4 text-sm font-semibold text-accent transition-colors duration-200"
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      {service.cta}
                      <ArrowUpRight
                        className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                    <a
                      href={`/?service=${service.slug}#contact`}
                      className="inline-flex h-11 items-center text-sm font-medium text-muted underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                    >
                      Request a quote
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Process />
        <FAQ />
      </div>
    </section>
  );
}
