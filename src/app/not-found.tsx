import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]"
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center text-center">
        <Logo variant="primary" />
        <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-accent">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-[clamp(3rem,10vw,6rem)] font-bold leading-none tracking-[-0.04em] text-foreground">
          Page not found<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          That link does not exist. Head back to the portfolio, or start a project
          directly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-accent px-5 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>
          <a
            href="https://wa.me/971565547528?text=Hi%20Ahmad%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-[8px] border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-surface-2"
          >
            Start a project
          </a>
        </div>
      </div>
    </main>
  );
}
