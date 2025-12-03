"use client";

import { useEffect, useState } from "react";
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
    title: "Чёткий контур без «спасательного круга»",
    subtitle: "Минус объём и мягкая талия без шрамов",
    description:
      "LipoLong выводит лишний жир точечно и без травмы: талия подтягивается, кожа остаётся гладкой, а реабилитация не нужна.",
    img: "/stomach_and_sides.png",
  },
  {
    id: 2,
    label: "Ягодицы и бёдра",
    title: "Гладкий рельеф без неровностей",
    subtitle: "Уходят «ушки» и валики",
    description:
      "Методика работает мягко, не травмирует кожу и не требует реабилитации. Остаётся упругий, ровный контур без заломов.",
    img: "/Buttocks_and_thighs.png",
  },
  {
    id: 3,
    label: "Руки и спина",
    title: "Подтянутый силуэт без складок",
    subtitle: "Минус «крылья» и роллы у лопаток",
    description:
      "LipoLong точечно работает с уплотнениями: мышцы становятся рельефнее, а кожа — плотной и гладкой без синяков.",
    img: "/Arms_and_back.png",
  },
];

export default function ResultsSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  const goRelative = (delta: number) => {
    setIndex((prev) => (prev + delta + slides.length) % slides.length);
  };

  const goTo = (i: number) => setIndex(i);

  const current = slides[index];

  return (
    <div className="slider-wrapper mx-auto">
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
          className="slider-card advantage-card relative bg-slate-900/80 rounded-[28px] px-5 md:px-12 py-7 md:py-10 shadow-2xl backdrop-blur w-full text-center mx-auto border border-cyan-200/20"
        >
          {/* Фото */}
          <div className="slider-image flex items-center justify-center overflow-hidden">
            <Image
              src={current.img}
              alt={current.label}
              width={1400}
              height={1800}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              priority
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
