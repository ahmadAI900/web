import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { GitHubIcon } from "@/components/shared/BrandIcons";
import {
  availability,
  contact,
  navLinks,
  services,
  siteConfig,
} from "@/content/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="container-page grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label="ALASHRAF-TECHUB — home" className="inline-flex h-11 items-center rounded-md">
            <Logo />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Independent technology studio building AI systems, full-stack products,
            and custom software end-to-end.
          </p>
          <p className="flex items-center gap-2 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            {availability.label}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted">
            Navigate
          </p>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/cv"
            className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            CV
          </Link>
        </nav>

        <nav aria-label="Services" className="flex flex-col gap-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted">
            Services
          </p>
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#service-${service.slug}`}
              className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-foreground"
            >
              {service.name.replace(" & Machine Learning", "").replace(" & Technical Solutions", "")}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted">
            Contact
          </p>
          <a
            href={contact.email.href}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            <Mail className="size-3.5 text-accent" aria-hidden="true" />
            {contact.email.display}
          </a>
          <a
            href={contact.phone.href}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            <Phone className="size-3.5 text-accent" aria-hidden="true" />
            {contact.phone.display}
          </a>
          <a
            href={contact.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            <GitHubIcon className="size-3.5 text-accent" />
            GitHub
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
          <a
            href={contact.whatsapp[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            WhatsApp · {contact.whatsapp[0].display}
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
