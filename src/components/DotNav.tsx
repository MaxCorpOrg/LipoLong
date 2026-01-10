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

    let frame = 0;
    const updateActive = () => {
      const current = sectionsRef.current;
      if (!current.length) return;
      const viewportCenter = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      current.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = i;
        }
      });
      setActiveIndex(bestIndex);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, { capture: true } as AddEventListenerOptions);
      window.removeEventListener("resize", handleScroll);
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
    "Запись на процедуру",
    "Результаты LipoLong",
    "Контакты",
  ];
  const showBack = count > 0 && active >= count - 1;

  return (
    <>
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
        {showBack ? (
          <button
            type="button"
            onClick={() => scrollTo(0)}
            aria-label="Вернуться на главную"
            title="Вернуться на главную"
            className="dotnav-back"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M12 5l-6 6h4v8h4v-8h4z" fill="currentColor" />
            </svg>
          </button>
        ) : null}
      </div>
      {showBack ? (
        <button
          type="button"
          onClick={() => scrollTo(0)}
          aria-label="Вернуться на главную"
          title="Вернуться на главную"
          className="dotnav-back dotnav-back--mobile md:hidden"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M12 5l-6 6h4v8h4v-8h4z" fill="currentColor" />
          </svg>
        </button>
      ) : null}
    </>
  );
}
