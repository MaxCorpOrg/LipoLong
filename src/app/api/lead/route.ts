import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getOrCreateSessionId } from "@/lib/session";
import { checkRateLimit, sendOrder, validateOrderPayload } from "@/lib/sendOrder";

const MIN_FILL_MS = 3000;
const MAX_FILL_MS = 30 * 60 * 1000;

function respond(
  request: NextRequest,
  status: number,
  payload: { ok: boolean; error?: string }
): NextResponse {
  const res = NextResponse.json(payload, { status });
  getOrCreateSessionId(request, res); // чтобы кука сессии выставлялась даже на ошибках
  return res;
}

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch (error) {
    return respond(request, 400, { ok: false, error: "Некорректный JSON" });
  }

  const name = (body?.name ?? "").toString();
  const phone = (body?.phone ?? "").toString();
  const email = (body?.email ?? "").toString();
  const message = (body?.message ?? "").toString();
  const website = (body?.website ?? "").toString(); // honeypot
  const startedAtRaw = body?.startedAt;

  if (website.trim()) {
    return respond(request, 400, { ok: false, error: "Подозрение на спам" });
  }

  const startedAt = Number(startedAtRaw);
  if (!Number.isFinite(startedAt)) {
    return respond(request, 400, { ok: false, error: "Сессия формы устарела. Обновите страницу." });
  }
  const elapsed = Date.now() - startedAt;
  if (elapsed < MIN_FILL_MS) {
    return respond(request, 400, { ok: false, error: "Слишком быстрое заполнение. Попробуйте ещё раз." });
  }
  if (elapsed > MAX_FILL_MS) {
    return respond(request, 400, { ok: false, error: "Сессия формы устарела. Обновите страницу." });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ip = forwardedFor?.split(",")[0].trim() || realIp?.trim() || ((request as any).ip as string | undefined) || "unknown";
  const rate = checkRateLimit(ip || "unknown");
  if (!rate.ok) {
    return respond(request, 429, { ok: false, error: rate.error });
  }

  const validation = validateOrderPayload({ name, email, phone, message });
  if (!validation.ok) {
    return respond(request, 400, { ok: false, error: validation.error });
  }

  const successResponse = NextResponse.json({ ok: true });
  const { sessionId, response } = getOrCreateSessionId(request, successResponse);

  try {
    await prisma.lead.create({
      data: {
        name,
        phone,
        email,
        message,
        sessionId,
      },
    });

    // сохраняем текущую бизнес-логику отправки письма/телеграма
    await sendOrder({ name, email, phone, message });
  } catch (error) {
    console.error("Lead save failed", error);
    return respond(request, 500, { ok: false, error: "Не удалось сохранить заявку" });
  }

  return response;
}
export const runtime = "nodejs";
