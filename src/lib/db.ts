import { createHash } from "node:crypto";
import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;
let schemaPromise: Promise<void> | null = null;

export function getDb(): Client | null {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) return null;
  if (process.env.NODE_ENV === "production" && url.startsWith("file:")) return null;

  if (!client) {
    client = createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }

  return client;
}

export async function ensureInquiriesTable(db: Client) {
  if (!schemaPromise) {
    schemaPromise = db
      .execute(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          company TEXT,
          service TEXT,
          budget TEXT,
          message TEXT NOT NULL,
          ip_hash TEXT,
          user_agent TEXT,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `)
      .then(() => undefined);
  }

  await schemaPromise;
}

export function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT ?? "alashraf-techub";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 16);
}
