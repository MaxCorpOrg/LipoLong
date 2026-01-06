'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function DotNav() {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const pathname = usePathname();
  const setActiveIndex = (next: number) =>
    setActive((prev) => (prev === next ? prev : next));

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".snap-section")
    );
    sectionsRef.current = sections;
    setCount(sections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.dotIndex ?? -1
            );
            if (!Number.isNaN(idx) && idx >= 0) {
              setActiveIndex(idx);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((sec, i) => {
      sec.dataset.dotIndex = String(i);
      observer.observe(sec);
    });

    let frame = 0;
    const handleScrollFallback = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const current = sectionsRef.current;
        const scrollPos = window.scrollY + window.innerHeight / 2;
        for (let i = 0; i < current.length; i++) {
          const sec = current[i];
          const rectTop = sec.getBoundingClientRect().top + window.scrollY;
          const height = sec.clientHeight;
          if (rectTop <= scrollPos && rectTop + height > scrollPos) {
            setActiveIndex(i);
            break;
          }
        }
      });
    };

    handleScrollFallback();
    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollFallback);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [pathname]);

  const scrollTo = (i: number) => {
    setActive(i);
    const node = document.querySelectorAll(".snap-section")[i] as
      | Element
      | undefined;
    node?.scrollIntoView({ behavior: "smooth" });
  };

  const SECTION_LABELS = [
    "Главная",
    "Результаты LipoLong",
    "Как проходит процедура",
    "Контакты LipoLong",
  ];

  return (
    <div
      role="navigation"
      aria-label="Навигация по секциям"
      data-count={count}
      className="dotnav-root hidden md:flex md:flex-col md:gap-3 md:items-center"
    >
      <div aria-live="polite" className="sr-only" role="status">
        {SECTION_LABELS[active] ?? `Секция ${active + 1}`}
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          aria-label={SECTION_LABELS[i] ?? `Секция ${i + 1}`}
          title={SECTION_LABELS[i] ?? `Секция ${i + 1}`}
          className={`dot ${active === i ? "dot--active" : ""}`}
          aria-current={active === i ? "true" : undefined}
        >
          <span
            className={`dot__inner ${
              active === i ? "dot__inner--active" : ""
            }`}
          />
        </button>
      ))}
    </div>
  );
}
