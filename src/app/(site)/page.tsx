"use client";

import React, { useEffect, useRef, useState } from "react";
import ResultsSlider from "../ResultsSlider";
import Image from "next/image";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadError, setLeadError] = useState("");
  const [leadStartedAt, setLeadStartedAt] = useState(() => Date.now().toString());

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Показываем плавающие кнопки, когда секция hero почти ушла из вьюпорта
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileCta(entry.intersectionRatio < 0.25);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    observer.observe(hero);
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

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadStatus("loading");
    setLeadError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: (formData.get("name") ?? "").toString(),
      email: (formData.get("email") ?? "").toString(),
      phone: (formData.get("phone") ?? "").toString(),
      message: (formData.get("message") ?? "").toString(),
      website: (formData.get("website") ?? "").toString(),
      startedAt: (formData.get("startedAt") ?? leadStartedAt).toString(),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Не удалось отправить. Попробуйте ещё раз.");
      }

      setLeadStatus("success");
      form.reset();
      setLeadStartedAt(Date.now().toString());
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Не удалось отправить. Попробуйте ещё раз.";
      console.error(err);
      setLeadError(message);
      setLeadStatus("error");
    }
  };

  return (
    <main>
      {/* ============================
          СЕКЦИЯ 1 — HERO LIPOLONG
      ============================ */}
      <section
        className="snap-section hero-liquid photo-scroll-bg"
        ref={heroRef}
      >
        <div className="hero-content container mx-auto px-6 text-center relative z-[1]">
          {/* ЛОГОТИП КАК БОЛЬШОЙ ЗАГОЛОВОК */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="hero-logo-wrap">
              <Image
                src="/Logo.png"
                alt="LipoLong"
                width={853}
                height={645}
                className="hero-logo-image"
                priority
              />
            </div>
          </div>

          {/* Текстовый заголовок оставляем как подзаголовок */}
          <h1 className="hero-title text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight text-cyan-200">
            Инновационный метод
            <br />
            <span className="text-cyan-200">контурной коррекции тела</span>
          </h1>

          <p className="hero-lead text-lg md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Безоперационная липомодификация с быстрым эффектом.
            <br />
            Современная процедура для безопасного изменения{" "}
            <span className="hero-lead-nowrap">контуров тела.</span>
          </p>

          {/* КНОПКИ HERO — "Сотрудничество" по центру, "Чат" справа */}
          <div className="hero-buttons-row">
            {/* Слот слева — кнопка "Записаться" */}
            <div className="hero-btn-slot hero-btn-slot--left">
              <a
                href="/order"
                role="button"
                aria-label="Записаться на процедуру LipoLong"
                className="btn-hero btn-hero--primary"
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
            {/* Слот центра — кнопка "Сотрудничество" */}
            <div className="hero-btn-slot hero-btn-slot--center">
              <a
                href="#s5-coop"
                role="button"
                aria-label="Перейти к сотрудничеству"
                className="btn-hero btn-hero--secondary"
              >
                Сотрудничество
              </a>
            </div>

            {/* Слот справа — кнопка "Чат" */}
            <div className="hero-btn-slot hero-btn-slot--right">
              <a
                href="https://t.me/Zhirotop_Shop"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="Открыть чат LipoLong в Telegram"
                className="btn-hero btn-hero--primary"
              >
                <span className="btn-hero-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                    className="btn-hero-icon-svg btn-hero-icon-svg--tg"
                  >
                    <path d="M22 4.3c.4-1.4-.7-2-2-1.5L4.3 8.9c-1.4.5-1.4 1.6-.2 2l3.9 1.2 1.5 4.6c.2.7 1 .9 1.5.4l2.1-2 3.9 2.9c.6.4 1.3.1 1.5-.6L22 4.3zm-13.4 7.5 8.4-5.2-6.3 6-.2 2.7-1-3.2-3.4-1.1 2.5-0.9z" />
                  </svg>
                </span>
                <span>Наш чат в ТГ</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          СЕКЦИЯ 2 — КОНТАКТЫ LIPOLONG
      ================================ */}
      <section
        id="s2"
        className="snap-section contacts-section px-4 md:px-0 s4-no-scroll photo-scroll-bg"
        ref={contactsRef}
      >
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
                      src="/images/pack-placeholder.webp"
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
                    <dd>
                      В упаковке
                      <br />
                      2 флакона по 4 мл.
                    </dd>
                  </div>
                  <div>
                    <dt>Условия хранения</dt>
                    <dd>
                      При t° 2‑25°С,
                      <br />
                      защищать от света
                    </dd>
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
                <form className="s4-form-fields" onSubmit={handleLeadSubmit}>
                  <label className="s4-field" htmlFor="lead-name">
                    <span>Как к вам обращаться?</span>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      className="glass-input"
                      placeholder="Например, Анна"
                      autoComplete="name"
                    />
                  </label>
                  <label className="s4-field" htmlFor="lead-email">
                    <span>Email</span>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      className="glass-input"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </label>
                  <label className="s4-field" htmlFor="lead-phone">
                    <span>Телефон для связи</span>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      className="glass-input"
                      placeholder="+7 (___) ___-__-__"
                      autoComplete="tel"
                    />
                  </label>
                  <label className="s4-field s4-field--textarea" htmlFor="lead-message">
                    <span>Комментарий или удобное время</span>
                    <textarea
                      id="lead-message"
                      name="message"
                      className="glass-input"
                      style={{ height: "110px", borderRadius: "1rem" }}
                      placeholder="Опишите желаемую зону и формат консультации."
                    />
                  </label>
                  <div style={{ display: "none" }} aria-hidden="true">
                    <label htmlFor="lead-website">Ваш сайт</label>
                    <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
                    <input type="hidden" name="startedAt" value={leadStartedAt} readOnly />
                  </div>
                  <button className="glass-submit" type="submit" disabled={leadStatus === "loading"}>
                    {leadStatus === "loading" ? "Отправка..." : "Отправить заявку"}
                  </button>
                  {leadStatus === "success" && (
                    <span className="text-sm text-cyan-300 text-center">
                      Спасибо! Мы свяжемся с вами в ближайшее время.
                    </span>
                  )}
                  {leadStatus === "error" && (
                    <span className="text-sm text-rose-400 text-center">
                      {leadError || "Не удалось отправить. Попробуйте ещё раз."}
                    </span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          СЕКЦИЯ 3 — СЛАЙДЕР РЕЗУЛЬТАТОВ
      ============================ */}
      <section
        id="s3"
        className="snap-section text-[#e8ffff] s2-no-scroll photo-scroll-bg results-section"
      >
        <div className="s2-shell w-full max-w-[1600px] mx-auto px-4 md:px-10">
          <div className="s2-head">
            <h2 className="s2-title text-3xl md:text-5xl font-extrabold text-cyan-200">
              Результаты LipoLong
            </h2>

            <p className="s2-sub text-lg md:text-xl opacity-90 max-w-4xl text-cyan-100">
              Посмотри, как меняются зоны после процедуры.
              <br className="s2-sub-break" />
              <span className="s2-sub-nowrap">
                Слайды листаются автоматически, но ты всегда можешь переключить их вручную.
              </span>
            </p>
          </div>

          <ResultsSlider />
        </div>
      </section>
      {/* Мобильная плавающая кнопка CTA */}
      <div className={`mobile-cta-bar md:hidden ${showMobileCta ? "mobile-cta-bar--visible" : ""}`} aria-hidden={!showMobileCta}>
        <a
          href="/order"
          className="mobile-cta-btn primary"
          aria-label="Записаться на процедуру LipoLong"
        >
          Записаться
        </a>
        <a
          href="#s3"
          className="mobile-cta-btn ghost"
          aria-label="Смотреть результаты LipoLong"
        >
          Результаты
        </a>
      </div>
    </main>
  );
}
