import { createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "alashraf_admin";

export function adminToken(password: string) {
  return createHash("sha256").update(`admin:${password}`).digest("hex");
}

export function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminAuthenticated(
  password: string | undefined,
  session: string | undefined,
) {
  if (!password || !session) return false;
  return safeEqual(session, adminToken(password));
}
