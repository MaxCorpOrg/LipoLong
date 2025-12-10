import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import AdminTrafficClient from "./TrafficClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const AUTH_COOKIE = "admin_dashboard_auth";

type SearchParams = {
  searchParams: Promise<{
    sessionId?: string;
    days?: string;
  }>;
};

export default async function TrafficPage({ searchParams }: SearchParams) {
  const params = await searchParams;
  const passwordEnv = process.env.ADMIN_DASHBOARD_PASSWORD ?? "admin";
  const cookieStore = await cookies();
  const authed = cookieStore.get(AUTH_COOKIE)?.value === "ok";

  const loginAction = async (formData: FormData) => {
    "use server";
    const pwd = formData.get("password")?.toString() ?? "";
    if (pwd !== passwordEnv) {
      return;
    }
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, "ok", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect("/admin/traffic");
  };

  const logoutAction = async () => {
    "use server";
    const store = await cookies();
    store.set(AUTH_COOKIE, "", { path: "/", maxAge: 0 });
    redirect("/admin/traffic");
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
        <div className="w-full max-w-md space-y-6 bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h1 className="text-xl font-semibold text-center">Доступ к аналитике</h1>
          <form action={loginAction} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-sm mb-1 text-slate-200">
                Пароль
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sessionIdFilter = (params.sessionId ?? "").trim() || undefined;
  const days = Number(params.days ?? "7");
  const since = new Date(Date.now() - (Number.isFinite(days) && days > 0 ? days : 7) * 24 * 60 * 60 * 1000);

  const [visits, leads, outbound] = await Promise.all([
    prisma.visit.findMany({
      where: {
        createdAt: { gte: since },
        ...(sessionIdFilter ? { sessionId: { contains: sessionIdFilter } } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.lead.findMany({
      where: {
        createdAt: { gte: since },
        ...(sessionIdFilter ? { sessionId: { contains: sessionIdFilter } } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.outboundClick.findMany({
      where: {
        createdAt: { gte: since },
        ...(sessionIdFilter ? { sessionId: { contains: sessionIdFilter } } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end">
        <form action={logoutAction}>
          <button className="text-sm text-slate-300 hover:text-white underline">Выйти</button>
        </form>
      </div>
      <AdminTrafficClient
        visits={visits}
        leads={leads}
        outbound={outbound}
        sessionIdFilter={sessionIdFilter}
        days={Number.isFinite(days) && days > 0 ? days : 7}
      />
    </div>
  );
}
