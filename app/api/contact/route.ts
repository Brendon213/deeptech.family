import { isIP } from "node:net";

const MAX_NAME_LENGTH = 120;
const MAX_CONTACT_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3_000;
const MAX_REQUEST_BYTES = 8 * 1024;
const TELEGRAM_MESSAGE_LIMIT = 4_096;
const TELEGRAM_TIMEOUT_MS = 8_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const VERCEL_MAX_SUBMISSIONS = 5;
const SHARED_MAX_SUBMISSIONS = 20;
const MAX_RATE_LIMIT_BUCKETS = 5_000;
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 60 * 1_000;

type RateLimitBucket = { timestamps: number[] };
const rateLimitBuckets = new Map<string, RateLimitBucket>();
let lastRateLimitCleanup = 0;

type ContactPayload = {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  consent?: unknown;
};

function jsonResponse(body: { ok: boolean; error?: string }, status: number) {
  return Response.json(body, { status });
}

async function readLimitedBody(request: Request): Promise<{ body: string; tooLarge: false } | { body: null; tooLarge: true }> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && /^\d+$/.test(contentLength) && Number(contentLength) > MAX_REQUEST_BYTES) {
    return { body: null, tooLarge: true };
  }

  if (!request.body) return { body: "", tooLarge: false };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return { body: null, tooLarge: true };
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { body: new TextDecoder("utf-8", { fatal: true }).decode(bytes), tooLarge: false };
  } catch {
    return { body: "\u0000", tooLarge: false };
  }
}

function isSameOriginRequest(request: Request): boolean {
  if (request.headers.get("sec-fetch-site")?.toLowerCase() === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) return false;
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (!origin && referer) {
    try {
      if (new URL(referer).origin !== new URL(request.url).origin) return false;
    } catch {
      return false;
    }
  }

  return true;
}

function getRateLimitIdentity(request: Request): { key: string; limit: number } {
  // Vercel overwrites X-Forwarded-For at its edge. Never trust this header on
  // other hosts, where a caller could rotate a forged value to evade limits.
  if (process.env.VERCEL === "1") {
    const forwardedFor = request.headers.get("x-forwarded-for")?.trim();
    if (forwardedFor && !forwardedFor.includes(",") && isIP(forwardedFor)) {
      return { key: `ip:${forwardedFor}`, limit: VERCEL_MAX_SUBMISSIONS };
    }
  }

  // Fetch Request does not expose the socket peer IP. Use a shared conservative
  // bucket outside Vercel rather than keying on caller-controlled headers.
  return { key: "shared", limit: SHARED_MAX_SUBMISSIONS };
}

function allowSubmission(key: string, limit: number, now = Date.now()): { allowed: true } | { allowed: false; retryAfterSeconds: number } {
  if (now - lastRateLimitCleanup >= RATE_LIMIT_CLEANUP_INTERVAL_MS) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (bucket.timestamps.at(-1)! <= now - RATE_LIMIT_WINDOW_MS) rateLimitBuckets.delete(bucketKey);
    }
    lastRateLimitCleanup = now;
  }

  const bucket = rateLimitBuckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((timestamp) => timestamp > now - RATE_LIMIT_WINDOW_MS);

  if (bucket.timestamps.length >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.timestamps[0] + RATE_LIMIT_WINDOW_MS - now) / 1_000)),
    };
  }

  bucket.timestamps.push(now);
  rateLimitBuckets.delete(key);
  rateLimitBuckets.set(key, bucket);

  if (rateLimitBuckets.size > MAX_RATE_LIMIT_BUCKETS) {
    const oldestKey = rateLimitBuckets.keys().next().value;
    if (oldestKey !== undefined) rateLimitBuckets.delete(oldestKey);
  }

  return { allowed: true };
}

function readSingleLine(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;

  const normalized = value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return normalized.length > 0 && normalized.length <= maxLength ? normalized : null;
}

function readMessage(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const normalized = value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();

  return normalized.length > 0 && normalized.length <= MAX_MESSAGE_LENGTH ? normalized : null;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ ok: false, error: "invalid_request" }, 403);
  }

  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (contentType && contentType !== "application/json") {
    return jsonResponse({ ok: false, error: "invalid_request" }, 415);
  }

  let limitedBody: Awaited<ReturnType<typeof readLimitedBody>>;
  try {
    limitedBody = await readLimitedBody(request);
  } catch {
    return jsonResponse({ ok: false, error: "invalid_request" }, 400);
  }
  if (limitedBody.tooLarge) {
    return jsonResponse({ ok: false, error: "payload_too_large" }, 413);
  }

  let payload: ContactPayload;

  try {
    const body: unknown = JSON.parse(limitedBody.body);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return jsonResponse({ ok: false, error: "invalid_request" }, 400);
    }
    payload = body as ContactPayload;
  } catch {
    return jsonResponse({ ok: false, error: "invalid_request" }, 400);
  }

  const name = readSingleLine(payload.name, MAX_NAME_LENGTH);
  const contact = readSingleLine(payload.contact, MAX_CONTACT_LENGTH);
  const message = readMessage(payload.message);

  if (!name || !contact || !message || payload.consent !== true) {
    return jsonResponse({ ok: false, error: "invalid_request" }, 400);
  }

  const identity = getRateLimitIdentity(request);
  const rateLimit = allowSubmission(identity.key, identity.limit);
  if (!rateLimit.allowed) {
    return Response.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "retry-after": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return jsonResponse({ ok: false, error: "service_unavailable" }, 503);
  }

  const text = [`Заявка с сайта`, `Имя: ${name}`, `Контакт: ${contact}`, `Заявка:`, message].join("\n");

  if (text.length > TELEGRAM_MESSAGE_LIMIT) {
    return jsonResponse({ ok: false, error: "invalid_request" }, 400);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!telegramResponse.ok) {
      return jsonResponse({ ok: false, error: "delivery_failed" }, 502);
    }

    const telegramResult: unknown = await telegramResponse.json().catch(() => null);
    if (!telegramResult || typeof telegramResult !== "object" || !("ok" in telegramResult) || telegramResult.ok !== true) {
      return jsonResponse({ ok: false, error: "delivery_failed" }, 502);
    }

    return jsonResponse({ ok: true }, 200);
  } catch {
    return jsonResponse(
      { ok: false, error: controller.signal.aborted ? "delivery_timeout" : "delivery_failed" },
      controller.signal.aborted ? 504 : 502,
    );
  } finally {
    clearTimeout(timeout);
  }
}
