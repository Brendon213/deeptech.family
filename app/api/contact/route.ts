const MAX_NAME_LENGTH = 120;
const MAX_CONTACT_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3_000;
const TELEGRAM_MESSAGE_LIMIT = 4_096;
const TELEGRAM_TIMEOUT_MS = 8_000;

type ContactPayload = {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  consent?: unknown;
};

function jsonResponse(body: { ok: boolean; error?: string }, status: number) {
  return Response.json(body, { status });
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
  let payload: ContactPayload;

  try {
    const body: unknown = await request.json();
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
