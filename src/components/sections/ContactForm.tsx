"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2, Send } from "lucide-react";
import { services } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  website: "",
};

const inputClass =
  "h-11 w-full rounded-[8px] border border-border bg-background/60 px-3 text-sm text-foreground placeholder:text-muted/60 transition-colors duration-200 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 aria-[invalid=true]:border-danger";

const labelClass =
  "mb-1.5 flex items-center gap-1 text-xs font-medium text-muted";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window === "undefined") return initialState;
    const param = new URLSearchParams(window.location.search).get("service");
    if (param && services.some((service) => service.slug === param)) {
      return { ...initialState, service: param };
    }
    return initialState;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const update = (key: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);
    setErrors({});

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: string;
        fields?: Record<string, string>;
      };

      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Something went wrong. Please try again.");
        setErrors(payload.fields ?? {});
        setStatus("idle");
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setError(
        "Could not send the inquiry. Check your connection, or message me on WhatsApp.",
      );
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[16px] border border-success/30 bg-surface/60 p-8 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full border border-success/40 bg-success/10 text-success">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
          Inquiry sent.
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thanks — I will review your message and reply by email or WhatsApp. If it is
          urgent, message me directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink("Hi Ahmad, I just sent an inquiry through your site.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-accent px-4 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
          >
            Message on WhatsApp
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="inline-flex h-11 items-center rounded-[8px] border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-surface-2"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[16px] border border-border bg-surface/60 p-6 md:p-8"
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Tell me about the project.
        </h3>
        <p className="text-sm text-muted">
          Required fields are marked. No spam, no mailing list.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
            placeholder="Your name"
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs text-danger">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
            placeholder="you@company.com"
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-xs text-danger">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone or WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={update("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass}
            placeholder="+92 ..."
          />
          {errors.phone ? (
            <p id="phone-error" className="mt-1.5 text-xs text-danger">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={update("company")}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={inputClass}
            placeholder="Optional"
          />
          {errors.company ? (
            <p id="company-error" className="mt-1.5 text-xs text-danger">
              {errors.company}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>
            Service
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={update("service")}
            className={inputClass}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range
          </label>
          <input
            id="budget"
            name="budget"
            type="text"
            value={form.budget}
            onChange={update("budget")}
            aria-invalid={Boolean(errors.budget)}
            className={inputClass}
            placeholder="Optional — e.g. $500–$2,000"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Project details <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={update("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full resize-y rounded-[8px] border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors duration-200 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 aria-[invalid=true]:border-danger"
            placeholder="What are you building, what is the goal, and when do you need it?"
          />
          {errors.message ? (
            <p id="message-error" className="mt-1.5 text-xs text-danger">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-[8px] border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="glass-button inline-flex h-11 items-center justify-center gap-2 rounded-[8px] px-5 text-sm font-semibold text-accent transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <p className="text-xs text-muted">
          Prefer direct contact?{" "}
          <a
            href={whatsappLink("Hi Ahmad, I'd like to discuss a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center font-medium text-foreground underline decoration-accent/60 underline-offset-4"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </form>
  );
}
