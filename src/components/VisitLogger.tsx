"use client";

import { useEffect } from "react";

export default function VisitLogger() {
  useEffect(() => {
    const payload = {
      path: window.location.pathname,
      query: window.location.search,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
    };

    fetch("/api/log-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
