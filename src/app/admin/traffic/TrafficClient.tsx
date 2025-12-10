"use client";

import React from "react";
import { type Lead, type OutboundClick, type Visit } from "@prisma/client";

type ClientProps = {
  visits: Visit[];
  leads: Lead[];
  outbound: OutboundClick[];
  sessionIdFilter?: string;
  days: number;
};

function formatDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString("ru-RU");
}

function uniqueSessions(visits: Visit[]) {
  const set = new Set<string>();
  visits.forEach((v) => v.sessionId && set.add(v.sessionId));
  return Array.from(set);
}

export default function AdminTrafficClient({ visits, leads, outbound, sessionIdFilter, days }: ClientProps) {
  const [selectedSession, setSelectedSession] = React.useState<string | undefined>(sessionIdFilter);

  const sessions = uniqueSessions(visits);
  const sessionToShow = selectedSession || sessions[0];

  const visitsForSession = sessionToShow ? visits.filter((v) => v.sessionId === sessionToShow) : [];
  const leadsForSession = sessionToShow ? leads.filter((l) => l.sessionId === sessionToShow) : [];
  const outboundForSession = sessionToShow ? outbound.filter((o) => o.sessionId === sessionToShow) : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Трафик</h1>
            <p className="text-sm text-slate-400">
              Последние события за {days} дн. · {visits.length} визитов, {leads.length} лидов, {outbound.length} кликов наружу
            </p>
          </div>
          <form method="get" className="flex flex-col md:flex-row gap-3">
            <div>
              <label
                htmlFor="filter-session"
                className="block text-xs uppercase tracking-wide text-slate-400 mb-1"
              >
                Session ID
              </label>
              <input
                id="filter-session"
                name="sessionId"
                defaultValue={sessionIdFilter ?? ""}
                className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Полный или часть ID"
              />
            </div>
            <div>
              <label
                htmlFor="filter-days"
                className="block text-xs uppercase tracking-wide text-slate-400 mb-1"
              >
                Дней
              </label>
              <input
                id="filter-days"
                name="days"
                type="number"
                min={1}
                max={90}
                defaultValue={days}
                className="w-24 rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="self-end bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Применить
            </button>
          </form>
        </header>

        <div className="grid gap-4 lg:grid-cols-[260px,1fr] items-start">
          <aside className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-200">Сессии</h2>
              <span className="text-xs text-slate-400">{sessions.length}</span>
            </div>
            <div className="space-y-2 max-h-[60vh] overflow-auto pr-1">
              {sessions.map((s) => {
                const visitCount = visits.filter((v) => v.sessionId === s).length;
                const leadCount = leads.filter((l) => l.sessionId === s).length;
                const outCount = outbound.filter((o) => o.sessionId === s).length;
                const short = s.length > 10 ? `${s.slice(0, 8)}…` : s;
                const active = s === sessionToShow;
                return (
                  <button
                    key={s}
                    onClick={() => setSelectedSession(s)}
                    className={`w-full text-left rounded-lg border px-3 py-2 transition ${
                      active
                        ? "border-cyan-500 bg-cyan-500/10 text-slate-50"
                        : "border-slate-800 bg-slate-900/50 text-slate-200 hover:border-cyan-500/60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Сессия</span>
                      <span className="text-xs text-slate-400">{short}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {visitCount} визитов · {leadCount} лидов · {outCount} внешн.
                    </div>
                  </button>
                );
              })}
              {sessions.length === 0 && <div className="text-sm text-slate-400">Нет данных</div>}
            </div>
          </aside>

          <div className="space-y-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Визиты</h2>
                <span className="text-sm text-slate-400">Показано {visits.length}</span>
              </div>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-900 border-b border-slate-800 text-left">
                    <tr>
                      <th className="px-3 py-2">Дата</th>
                      <th className="px-3 py-2">IP</th>
                      <th className="px-3 py-2">Path</th>
                      <th className="px-3 py-2">Referrer</th>
                      <th className="px-3 py-2">UTM</th>
                      <th className="px-3 py-2">Сессия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.map((v) => (
                      <tr key={v.id} className="border-b border-slate-900 hover:bg-slate-800/60">
                        <td className="px-3 py-2 whitespace-nowrap">{formatDate(v.createdAt)}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{v.ip || "—"}</td>
                        <td className="px-3 py-2">{v.path}</td>
                        <td className="px-3 py-2 truncate max-w-xs">{v.referrer || "—"}</td>
                        <td className="px-3 py-2 text-xs text-slate-300">
                          {v.utmSource || v.utmMedium || v.utmCampaign
                            ? `${v.utmSource || ""} / ${v.utmMedium || ""} / ${v.utmCampaign || ""}`
                            : "—"}
                        </td>
                        <td className="px-3 py-2">
                          {v.sessionId ? (
                            <div className="flex items-center gap-2">
                              <button
                                className="text-cyan-400 hover:text-cyan-300 underline"
                                onClick={() => setSelectedSession(v.sessionId!)}
                              >
                                {v.sessionId.length > 12 ? `${v.sessionId.slice(0, 10)}…` : v.sessionId}
                              </button>
                              <button
                                className="text-xs text-slate-400 hover:text-slate-200"
                                onClick={() => navigator.clipboard?.writeText(v.sessionId!)}
                              >
                                копия
                              </button>
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                    {visits.length === 0 && (
                      <tr>
                        <td className="px-3 py-4 text-center text-slate-400" colSpan={6}>
                          Нет данных
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {sessionToShow && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Сессия: {sessionToShow}</h3>
                    <p className="text-sm text-slate-400">
                      Всего: {visitsForSession.length} визитов · {leadsForSession.length} лидов · {outboundForSession.length} внешних кликов
                    </p>
                  </div>
                  <button
                    className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                    onClick={() => setSelectedSession(undefined)}
                  >
                    Сбросить выбор
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <InfoCard title="Визиты" count={visitsForSession.length}>
                    {visitsForSession.map((v) => (
                      <div key={v.id} className="border-b border-slate-800 py-2 text-sm">
                        <div className="text-slate-200">{v.path}</div>
                        <div className="text-xs text-slate-400">{formatDate(v.createdAt)}</div>
                        <div className="text-xs text-slate-400">{v.referrer || "—"}</div>
                      </div>
                    ))}
                    {visitsForSession.length === 0 && <div className="text-sm text-slate-400">Нет</div>}
                  </InfoCard>
                  <InfoCard title="Leads" count={leadsForSession.length}>
                    {leadsForSession.map((l) => (
                      <div key={l.id} className="border-b border-slate-800 py-2 text-sm">
                        <div className="text-slate-200">{l.name}</div>
                        <div className="text-xs text-slate-400">{formatDate(l.createdAt)}</div>
                        <div className="text-xs text-slate-400">
                          {l.email} {l.phone ? `• ${l.phone}` : ""}
                        </div>
                        <div className="text-xs text-slate-300 break-words">{l.message || "—"}</div>
                      </div>
                    ))}
                    {leadsForSession.length === 0 && <div className="text-sm text-slate-400">Нет</div>}
                  </InfoCard>
                  <InfoCard title="Outbound" count={outboundForSession.length}>
                    {outboundForSession.map((o) => (
                      <div key={o.id} className="border-b border-slate-800 py-2 text-sm">
                        <div className="text-slate-200 break-words">{o.toUrl}</div>
                        <div className="text-xs text-slate-400">{formatDate(o.createdAt)}</div>
                        <div className="text-xs text-slate-400">{o.fromPath || "—"}</div>
                      </div>
                    ))}
                    {outboundForSession.length === 0 && <div className="text-sm text-slate-400">Нет</div>}
                  </InfoCard>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs text-slate-400">Всего {count}</span>
      </div>
      <div className="max-h-80 overflow-auto pr-1">{children}</div>
    </div>
  );
}
