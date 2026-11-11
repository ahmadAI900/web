import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft, Inbox, Lock } from "lucide-react";
import { ensureInquiriesTable, getDb } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { DeleteInquiryButton } from "@/components/admin/DeleteInquiryButton";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Inquiries — Admin",
  robots: { index: false, follow: false, nocache: true },
};

type InquiryRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  created_at: string;
};

function serviceName(value: string | null) {
  if (!value) return "General";
  return services.find((service) => service.slug === value)?.name ?? value;
}

export default async function AdminPage({
  searchParams,
}: PageProps<"/admin">) {
  const params = await searchParams;
  const queryError = Array.isArray(params.error) ? params.error[0] : params.error;
  const cookieStore = await cookies();
  const password = process.env.ADMIN_PASSWORD;
  const session = cookieStore.get("alashraf_admin")?.value;
  const authenticated = isAdminAuthenticated(password, session);

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
        <div className="w-full max-w-sm rounded-[16px] border border-border bg-surface/60 p-7">
          <span className="inline-flex size-10 items-center justify-center rounded-[8px] border border-accent/25 bg-accent/10 text-accent">
            <Lock className="size-4" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-display text-xl font-semibold text-foreground">
            Admin access
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {password
              ? queryError === "rate"
                ? "Too many attempts. Wait a few minutes and try again."
                : queryError
                  ? "Invalid admin password."
                  : "Enter the admin password to view inquiries."
              : "ADMIN_PASSWORD is not configured on this deployment."}
          </p>
          <form method="post" action="/api/admin/login" className="mt-5 flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-medium text-muted">
              Admin password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-11 rounded-[8px] border border-border bg-background px-3 text-sm text-foreground focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="ADMIN_PASSWORD"
            />
            <button
              type="submit"
              className="mt-1 inline-flex h-11 items-center justify-center rounded-[8px] bg-accent text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
            >
              Unlock
            </button>
          </form>
          <Link
            href="/"
            className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-xs text-muted transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to site
          </Link>
        </div>
      </main>
    );
  }

  const db = getDb();
  let rows: InquiryRow[] = [];
  let error: string | null = null;

  if (!db) {
    error = "TURSO_DATABASE_URL is not configured. Inquiries are not being stored.";
  } else {
    try {
      await ensureInquiriesTable(db);
      const result = await db.execute({
        sql: `SELECT id, name, email, phone, company, service, budget, message, created_at
              FROM inquiries
              ORDER BY id DESC
              LIMIT 100`,
        args: [],
      });
      rows = result.rows.map((row) => ({
        id: Number(row.id),
        name: String(row.name ?? ""),
        email: String(row.email ?? ""),
        phone: row.phone ? String(row.phone) : null,
        company: row.company ? String(row.company) : null,
        service: row.service ? String(row.service) : null,
        budget: row.budget ? String(row.budget) : null,
        message: String(row.message ?? ""),
        created_at: String(row.created_at ?? ""),
      }));
    } catch (caught) {
      console.error("Admin query failed", caught);
      error = "Could not load inquiries from the database.";
    }
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent">
              ALASHRAF-TECHUB
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-foreground">
              Inquiries
            </h1>
            <p className="mt-1 text-xs text-muted">
              Latest {rows.length} record{rows.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface-2"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to site
          </Link>
        </div>

        {error ? (
          <p className="mt-6 rounded-[8px] border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        ) : null}

        {!error && rows.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-[16px] border border-border bg-surface/40 py-16 text-center">
            <Inbox className="size-6 text-muted" aria-hidden="true" />
            <p className="mt-3 text-sm text-muted">No inquiries yet.</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3">
          {rows.map((row) => (
            <article
              key={row.id}
              className="rounded-[14px] border border-border bg-surface/50 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    {row.name}
                    {row.company ? (
                      <span className="font-normal text-muted"> · {row.company}</span>
                    ) : null}
                  </h2>
                  <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                    <a
                      href={`mailto:${row.email}`}
                      className="text-foreground underline decoration-accent/50 underline-offset-2"
                    >
                      {row.email}
                    </a>
                    {row.phone ? (
                      <a
                        href={`tel:${row.phone.replaceAll(" ", "")}`}
                        className="text-foreground underline decoration-accent/50 underline-offset-2"
                      >
                        {row.phone}
                      </a>
                    ) : null}
                  </p>
                </div>
            <div className="flex flex-col items-end gap-3 text-right text-[0.65rem] text-muted">
              <div>
                <p>{serviceName(row.service)}</p>
                <p>{row.budget ? `Budget: ${row.budget}` : "Budget not given"}</p>
                <p>{row.created_at}</p>
              </div>
              <DeleteInquiryButton id={row.id} />
            </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted">
                {row.message}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
