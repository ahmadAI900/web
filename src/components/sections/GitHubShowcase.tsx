"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { GitHubIcon } from "@/components/shared/BrandIcons";
import { cn } from "@/lib/utils";

type GithubData = {
  ok: true;
  user: { publicRepos: number; followers: number };
  stars: number;
  languages: { name: string; count: number }[];
  repos: {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    href: string;
    updatedAt: string;
  }[];
};

export function GitHubShowcase() {
  const [data, setData] = useState<GithubData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    fetch("/api/github", { signal: controller.signal })
      .then((response) => response.json())
      .then((payload: GithubData | { ok: false }) => {
        if (!active) return;
        if (payload.ok) setData(payload);
        else setFailed(true);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const stats = [
    { label: "Public repos", value: data ? String(data.user.publicRepos) : "—" },
    { label: "Stars", value: data ? String(data.stars) : "—" },
    {
      label: "Languages",
      value: data ? String(data.languages.length) : "—",
    },
  ];

  return (
    <section aria-label="GitHub" className="container-page pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-[20px] border border-border bg-surface/60 p-7 md:p-10">
        <div
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-accent">
              <GitHubIcon className="size-3.5" />
              Open source
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.05] text-foreground">
              The work is public.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              Every featured project links to its repository. Browse the commits,
              the tests, and the engineering notes — not just the marketing copy.
            </p>
            <a
              href="https://github.com/ahmadAI900"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-button mt-7 inline-flex h-12 items-center gap-2 rounded-[8px] px-5 text-sm font-semibold text-foreground transition-colors duration-200"
            >
              <GitHubIcon className="size-4 text-accent" />
              Explore GitHub
              <ArrowUpRight
                className="size-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            {failed ? (
              <p className="mt-4 text-xs text-muted">
                Live statistics are temporarily unavailable. The repository list above
                is always available.
              </p>
            ) : null}
          </div>

          <div className="grid gap-3">
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[14px] border border-border bg-background/50 p-4"
                >
                  <p
                    className={cn(
                      "font-display text-3xl font-semibold leading-none text-foreground",
                      !data && "text-muted",
                    )}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[14px] border border-border bg-background/50 p-4">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                Most recent repository
              </p>
              {data?.repos[0] ? (
                <a
                  href={data.repos[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex min-h-11 items-center justify-between gap-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-accent"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                    {data.repos[0].name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
                    <Star className="size-3" aria-hidden="true" />
                    {data.repos[0].stars}
                  </span>
                </a>
              ) : (
                <p className="mt-2 text-sm text-muted">
                  {failed ? "Visit GitHub for the latest work." : "Loading…"}
                </p>
              )}
            </div>

            {data?.languages.length ? (
              <div className="flex flex-wrap gap-1.5">
                {data.languages.map((language) => (
                  <span
                    key={language.name}
                    className="rounded-full border border-border/80 bg-background/40 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted"
                  >
                    {language.name} · {language.count}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
