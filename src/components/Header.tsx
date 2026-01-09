"use client";

import Link from "next/link";
import { useState } from "react";

import OutboundLink from "@/components/OutboundLink";

const phone = {
  href: "tel:+79042440444",
  label: "Позвонить в LipoLong +7 (904) 244-04-44",
  className: "header-icon-btn header-icon-btn--phone",
  icon: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
    >
      <path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.7 11.7 0 0 0 3.7 1.2 1 1 0 0 1 .9 1v3.5a1 1 0 0 1-1 1A17.9 17.9 0 0 1 4 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 .9 11.7 11.7 0 0 0 1.2 3.7 1 1 0 0 1-.24 1l-2.2 2.2z" />
    </svg>
  ),
};

const whatsapp = {
  href: "https://wa.me/79042440444",
  label: "Написать в WhatsApp LipoLong",
  className: "header-icon-btn header-icon-btn--wa",
  icon: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
    >
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.5 1.33 5.04L2 22l5.11-1.32A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.82 14.83c-.25.7-1.47 1.34-2.04 1.43-.52.08-1.18.12-3.75-.79-3.29-1.19-5.43-4.09-5.59-4.3-.16-.21-1.33-1.77-1.33-3.38 0-1.61.84-2.4 1.14-2.73.3-.33.66-.41.88-.41.22 0 .44 0 .64.01.2.01.47-.08.73.56.26.64.89 2.21.97 2.37.08.16.13.35.03.56-.1.21-.15.35-.3.54-.15.19-.32.42-.46.56-.15.15-.3.31-.13.6.17.29.75 1.24 1.6 2.01 1.1 1 2.03 1.3 2.32 1.45.29.15.46.12.63-.07.17-.19.73-.85.93-1.14.2-.29.4-.24.67-.14.27.1 1.7.8 1.99.94.29.14.49.21.56.33.07.12.07.69-.18 1.39z" />
    </svg>
  ),
};

const telegram = {
  href: "https://t.me/Vorgesar",
  label: "Открыть Telegram LipoLong (@Vorgesar)",
  className: "header-icon-btn header-icon-btn--tg",
  icon: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
    >
      <path d="M21.8 4.2c.5-1.5-.5-2.5-2-2L4.1 8c-1.7.6-1.7 1.9-.3 2.3l4.1 1.3 1.6 4.9c.3.9 1.2 1.1 1.9.4l2.4-2.5 4.4 3.2c.8.5 1.5.2 1.7-.7L21.8 4.2zM8.6 12.2 18.5 6.8l-7.9 7.4-.3 3.4-1.2-3.8-3.7-1.2 3.2-.4z" />
    </svg>
  ),
};

const CONTACTS = [phone, whatsapp, telegram];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-glass">
      <div className="header-shell w-full h-14 sm:h-16 flex items-center justify-between gap-3 relative">
        <Link href="/" aria-label="LipoLong" className="header-brand font-extrabold text-lg sm:text-2xl tracking-tight">
          LipoLong
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="header-menu-btn md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Контакты"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>

          <nav className="hidden md:flex items-center gap-2 sm:gap-3">
            {CONTACTS.map((item) => (
              item.href.startsWith("http") ? (
                <OutboundLink key={item.href} href={item.href} aria-label={item.label} className={item.className}>
                  {item.icon}
                </OutboundLink>
              ) : (
                <a key={item.href} href={item.href} aria-label={item.label} className={item.className}>
                  {item.icon}
                </a>
              )
            ))}
          </nav>
        </div>

        {open ? (
          <div className="header-mobile-drawer md:hidden">
            {CONTACTS.map((item) => (
              item.href.startsWith("http") ? (
                <OutboundLink key={item.href} href={item.href} aria-label={item.label} className={item.className}>
                  {item.icon}
                </OutboundLink>
              ) : (
                <a key={item.href} href={item.href} aria-label={item.label} className={item.className}>
                  {item.icon}
                </a>
              )
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
