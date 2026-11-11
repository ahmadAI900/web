import type { ComponentType } from "react";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { GitHubIcon } from "@/components/shared/BrandIcons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { availability, contact } from "@/content/site";

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external?: boolean;
};

const channels: Channel[] = [
  {
    label: contact.whatsapp[0].label,
    value: contact.whatsapp[0].display,
    href: contact.whatsapp[0].href,
    icon: MessageCircle,
    external: true,
  },
  {
    label: contact.whatsapp[1].label,
    value: contact.whatsapp[1].display,
    href: contact.whatsapp[1].href,
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Call",
    value: contact.phone.display,
    href: contact.phone.href,
    icon: Phone,
  },
  {
    label: "Email",
    value: contact.email.display,
    href: contact.email.href,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: contact.github.display,
    href: contact.github.href,
    icon: GitHubIcon,
    external: true,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-border bg-surface/25 py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-glow opacity-70"
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something that works."
            description="Tell me what you need, what is blocking you, and when it has to be done. You will get a direct answer from the person who will build it."
          />

          <div className="mt-8 flex flex-col gap-2">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={`${channel.label}-${channel.value}`}
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex min-h-11 items-center gap-3 rounded-[10px] border border-transparent px-1 py-2 transition-colors duration-200 hover:border-border hover:bg-background/40"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-border bg-surface text-accent">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                      {channel.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-foreground">
                      {channel.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="ml-auto size-4 shrink-0 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3 rounded-[14px] border border-border bg-background/40 p-5">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span
                className="size-2 rounded-full bg-success animate-pulse-dot"
                aria-hidden="true"
              />
              {availability.label}
            </p>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
              <Clock className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
              {availability.note} Share as much context as you can — scope, timeline,
              and any existing code.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
