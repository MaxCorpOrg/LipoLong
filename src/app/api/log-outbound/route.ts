import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getOrCreateSessionId } from "@/lib/session";

function respond(request: NextRequest, status: number, payload: { ok: boolean; error?: string }) {
  const res = NextResponse.json(payload, { status });
  getOrCreateSessionId(request, res); // ставим/обновляем cookie сессии
  return res;
}

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return respond(request, 400, { ok: false, error: "Некорректный JSON" });
  }

  const hrefRaw = body?.href?.toString() ?? "";
  const fromPathRaw = body?.fromPath?.toString() ?? "";

  const hrefTrimmed = hrefRaw.trim().slice(0, 2048);
  const fromPathInput = fromPathRaw.trim().slice(0, 2048);

  if (!hrefTrimmed) {
    return respond(request, 400, { ok: false, error: "href обязателен" });
  }

  try {
    // Валидируем как URL (разрешаем любые протоколы, но нужен корректный формат)
    // Для относительных ссылок добавляем базу, чтобы не падать.
    new URL(hrefTrimmed, "https://example.com");
  } catch {
    return respond(request, 400, { ok: false, error: "Некорректный href" });
  }

  const successResponse = NextResponse.json({ ok: true });
  const { sessionId, response } = getOrCreateSessionId(request, successResponse);

  const fromPath =
    fromPathInput ||
    request.headers.get("referer")?.toString() ||
    request.nextUrl.pathname ||
    undefined;

  try {
    await prisma.outboundClick.create({
      data: {
        toUrl: hrefTrimmed,
        fromPath,
        sessionId,
      },
    });
  } catch (error) {
    console.error("Outbound log failed", error);
    return respond(request, 500, { ok: false, error: "Не удалось записать клик" });
  }

  return response;
}
export const runtime = "nodejs";
