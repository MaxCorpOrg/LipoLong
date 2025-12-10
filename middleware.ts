import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Логирование визитов перенесено в /api/log-visit (Node runtime).
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)"],
  runtime: "nodejs",
};
