import { NextResponse } from "next/server";
import { ensureInquiriesTable, getDb, hashIp } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";
import { fieldErrors, inquirySchema } from "@/lib/validators";

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getIp(request);
  const limit = rateLimit(`inquiry:${ip}`, 5, 10 * 60 * 1000);

  if (!limit.ok) {
    const retryAfter = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many inquiries from this connection. Please try again later or message me on WhatsApp.",
      },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fields: fieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 300);
  const ipHash = hashIp(ip);

  let stored = false;
  const db = getDb();
  if (db) {
    try {
      await ensureInquiriesTable(db);
      await db.execute({
        sql: `INSERT INTO inquiries
              (name, email, phone, company, service, budget, message, ip_hash, user_agent)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          data.name,
          data.email,
          data.phone ?? null,
          data.company ?? null,
          data.service || null,
          data.budget ?? null,
          data.message,
          ipHash,
          userAgent,
        ],
      });
      stored = true;
    } catch (error) {
      console.error("Failed to persist inquiry", error);
    }
  } else {
    console.warn("TURSO_DATABASE_URL is not configured — inquiry was not persisted.");
  }

  try {
    await sendInquiryEmail(data);
  } catch (error) {
    console.error("Failed to send inquiry email", error);
  }

  return NextResponse.json({ ok: true, stored });
}
