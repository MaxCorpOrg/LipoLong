"use client";

import React, { useEffect, useRef, useState } from "react";
import ResultsSlider from "./ResultsSlider";
import Image from "next/image";

/* ------------------------------
   DUST POINTS — БЕЗ Math.random
------------------------------ */

type DustPoint = { top: string; left: string; delay: string };

const DUST_POINTS: DustPoint[] = [
  { top: "8%", left: "10%", delay: "0s" },
  { top: "18%", left: "32%", delay: "1.2s" },
  { top: "26%", left: "70%", delay: "2.8s" },
  { top: "40%", left: "15%", delay: "0.9s" },
  { top: "52%", left: "45%", delay: "3.6s" },
  { top: "64%", left: "78%", delay: "1.8s" },
  { top: "72%", left: "22%", delay: "4.5s" },
  { top: "86%", left: "60%", delay: "2.1s" },
  { top: "12%", left: "82%", delay: "3.1s" },
  { top: "35%", left: "55%", delay: "0.4s" },
  { top: "58%", left: "5%", delay: "2.9s" },
  { top: "68%", left: "38%", delay: "1.5s" },
  { top: "78%", left: "90%", delay: "4.0s" },
  { top: "5%", left: "55%", delay: "0.7s" },
  { top: "28%", left: "5%", delay: "2.2s" },
  { top: "48%", left: "90%", delay: "3.8s" },
  { top: "88%", left: "8%", delay: "1.1s" },
  { top: "92%", left: "40%", delay: "2.6s" },
];

export default function Home() {
  /* ------------------------------
      АНИМАЦИЯ ШАГОВ (СЕКЦИЯ 3)
  ------------------------------ */

  type StepRef = HTMLDivElement | null;

  const stepRefs = useRef<StepRef[]>([]);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute("data-step-index");
          if (!indexAttr) return;
          const index = Number(indexAttr);
          if (entry.isIntersecting && !Number.isNaN(index)) {
            setVisibleSteps((prev) => {
              if (prev[index]) return prev; // уже анимирован
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ------------------------------ */

  const contactsRef = useRef<HTMLElement | null>(null);
  const [contactsVisible, setContactsVisible] = useState(false);

  useEffect(() => {
    const el = contactsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setContactsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ============================
          СЕКЦИЯ 1 — HERO LIPOLONG
      ============================ */}
      <section className="snap-section hero-liquid">
        <div className="hero-liquid-bg">
          <div className="hero-liquid-blob hero-liquid-blob--1" />
          <div className="hero-liquid-blob hero-liquid-blob--2" />
          <div className="hero-liquid-blob hero-liquid-blob--3" />
          <div className="hero-liquid-blob hero-liquid-blob--4" />
          <div className="hero-liquid-blob hero-liquid-blob--5" />
        </div>
        {/* ПЫЛЬ в HERO */}
        <div className="dust-layer section-dust" aria-hidden="true">
          {DUST_POINTS.map((p, i) => (
            <div
              key={i}
              className="dust-particle"
              style={{ top: p.top, left: p.left, animationDelay: p.delay }}
            />
          ))}
        </div>

        <div className="hero-content container mx-auto px-6 text-center relative z-[1]">
          {/* ЛОГОТИП КАК БОЛЬШОЙ ЗАГОЛОВОК */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="hero-logo-wrap max-w-[420px] w-full">
              <Image
              src="/Logo.png"
              alt="LipoLong"
              width={420}
              height={120}
              className="hero-logo-image"
              sizes="(max-width: 640px) 82vw, 420px"
              priority
            />
          </div>
        </div>

          {/* Текстовый заголовок оставляем как подзаголовок */}
          <h1 className="hero-title text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">
            Инновационный метод
            <br />
            <span className="text-cyan-300">контурной коррекции тела</span>
          </h1>

          <p className="text-lg md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Безоперационная липомодификация с быстрым эффектом.
            <br />
            Современная процедура для безопасного изменения контуров тела.
          </p>

          {/* КНОПКИ HERO — "Подробнее" по центру, "Чат" справа */}
          <div className="hero-buttons-row">
            {/* Слот слева — кнопка "Записаться" */}
            <div className="hero-btn-slot hero-btn-slot--left">
              <a
                href="/order"
                role="button"
                aria-label="Записаться на процедуру LipoLong"
                className="btn-hero btn-hero--primary"
                style={{ width: "5cm", height: "5vh", color: "#ffffff" }}
              >
                <span className="btn-hero-icon" aria-hidden="true">
                  {/* SVG иконка "календарь + галочка" */}
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
                    {/* верхние "ушки" календаря */}
                    <path d="M8 3v3.5" />
                    <path d="M16 3v3.5" />
                    {/* рамка календаря */}
                    <rect x="3.2" y="5.5" width="17.6" height="15.3" rx="2.4" />
                    {/* горизонталь под шапкой */}
                    <path d="M3.2 10h17.6" />
                    {/* галочка записи */}
                    <path d="M9 14.5l2 2.1L15.5 12" />
                  </svg>
                </span>
                <span>Записаться</span>
              </a>
            </div>
            {/* Слот центра — кнопка "Подробнее" */}
            <div className="hero-btn-slot hero-btn-slot--center">
              <a
                href="#s2"
                role="button"
                aria-label="Подробнее о процедуре LipoLong"
                className="btn-hero btn-hero--secondary"
                // ЖЁСТКАЯ геометрия: физический размер кнопки
                style={{ width: "5cm", height: "5vh" }}
              >
                Подробнее ↓
              </a>
            </div>

            {/* Слот справа — кнопка "Чат" */}
            <div className="hero-btn-slot hero-btn-slot--right">
              <a
                href="https://t.me/Zhirotop_Shop"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="Открыть общий чат LipoLong в Telegram"
                className="btn-hero btn-hero--primary"
                // Та же геометрия — чтобы кнопки были одинаковые
                style={{ width: "5cm", height: "5vh", color: "#ffffff" }}
              >
                <span className="btn-hero-icon" aria-hidden="true">
                  {/* SVG иконка чата. Используем stroke=currentColor, иконка возьмёт цвет из .btn-hero-icon */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a2 2 0 0 1 2-2h14a4 4 0 0 1 4 4z" />
                  </svg>
                </span>
                <span>Общий чат</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          СЕКЦИЯ 2 — СЛАЙДЕР РЕЗУЛЬТАТОВ
      ============================ */}
      <section
        id="s2"
        className="snap-section text-[#e8ffff] s2-no-scroll"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, #051418 0%, #030b0d 40%, #000607 100%)",
        }}
      >
        {/* ПЫЛЬ в S2 */}
        <div className="dust-layer section-dust" aria-hidden="true">
          {DUST_POINTS.map((p, i) => (
            <div key={i} className="dust-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
          ))}
        </div>
        <div className="s2-shell w-full max-w-[1600px] mx-auto px-4 md:px-10">
          <div className="s2-head">
            <h2 className="s2-title text-3xl md:text-5xl font-extrabold text-cyan-200">
              Результаты LipoLong
            </h2>

            <p className="s2-sub text-lg md:text-xl opacity-90 max-w-2xl text-cyan-100">
              Посмотри, как меняются зоны после процедуры. Слайды листаются автоматически, но ты всегда можешь переключить их вручную.
            </p>
          </div>

          <ResultsSlider />
        </div>
      </section>

      {/* ============================
          СЕКЦИЯ 3 — КАК ПРОХОДИТ ПРОЦЕДУРА
      ============================ */}
      <section
        id="s3"
        className="snap-section text-[#e8ffff] relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 10% 0%, #020617 0%, #020617 45%, #000000 100%)",
        }}
      >
        {/* фоновые неоновые пятна */}
        <div className="procedure-liquid-bg">
          <div className="procedure-blob procedure-blob--1" />
          <div className="procedure-blob procedure-blob--2" />
          <div className="procedure-blob procedure-blob--3" />
        </div>
        {/* ПЫЛЬ в S3 */}
        <div className="dust-layer section-dust" aria-hidden="true">
          {DUST_POINTS.map((p, i) => (
            <div key={i} className="dust-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
          ))}
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-[1]">
          <div className="text-center mb-10 md:mb-14 procedure-heading">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-cyan-200">
              Как проходит процедура LipoLong
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-cyan-100">
              Всё просто: консультация, разметка зон, инъекции препарата и
              наблюдение результата в течение 7–10&nbsp;дней. Курс и объём
              подбирает специалист индивидуально.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Шаг 1 */}
            <div
              ref={(el) => {
                stepRefs.current[0] = el;
              }}
              data-step-index="0"
              className={`procedure-step p-6 md:p-7 procedure-fade procedure-delay-1 ${
                visibleSteps[0] ? "visible" : ""
              }`}
            >
              <div className="mb-4 flex justify-center">
                <svg
                  className="text-cyan-300/80"
                  style={{ width: "1cm", height: "1cm" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="3.2" />
                  <path d="M5 20c1.2-3 3.4-4.8 7-4.8s5.8 1.8 7 4.8" />
                </svg>
              </div>
              <div className="text-xs uppercase tracking-[0.22em] text-cyan-300 mb-3">
                Шаг 1
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Консультация и план
              </h3>
              <p className="text-sm md:text-base opacity-90">
                Врач собирает анамнез, исключает противопоказания и вместе с
                тобой определяет зоны коррекции и ожидаемый результат.
              </p>
            </div>

            {/* Шаг 2 */}
            <div
              ref={(el) => {
                stepRefs.current[1] = el;
              }}
              data-step-index="1"
              className={`procedure-step p-6 md:p-7 procedure-fade procedure-delay-2 ${
                visibleSteps[1] ? "visible" : ""
              }`}
            >
              <div className="mb-4 flex justify-center">
                <svg
                  className="text-cyan-300/80"
                  style={{ width: "1cm", height: "1cm" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="5" width="16" height="12" rx="2.5" />
                  <path d="M4 10h16" />
                  <path d="M9 15h2.5" />
                </svg>
              </div>

              <div className="text-xs uppercase tracking-[0.22em] text-cyan-300 mb-3">
                Шаг 2
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Подготовка и разметка
              </h3>
              <p className="text-sm md:text-base opacity-90">
                Кожа обрабатывается антисептиком, при необходимости наносится
                анестезирующий крем, косметолог размечает контуры введения
                LipoLong.
              </p>
            </div>

            {/* Шаг 3 */}
            <div
              ref={(el) => {
                stepRefs.current[2] = el;
              }}
              data-step-index="2"
              className={`procedure-step p-6 md:p-7 procedure-fade procedure-delay-3 ${
                visibleSteps[2] ? "visible" : ""
              }`}
            >
              <div className="mb-4 flex justify-center">
                <svg
                  className="text-cyan-300/80"
                  style={{ width: "1cm", height: "1cm" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 19l4-4" />
                  <path d="M11 13l6-6" />
                  <rect x="13" y="3" width="6" height="4" rx="1.2" />
                  <rect x="3" y="15" width="6" height="4" rx="1.2" />
                </svg>
              </div>

              <div className="text-xs uppercase tracking-[0.22em] text-cyan-300 mb-3">
                Шаг 3
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Инъекционный этап
              </h3>
              <p className="text-sm md:text-base opacity-90">
                Препарат вводится точечно в жировую ткань. Процедура обычно
                занимает 20–40&nbsp;минут и переносится комфортно.
              </p>
            </div>

            {/* Шаг 4 */}
            <div
              ref={(el) => {
                stepRefs.current[3] = el;
              }}
              data-step-index="3"
              className={`procedure-step p-6 md:p-7 procedure-fade procedure-delay-4 ${
                visibleSteps[3] ? "visible" : ""
              }`}
            >
              <div className="mb-4 flex justify-center">
                <svg
                  className="text-cyan-300/80"
                  style={{ width: "1cm", height: "1cm" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v4" />
                  <path d="M7 7h10" />
                  <rect x="5" y="7" width="14" height="11" rx="2" />
                  <path d="M9 13.5l2 2l4-4" />
                </svg>
              </div>

              <div className="text-xs uppercase tracking-[0.22em] text-cyan-300 mb-3">
                Шаг 4
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Восстановление и результат
              </h3>
              <p className="text-sm md:text-base opacity-90">
                Первые изменения обычно заметны через 7–10&nbsp;дней, курс
                состоит из нескольких сеансов, которые подбирает специалист.
              </p>
            </div>
          </div>

          <p className="mt-10 text-sm md:text-base opacity-70 max-w-3xl mx-auto text-center">
            LipoLong работает с жировыми клетками деликатно, не повреждая ткани
            и сохраняя комфортный период восстановления.
          </p>
        </div>
      </section>

            {/* ================================
                СЕКЦИЯ 4 — КОНТАКТЫ LIPOLONG
            ================================ */}
            <section id="s4" className="snap-section contacts-section px-4 md:px-0 s4-no-scroll" ref={contactsRef}>
              {/* НЕОН ФОН */}
              <div className="contacts-glow" />
              {/* ПЫЛЬ в S4 */}
              <div className="dust-layer section-dust" aria-hidden="true">
                {DUST_POINTS.map((p, i) => (
                  <div key={i} className="dust-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
                ))}
              </div>
              {/* local dust-layer removed to avoid duplicate particles; global dust-layer displays particles site-wide */}

              <div className={`${contactsVisible ? "contacts-animated" : ""} w-full max-w-6xl mx-auto`}>
                <div className="s4-shell">
                  <div className="s4-head text-center">
                    <h2 className="s4-title text-3xl md:text-5xl font-extrabold text-cyan-200">Запись на процедуру LipoLong</h2>
                    <p className="s4-sub text-lg md:text-xl opacity-90 text-cyan-100">
                      Выберите удобный способ связи — оставьте заявку через форму или оформите покупку напрямую. Мы поможем подобрать время и ответим на вопросы.
                    </p>
                  </div>

                  <div className="s4-grid">
                    <div className="s4-visual-card glass-card">
                      <div className="s4-pack-frame">
                        <div className="pack-animated-wrap">
                          <Image
                            src="/images/pack-placeholder.png"
                            alt="Упаковка LipoLong"
                            width={520}
                            height={520}
                            className="s4-pack-image"
                            priority
                          />
                        </div>
                      </div>
                      <div className="s4-pack-content">
                        <p className="s4-eyebrow">LipoLong — инновационный липомодулятор</p>
                        <h3 className="s4-pack-title">Контур тела под контролем</h3>
                        <p className="s4-pack-text">
                          Локально уменьшает жировые отложения, корректирует контуры тела и помогает поддерживать результат без продолжительной реабилитации.
                        </p>
                        <ul className="s4-pack-list">
                          <li>Безопасный состав: гиалуронат натрия + липолитики</li>
                          <li>Короткая процедура и быстрый возврат к режиму</li>
                          <li>Подходит для живота, боков, бедер и рук</li>
                        </ul>
                      </div>
                      <dl className="s4-pack-meta">
                        <div>
                          <dt>Форма выпуска</dt>
                          <dd>Ампула 8 мл</dd>
                        </div>
                        <div>
                          <dt>Условия хранения</dt>
                          <dd>При t° 2‑25°С, защищать от света</dd>
                        </div>
                      </dl>
                      <div className="s4-actions">
                        <a
                          href="/order"
                          role="button"
                          className="btn-buy-primary"
                          style={{ padding: "1rem 2rem", fontSize: "1.05rem" }}
                        >
                          Купить LipoLong
                        </a>
                      </div>
                    </div>

                    <div className="glass-card p-6 md:p-10 w-full s4-form-card">
                      <div className="s4-form-head">
                        <p className="s4-pill s4-pill--ghost">Быстрая запись</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-cyan-100">Оставьте свои контакты</h3>
                        <p className="text-sm md:text-base text-cyan-100/80">
                          Мы уточним, какая зона интересует, подтвердим стоимость и согласуем время консультации.
                        </p>
                      </div>
                      <div className="s4-form-fields">
                        <label className="s4-field">
                          <span>Как к вам обращаться?</span>
                          <input type="text" className="glass-input" placeholder="Например, Анна" />
                        </label>
                        <label className="s4-field">
                          <span>Телефон для связи</span>
                          <input type="tel" className="glass-input" placeholder="+7 (___) ___-__-__" />
                        </label>
                        <label className="s4-field s4-field--textarea">
                          <span>Комментарий или удобное время</span>
                          <textarea className="glass-input" style={{ height: "110px", borderRadius: "1rem" }} placeholder="Опишите желаемую зону и формат консультации." />
                        </label>
                        <button className="glass-submit">
                          Отправить заявку
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </section>
      </main>
    );
}
