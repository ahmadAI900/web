import { ArrowUpRight, GitBranch, ShieldCheck } from "lucide-react";
import { GitHubIcon } from "@/components/shared/BrandIcons";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects } from "@/content/site";

const registry = [
  { label: "Browser", count: 20 },
  { label: "Document", count: 17 },
  { label: "File", count: 12 },
  { label: "Spreadsheet", count: 11 },
  { label: "GUI", count: 9 },
  { label: "Media & volume", count: 9 },
  { label: "Folder", count: 7 },
] as const;

export function Projects() {
  const featured = projects.find((project) => project.featured);
  const secondary = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="container-page scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Systems built to act, not just answer."
          description="Original engineering, independent platforms, and clearly credited derivatives. Repositories are public — including the tests."
        />
      </Reveal>

      {featured ? (
        <Reveal className="mt-10">
          <article className="overflow-hidden rounded-[20px] border border-border bg-surface/60">
            <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
              <div className="p-6 md:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-accent">
                    <ShieldCheck className="size-3" aria-hidden="true" />
                    Flagship · Original
                  </span>
                  <span className="rounded-full border border-border bg-background/50 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                    Python
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-foreground">
                  {featured.name}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                  {featured.description}
                </p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {featured.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <span
                        className="mt-[0.42rem] size-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {featured.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border/80 bg-background/40 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={featured.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 items-center gap-2 rounded-[8px] bg-accent px-4 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
                  >
                    <GitHubIcon className="size-4" />
                    View repository
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-surface-2"
                  >
                    Ask about it
                  </a>
                </div>
              </div>

              <div className="border-t border-border bg-background/40 p-6 md:p-9 lg:border-l lg:border-t-0">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                      Capability registry
                    </p>
                    <p className="mt-1 font-display text-4xl font-semibold leading-none text-foreground">
                      120
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[0.65rem] font-medium text-success">
                    <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                    1,859 tests passing
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {registry.map((item) => (
                    <li key={item.label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted">{item.label}</span>
                        <span className="font-mono text-foreground">{item.count}</span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border/60">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                          style={{ width: `${(item.count / 20) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted">
                  <GitBranch className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                  Three-level architecture: chat → specialised agents → compound-task
                  router.
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      ) : null}

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {secondary.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.06}>
            <article className="flex h-full flex-col rounded-[16px] border border-border bg-surface/50 p-6 transition-colors duration-200 hover:border-accent/30">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">
                {project.kind}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
                {project.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {project.summary}
              </p>

              <ul className="mt-4 space-y-1.5">
                {project.highlights.slice(0, 3).map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                  >
                    <span
                      className="mt-[0.35rem] size-1 shrink-0 rounded-full bg-accent/70"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border/70 bg-background/40 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-accent"
              >
                Repository
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
