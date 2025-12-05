'use client';
import { useEffect, useState } from "react";

export default function DotNav() {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".snap-section");
      const len = sections.length;
      setCount((prev) => (prev !== len ? len : prev));

      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < len; i++) {
        const sec = sections[i];
        if (!(sec instanceof Element)) continue;
        const rectTop = sec.getBoundingClientRect().top + window.scrollY;
        const height = sec.clientHeight;
        if (rectTop <= scrollPos && rectTop + height > scrollPos) {
          setActive(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    // если секций ещё нет в DOM к моменту монтирования, сделать дополнительную попытку через небольшой таймаут
    const recheckTimer = setTimeout(handleScroll, 200);

    // MutationObserver: если контент загружается динамически — обновляем количество точек (debounced)
    let mutationDebounce: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver(() => {
      if (mutationDebounce) clearTimeout(mutationDebounce);
      mutationDebounce = setTimeout(() => {
        handleScroll();
      }, 140);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(recheckTimer);
      if (mutationDebounce) clearTimeout(mutationDebounce);
      observer.disconnect();
    };
  }, []);

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
    <div role="navigation" aria-label="Навигация по секциям" data-count={count} className="dotnav-root hidden md:flex md:flex-col md:gap-3 md:items-center">
      {/* screen-reader-only live region for announcements */}
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
