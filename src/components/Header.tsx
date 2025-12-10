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
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 3.5L9 4.2c.5.16.88.58 1 1.1l.5 2a1.6 1.6 0 0 1-.46 1.56l-1.2 1.2a11.8 11.8 0 0 0 4.6 4.6l1.2-1.2a1.6 1.6 0 0 1 1.56-.46l2 .5c.52.12.94.5 1.1 1l.7 2.5c.18.68-.16 1.4-.8 1.72A5.4 5.4 0 0 1 16 21C9.95 21 5 16.05 5 10c0-1.3.22-2.55.65-3.72.24-.64 1.01-.98 1.78-.78z" />
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
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 20l1.1-3.2A7 7 0 1 1 12 19a7.3 7.3 0 0 1-3.5-.9z" />
      <path d="M9.5 9.8c.2-.4.3-.6.6-.6h.4c.2 0 .3 0 .4.3l.5 1.2c.1.2.1.3-.1.5l-.3.4c-.1.1 0 .3.1.4l.7.7c.3.3.6.4.8.3l.5-.3c.2-.1.3-.1.5 0l1.1.5c.2.1.3.2.3.4 0 .3-.1.7-.4 1-0.5.4-1 .6-1.6.6-0.7 0-1.3-.2-1.9-.6-.7-.4-1.3-0.9-1.9-1.6-.5-.6-.9-1.2-1.2-1.9-.3-.7-.4-1.3-.4-1.8 0-.5.2-1 .6-1.4z" />
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
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 4 3.8 10.3c-.8.3-.78 1.4.04 1.7L8 13.7l1.2 4.1c.2.8 1.2.99 1.7.35l2.1-2.6 3.5 2.6c.6.44 1.4.1 1.6-.63L22 5.1c.2-.8-.54-1.5-1.3-1.1z" />
    </svg>
  ),
};

const CONTACTS = [phone, whatsapp, telegram];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-glass">
      <div className="w-full max-w-7xl mx-auto h-14 sm:h-16 flex items-center justify-between gap-3 px-3 sm:px-4 md:px-8 relative">
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
