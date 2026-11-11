"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/content/site";
import { cn } from "@/lib/utils";

function format(value: number, decimals: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<number[]>(() => stats.map((stat) => stat.value));

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    let started = false;

    const run = () => {
      const duration = 1500;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValues(stats.map((stat) => stat.value * eased));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started) return;
        started = true;
        setValues(stats.map(() => 0));
        frame = window.requestAnimationFrame(run);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section aria-label="Key figures" className="border-b border-border/70">
      <div ref={sectionRef} className="container-page">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col gap-2 px-5 py-8 sm:px-7 lg:py-10",
                index % 2 === 0 && "border-r border-border/70",
                index === 1 && "lg:border-r lg:border-border/70",
                index < 2 && "border-b border-border/70 lg:border-b-0",
              )}
            >
              <dd className="font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-none tracking-[-0.03em] text-foreground">
                {format(values[index] ?? stat.value, 0)}
              </dd>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
