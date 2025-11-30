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
    title: "Минус объём уже после 1 процедуры",
    subtitle: "Контур становится более чётким",
    description:
      "LipoLong помогает убрать локальные жировые отложения, когда диета и спорт не дают эффекта.",
    img: "/stomach_and_sides.png",
  },
  {
    id: 2,
    label: "Ягодицы и бёдра",
    title: "Гладкий рельеф без неровностей",
    subtitle: "Меньше «ушки» и валиков",
    description:
      "Методика работает мягко, не травмирует кожу и не требует реабилитации.",
    img: "/Buttocks_and_thighs.png",
  },
  {
    id: 3,
    label: "Руки и спина",
    title: "Уходит объём в сложных зонах",
    subtitle: "Изящные, аккуратные линии",
    description:
      "LipoLong позволяет деликатно скорректировать зоны, где классические методы не помогают.",
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

  const goRelative = (d: number) => {
    setIndex((prev) => (prev + d + slides.length) % slides.length);
  };

  const goTo = (i: number) => setIndex(i);

  const current = slides[index];

  return (
    <div className="slider-wrapper mx-auto">

      {/* СЛАЙД */}
      <div
        key={current.id}
        className="slider-card advantage-card relative bg-slate-900/80 rounded-3xl px-4 md:px-10 py-8 md:py-10 shadow-2xl backdrop-blur w-full text-center mx-auto"
      >
        {/* ФОТО */}
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

        {/* ТЕКСТ */}
        <div>
          <div className="slider-label text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-200 mb-3 text-center">
            {current.label}
          </div>

          <h3 className="slider-title text-2xl md:text-3xl font-bold mb-2 text-center">
            {current.title}
          </h3>

          <p className="slider-subtitle text-base md:text-lg text-cyan-100 mb-3 text-center">
            {current.subtitle}
          </p>

          <p className="slider-description text-base md:text-lg opacity-90 max-w-2xl mx-auto text-center">
            {current.description}
          </p>
        </div>
      </div>

      {/* НАВИГАЦИЯ (СТРЕЛКИ И ТОЧКИ) */}
      <div className="mt-8 flex justify-between items-center gap-4 max-w-[440px] mx-auto">
        <button
          type="button"
          className="slider-arrow--neon"
          onClick={() => goRelative(-1)}
        >
          ←
        </button>

        <div className="flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`slider-dot ${i === index ? "slider-dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="slider-arrow--neon"
          onClick={() => goRelative(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
