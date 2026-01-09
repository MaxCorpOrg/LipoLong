"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Slide = {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  img: string;
};

const slides: Slide[] = [
  {
    id: 1,
    label: "Живот и бока",
    title: "Ровная линия талии без нависающих зон",
    subtitle: "Минус объём и более плотный контур",
    description: "Результат получен в 2 этапа за 2 недели. Алина.",
    img: "/slides/s3-1.webp",
  },
  {
    id: 2,
    label: "Живот, бёдра и ягодицы",
    title: "Минус объём в проблемных зонах",
    subtitle: "Более подтянутый силуэт без резких переходов",
    description: "Результат получен в 2 этапа за 2 недели. Юлия.",
    img: "/slides/s3-2.webp",
  },
  {
    id: 3,
    label: "Живот и ягодицы",
    title: "Минус 8 см за 8 дней",
    subtitle: "Более ровный контур и заметное уменьшение объёма",
    description: "Результат за 8 дней. Марина.",
    img: "/slides/s3-3.webp",
  },
  {
    id: 4,
    label: "Марина Карасёва",
    title: "Меньше чем за месяц ушли «ушки» на бёдрах",
    subtitle: "Ноги стали заметно стройнее",
    description: "Кожа быстро подтянулась и стала гладкой. Результат реально порадовал.",
    img: "/slides/s3-4.webp",
  },
  {
    id: 5,
    label: "Живот и бёдра",
    title: "Заметное уменьшение объёма",
    subtitle: "Более ровный и подтянутый контур",
    description: "Результат после 3 процедур.",
    img: "/slides/s3-5.webp",
  },
];

export default function ResultsSlider() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sliderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.25);
      },
      { threshold: [0.15, 0.25, 0.5] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(id);
  }, [isVisible]);

  const goRelative = (delta: number) => {
    setIndex((prev) => (prev + delta + slides.length) % slides.length);
  };

  const goTo = (i: number) => setIndex(i);

  const current = slides[index];

  return (
    <div ref={sliderRef} className="slider-wrapper mx-auto">
      <div className="slider-frame">
        <button
          type="button"
          className="slider-arrow--neon slider-arrow--left"
          onClick={() => goRelative(-1)}
          aria-label="Предыдущий слайд"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Карточка слайдера */}
        <div
          key={current.id}
          className="slider-card relative w-full text-center mx-auto px-5 md:px-12 py-7 md:py-10"
        >
          {/* Фото */}
          <div className="slider-image flex items-center justify-center overflow-hidden">
            <Image
              src={current.img}
              alt={current.label}
              width={1536}
              height={412}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px"
            />
          </div>

          {/* Тексты */}
          <div className="slider-copy space-y-3 md:space-y-4" aria-live="polite">
            <div className="slider-label text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-200 mb-1 text-center">
              {current.label}
            </div>

            <h3 className="slider-title text-2xl md:text-3xl font-bold text-center">
              {current.title}
            </h3>

            <p className="slider-subtitle text-base md:text-lg text-cyan-100 text-center">
              {current.subtitle}
            </p>

            <p className="slider-description text-base md:text-lg opacity-90 max-w-2xl mx-auto text-center">
              {current.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="slider-arrow--neon slider-arrow--right"
          onClick={() => goRelative(1)}
          aria-label="Следующий слайд"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Точки навигации */}
      <div className="slider-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={`slider-dot ${i === index ? "slider-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Слайд ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
