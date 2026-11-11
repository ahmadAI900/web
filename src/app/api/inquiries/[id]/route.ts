import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureInquiriesTable, getDb } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(`admin-delete:${ip}`, 20, 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const cookieStore = await cookies();
  const password = process.env.ADMIN_PASSWORD;
  const session = cookieStore.get("alashraf_admin")?.value;
  if (!isAdminAuthenticated(password, session)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid inquiry id." }, { status: 400 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }

  try {
    await ensureInquiriesTable(db);
    await db.execute({
      sql: "DELETE FROM inquiries WHERE id = ?",
      args: [id],
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete inquiry", error);
    return NextResponse.json(
      { error: "Could not delete the inquiry." },
      { status: 500 },
    );
  }
}
