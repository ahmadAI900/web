import { processSteps } from "@/content/site";

export function Process() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-accent">
            How it works
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
            A clear path from message to delivery.
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          No on-site checkout. Nothing is charged until you have approved a written
          proposal.
        </p>
      </div>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step) => (
          <li
            key={step.step}
            className="relative rounded-[14px] border border-border bg-background/40 p-5"
          >
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">
              {step.step}
            </span>
            <p className="mt-2 font-display text-base font-semibold text-foreground">
              {step.title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
