"use client";

import React from "react";

type OutboundLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  fromPath?: string;
};

export default function OutboundLink({
  href,
  fromPath,
  className,
  children,
  onClick,
  target,
  rel,
  ...rest
}: OutboundLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const payload = {
      href,
      fromPath: fromPath || (typeof window !== "undefined" ? window.location.pathname : undefined),
    };

    // Fire-and-forget: не блокирует переход.
    fetch("/api/log-outbound", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  };

  const finalRel = rel ? rel : "noopener noreferrer";
  const finalTarget = target ?? "_blank";

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      target={finalTarget}
      rel={finalRel}
      {...rest}
    >
      {children}
    </a>
  );
}
