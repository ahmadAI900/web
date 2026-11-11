import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { adminToken, safeEqual } from "@/lib/admin-auth";

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getIp(request);
  const limit = rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.redirect(new URL("/admin?error=rate", request.url), 303);
  }

  const password = process.env.ADMIN_PASSWORD;
  const formData = await request.formData().catch(() => null);
  const submitted = String(formData?.get("password") ?? "");

  if (!password || !safeEqual(submitted, password)) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  const secure =
    request.headers.get("x-forwarded-proto") === "https" ||
    new URL(request.url).protocol === "https:";
  response.cookies.set("alashraf_admin", adminToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
