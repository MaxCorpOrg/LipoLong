import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getOrCreateSessionId } from "@/lib/session";

type Body = {
  path?: string;
  query?: string;
  referrer?: string;
  userAgent?: string;
};

const MAX_LEN = 2048;

function sanitize(text?: string) {
  if (!text) return undefined;
  return text.slice(0, MAX_LEN);
}

export async function POST(request: NextRequest) {
  let body: Body = {};
  try {
    body = await request.json();
  } catch {
    // ignore, will default to empty
  }

  const path = sanitize(body.path) ?? request.headers.get("x-pathname") ?? "/";
  const query = sanitize(body.query);
  const referrer = sanitize(body.referrer ?? request.headers.get("referer") ?? undefined);
  const userAgent = sanitize(body.userAgent ?? request.headers.get("user-agent") ?? undefined);

  const ipHeader = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
  const ip =
    ipHeader?.split(",")[0].trim() ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((request as any).ip as string | undefined) ||
    undefined;

  const urlSearch = query ?? "";
  const searchParams = new URLSearchParams(urlSearch.startsWith("?") ? urlSearch.slice(1) : urlSearch);
  const utmSource = sanitize(searchParams.get("utm_source") ?? undefined);
  const utmMedium = sanitize(searchParams.get("utm_medium") ?? undefined);
  const utmCampaign = sanitize(searchParams.get("utm_campaign") ?? undefined);

  const response = NextResponse.json({ ok: true });
  const { sessionId } = getOrCreateSessionId(request, response);

  void prisma.visit
    .create({
      data: {
        ip,
        userAgent,
        path,
        query,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
        sessionId,
      },
    })
    .catch((error) => console.error("Visit log failed", error));

  return response;
}
export const runtime = "nodejs";
