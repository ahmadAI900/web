"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, Expand, X } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { certifications } from "@/content/site";

type Certificate = (typeof certifications)[number];

export function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, close]);

  return (
    <section id="certifications" className="container-page scroll-mt-24 pb-20 md:pb-28">
      <SectionHeading
        eyebrow="Certifications"
        title="Verified training, with the IDs to check."
        description="Original certificates issued to Ahmad Ashraf. Open either document to read the full credential."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {certifications.map((certificate) => (
          <button
            key={certificate.id}
            type="button"
            onClick={() => setSelected(certificate)}
            aria-haspopup="dialog"
            className="group flex flex-col overflow-hidden rounded-[16px] border border-border bg-surface/60 text-left transition-colors duration-200 hover:border-accent/40"
          >
            <span className="relative block aspect-[3/2] w-full overflow-hidden bg-surface-2">
              <Image
                src={certificate.image}
                alt={certificate.imageAlt}
                width={certificate.width}
                height={certificate.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" aria-hidden="true" />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/80 px-2.5 py-1.5 text-xs font-medium text-foreground backdrop-blur">
                <Expand className="size-3.5 text-accent" aria-hidden="true" />
                View
              </span>
            </span>

            <span className="flex flex-1 flex-col gap-2 p-5">
              <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                {certificate.issuer}
              </span>
              <span className="font-display text-lg font-semibold text-foreground">
                {certificate.name}
              </span>
              <span className="text-sm leading-relaxed text-muted">
                {certificate.detail}
              </span>
              <span className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                <span>ID {certificate.id}</span>
                <span>Issued {certificate.issued}</span>
                {"validUntil" in certificate && certificate.validUntil ? (
                  <span>Valid to {certificate.validUntil}</span>
                ) : null}
              </span>
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} certificate`}
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close certificate"
            className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-[8px] border border-border bg-surface text-foreground transition-colors duration-200 hover:bg-surface-2"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <div
            className="max-h-[88vh] w-full max-w-5xl overflow-auto rounded-[16px] border border-border bg-surface"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selected.image}
              alt={selected.imageAlt}
              width={selected.width}
              height={selected.height}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="h-auto w-full"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-4">
              <p className="text-sm font-semibold text-foreground">
                {selected.name}
              </p>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                ID {selected.id}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
