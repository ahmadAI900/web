import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { ParticlePortrait } from "@/components/hero/ParticlePortrait";
import { availability, hero } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-glow"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden sm:block hidden" aria-hidden="true">
        {[0, 1, 2].map((bubble) => (
          <span
            key={bubble}
            className="absolute bottom-[-8%] rounded-full border border-white/10 bg-white/10 backdrop-blur-sm"
            style={{
              left: `${18 + bubble * 24}%`,
              width: `${22 + bubble * 8}px`,
              height: `${22 + bubble * 8}px`,
              animation: `bubble-drift ${4.2 + bubble * 0.7}s ease-in-out ${bubble * 0.6}s infinite`,
              opacity: 0.45,
            }}
          />
        ))}
      </div>

      <div className="container-page relative grid items-center gap-12 pb-16 pt-28 md:pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-24 lg:pt-36">
        <div className="flex flex-col items-start">
          <span
            className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted backdrop-blur"
            style={{ animationDelay: "40ms" }}
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {hero.eyebrow}
          </span>

          <h1
            className="animate-rise mt-6 font-display text-[clamp(3.4rem,10.5vw,7.2rem)] font-bold leading-[0.88] tracking-[-0.045em] text-foreground"
            style={{ animationDelay: "120ms" }}
          >
            MEET
            <span className="block">
              AHMAD<span className="text-accent">.</span>
            </span>
          </h1>

          <p
            className="animate-rise mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted"
            style={{ animationDelay: "200ms" }}
          >
            <span>{hero.subtitle}</span>
            <span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-accent" aria-hidden="true" />
              Remote · Worldwide
            </span>
          </p>

          <p
            className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "280ms" }}
          >
            {hero.description}
          </p>

          <div
            className="animate-rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href={hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
            className="group glass-button inline-flex h-12 items-center justify-center gap-2 rounded-[8px] px-6 text-sm font-semibold text-accent transition-colors duration-200"
          >
            {hero.primaryCta.label}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={hero.secondaryCta.href}
            className="group glass-button inline-flex h-12 items-center justify-center gap-2 rounded-[8px] px-6 text-sm font-semibold text-foreground transition-colors duration-200"
          >
            {hero.secondaryCta.label}
              <ArrowDown
                className="size-4 text-muted transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <p
            className="animate-rise mt-6 flex items-center gap-2 text-xs text-muted"
            style={{ animationDelay: "440ms" }}
          >
            <span
              className="size-2 rounded-full bg-success animate-pulse-dot"
              aria-hidden="true"
            />
            {availability.label} — {availability.note}
          </p>
        </div>

        <div
          className="animate-rise relative mx-auto w-full max-w-[430px]"
          style={{ animationDelay: "300ms" }}
        >
          <div
            className="absolute -inset-6 rounded-[32px] bg-accent/10 blur-2xl"
            aria-hidden="true"
          />
          <ParticlePortrait
            src="/brand/ahmad-mirror.png"
            alt="Ahmad Ashraf, AI engineer, in a black-and-white mirror portrait"
            className="aspect-[4/5] w-full sm:aspect-[3/4]"
            priority
          />
          <div className="absolute -right-3 top-6 hidden rounded-[10px] border border-border bg-background/85 px-3 py-2 backdrop-blur sm:block">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              Currently building
            </p>
            <p className="mt-0.5 font-display text-sm font-semibold text-foreground">
              GENESIS OS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
