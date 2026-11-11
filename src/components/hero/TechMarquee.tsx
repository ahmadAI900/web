const tech = [
  "Python",
  "FastAPI",
  "REST APIs",
  "PostgreSQL",
  "SQLite",
  "Selenium",
  "Playwright",
  "PyAutoGUI",
  "Windows UIA",
  "OpenAI API",
  "Groq",
  "Ollama",
  "OpenRouter",
  "RAG",
  "AI Agents",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "SvelteKit",
  "Tailwind CSS",
  "Node.js",
  "Docker",
  "Git",
  "pytest",
] as const;

export function TechMarquee() {
  return (
    <section
      aria-label="Technologies used"
      className="border-y border-border/70 bg-surface/30 py-4"
    >
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-3 group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-3"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {tech.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border/70 bg-background/50 px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted"
                >
                  <span className="size-1 rounded-full bg-accent/70" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
