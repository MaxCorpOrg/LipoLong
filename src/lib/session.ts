import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "ll_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 дней

type SessionResult = {
  sessionId: string;
  response: NextResponse;
  isNew: boolean;
};

function generateSessionId(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Читает sessionId из запроса, при необходимости создает новый и ставит cookie в ответ.
 * Удобно использовать в middleware и API-роутах.
 */
export function getOrCreateSession(request: NextRequest, response?: NextResponse): SessionResult {
  const existing = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const sessionId = existing ?? generateSessionId();
  const res = response ?? NextResponse.next();

  if (!existing) {
    res.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionId,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
  }

  return { sessionId, response: res, isNew: !existing };
}

// Алиас с запрошенным названием, чтобы было удобно подключать в коде.
export function getOrCreateSessionId(request: NextRequest, response?: NextResponse): SessionResult {
  return getOrCreateSession(request, response);
}

export function readSessionId(request: NextRequest): string | undefined {
  return request.cookies.get(SESSION_COOKIE_NAME)?.value;
}
