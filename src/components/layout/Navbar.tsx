"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { availability, hero, navLinks } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border/70 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          aria-label="ALASHRAF-TECHUB — home"
          className="inline-flex h-11 items-center rounded-md"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted xl:inline-flex">
            <span
              className={cn(
                "size-1.5 rounded-full",
                availability.open ? "animate-pulse-dot bg-success" : "bg-danger",
              )}
              aria-hidden="true"
            />
            {availability.label}
          </span>

          <a
            href={hero.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-button hidden h-11 items-center gap-1.5 rounded-[8px] px-4 text-sm font-semibold text-accent transition-colors duration-200 sm:inline-flex"
          >
            Hire Me
            <ArrowUpRight
              className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-[8px] border border-border bg-surface text-foreground transition-colors duration-200 hover:bg-surface-2 lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden",
          open ? "block border-t border-border bg-background" : "hidden",
        )}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-between border-b border-border/60 py-3 text-base font-medium text-foreground"
            >
              {link.label}
              <ArrowUpRight className="size-4 text-muted" aria-hidden="true" />
            </a>
          ))}
          <a
            href={hero.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="glass-button mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-[8px] px-5 text-sm font-semibold text-accent transition-colors duration-200"
          >
            Hire Me
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <p className="mt-4 flex items-center gap-2 pb-2 text-xs text-muted">
            <span
              className="size-1.5 rounded-full bg-success"
              aria-hidden="true"
            />
            {availability.label}
          </p>
        </nav>
      </div>
    </header>
  );
}
