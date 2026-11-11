import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { PrintButton } from "@/components/cv/PrintButton";
import {
  certifications,
  contact,
  education,
  experience,
  projects,
  services,
  siteConfig,
  skillGroups,
} from "@/content/site";

export const metadata: Metadata = {
  title: "CV — Ahmad Ashraf",
  description:
    "Curriculum vitae for Ahmad Ashraf, AI engineer and full-stack developer, founder of ALASHRAF-TECHUB.",
  alternates: { canonical: "/cv" },
};

export default function CVPage() {
  return (
    <div className="min-h-screen bg-background py-10 print:bg-white print:py-0">
      <div className="mx-auto flex w-full max-w-[860px] items-center justify-between gap-4 px-5 pb-6 print:hidden">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface-2"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to site
        </Link>
        <PrintButton />
      </div>

      <main className="mx-auto w-full max-w-[860px]">
        <article className="cv-sheet w-full bg-white px-8 py-10 text-neutral-900 shadow-2xl print:max-w-none print:px-0 print:py-0 print:shadow-none sm:px-12">
        <header className="border-b border-neutral-300 pb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-orange-600">
                ALASHRAF-TECHUB
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold leading-none tracking-[-0.03em]">
                Ahmad Ashraf
              </h1>
              <p className="mt-2 text-sm font-medium text-neutral-600">
                AI Engineer & Full-Stack Developer · Founder & CEO, ALASHRAF-TECHUB
              </p>
            </div>
            <div className="text-right text-xs leading-relaxed text-neutral-600">
              <p>{contact.phone.display}</p>
              <p>{contact.email.display}</p>
              <p>{contact.github.display}</p>
              <p>Remote · Worldwide</p>
            </div>
          </div>
        </header>

        <section className="mt-6">
          <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-orange-600">
            Profile
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            18-year-old AI engineer and full-stack developer building AI systems,
            Python backends, web products, and custom software end-to-end. Led the
            development of GENESIS OS, a Windows AI agent with a 120-action capability
            registry and 1,859 passing automated tests. Certified through AKTP and the
            Microsoft Professional Development Program. IELTS 6.0.
          </p>
        </section>

        <div className="mt-6 grid gap-8 sm:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <section className="break-inside-avoid">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-orange-600">
                Experience
              </h2>
              {experience.map((role) => (
                <div key={role.role} className="mt-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-neutral-900">{role.role}</h3>
                    <span className="text-xs text-neutral-500">{role.period}</span>
                  </div>
                  <p className="text-xs font-medium text-neutral-600">{role.company}</p>
                  <ul className="mt-2 space-y-1">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-xs leading-relaxed text-neutral-700"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-orange-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section className="break-inside-avoid">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-orange-600">
                Selected projects
              </h2>
              <div className="mt-3 space-y-3">
                {projects.map((project) => (
                  <div key={project.slug}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-bold text-neutral-900">
                        {project.name}
                      </h3>
                      <span className="text-[0.65rem] text-neutral-500">
                        {project.kind}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-700">
                      {project.summary}
                    </p>
                    <p className="mt-1 text-[0.65rem] leading-relaxed text-neutral-500">
                      {project.stack.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="break-inside-avoid">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-orange-600">
                Technical skills
              </h2>
              <div className="mt-3 space-y-3">
                {skillGroups.map((group) => (
                  <div key={group.title}>
                    <p className="text-[0.7rem] font-semibold text-neutral-800">
                      {group.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-neutral-600">
                      {group.skills.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="break-inside-avoid">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-orange-600">
                Education
              </h2>
              <div className="mt-3 space-y-2">
                {education.map((item) => (
                  <div key={item.qualification}>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-semibold text-neutral-800">
                        {item.qualification}
                      </p>
                      <span className="text-xs font-bold text-orange-600">
                        {item.result}
                      </span>
                    </div>
                    <p className="text-[0.7rem] text-neutral-600">{item.institution}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="break-inside-avoid">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-orange-600">
                Certifications
              </h2>
              <div className="mt-3 space-y-2">
                {certifications.map((certificate) => (
                  <div key={certificate.id}>
                    <p className="text-xs font-semibold text-neutral-800">
                      {certificate.name}
                    </p>
                    <p className="text-[0.7rem] text-neutral-600">
                      {certificate.issuer} · {certificate.issued}
                    </p>
                    <p className="text-[0.62rem] uppercase tracking-[0.08em] text-neutral-500">
                      ID {certificate.id}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="break-inside-avoid">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-orange-600">
                Services
              </h2>
              <ul className="mt-2 space-y-1">
                {services.map((service) => (
                  <li key={service.slug} className="text-xs text-neutral-700">
                    {service.name}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-300 pt-4 text-[0.62rem] text-neutral-500">
          <span>{siteConfig.name} · {siteConfig.url}</span>
          <span>References and certificate originals available on request.</span>
        </footer>
        </article>
      </main>
    </div>
  );
}
