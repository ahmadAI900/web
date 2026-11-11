import Link from "next/link";
import { ArrowDownToLine, Briefcase, GraduationCap, Languages } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { about, education, experience, skillGroups } from "@/content/site";

export function About() {
  return (
    <section id="about" className="container-page scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="About"
          title={about.heading}
          description={about.body[0]}
        />
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal className="flex flex-col gap-5 text-base leading-relaxed text-muted">
          {about.body.slice(1).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link
            href="/cv"
            className="group mt-2 inline-flex h-11 w-fit items-center gap-2 rounded-[8px] border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-surface-2"
          >
            <ArrowDownToLine className="size-4 text-accent" aria-hidden="true" />
            Download CV
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[16px] border border-border bg-surface/60 p-5"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">
                  {group.title}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border/80 bg-background/50 px-2.5 py-1 text-[0.7rem] text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
            <Briefcase className="size-4 text-accent" aria-hidden="true" />
            Experience
          </h3>
          <div className="mt-5">
            {experience.map((role) => (
              <article
                key={role.role}
                className="relative rounded-[16px] border border-border bg-surface/60 p-6 pl-7"
              >
                <span
                  className="absolute bottom-6 left-0 top-6 w-px bg-gradient-to-b from-accent/70 to-transparent"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    {role.role}
                  </h4>
                  <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                    {role.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">{role.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{role.summary}</p>
                <ul className="mt-4 space-y-2">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-muted"
                    >
                      <span
                        className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent/80"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
            <GraduationCap className="size-4 text-accent" aria-hidden="true" />
            Education
          </h3>
          <div className="mt-5 flex flex-col gap-3">
            {education.map((item) => (
              <div
                key={item.qualification}
                className="flex items-center justify-between gap-4 rounded-[14px] border border-border bg-surface/60 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.qualification}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{item.institution}</p>
                </div>
                <span className="font-display text-xl font-semibold text-accent">
                  {item.result}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-[14px] border border-border bg-surface/60 p-5">
            <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">
              <Languages className="size-3.5" aria-hidden="true" />
              Communication
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              IELTS 6.0 bands. Comfortable running client calls, writing technical
              documentation, and explaining engineering decisions without jargon.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
