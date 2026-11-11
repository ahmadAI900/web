type Bucket = {
  count: number;
  reset: number;
};

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  reset: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.reset <= now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (existing.count >= limit) {
    return { ok: false, remaining: 0, reset: existing.reset };
  }

  existing.count += 1;
  return { ok: true, remaining: limit - existing.count, reset: existing.reset };
}

if (typeof setInterval === "function") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.reset <= now) buckets.delete(key);
    }
  }, 60_000);
  if (typeof timer === "object" && "unref" in timer) {
    timer.unref();
  }
}
