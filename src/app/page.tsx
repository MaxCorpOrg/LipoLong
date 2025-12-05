"use client";

import React, { useEffect, useRef, useState } from "react";
import ResultsSlider from "./ResultsSlider";
import Image from "next/image";

/* ------------------------------
   DUST POINTS вЂ” Р‘Р•Р— Math.random
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
      РђРќРРњРђР¦РРЇ РЁРђР“РћР’ (РЎР•РљР¦РРЇ 3)
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
              if (prev[index]) return prev; // СѓР¶Рµ Р°РЅРёРјРёСЂРѕРІР°РЅ
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
          РЎР•РљР¦РРЇ 1 вЂ” HERO LIPOLONG
      ============================ */}
      <section className="snap-section hero-liquid">
        <div className="hero-liquid-bg">
          <div className="hero-liquid-blob hero-liquid-blob--1" />
          <div className="hero-liquid-blob hero-liquid-blob--2" />
          <div className="hero-liquid-blob hero-liquid-blob--3" />
          <div className="hero-liquid-blob hero-liquid-blob--4" />
          <div className="hero-liquid-blob hero-liquid-blob--5" />
        </div>
        {/* РџР«Р›Р¬ РІ HERO */}
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
          {/* Р›РћР“РћРўРРџ РљРђРљ Р‘РћР›Р¬РЁРћР™ Р—РђР“РћР›РћР’РћРљ */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="hero-logo-wrap max-w-[420px] w-full">
              <Image
              src="/Logo.png"
              alt="LipoLong"
              width={420}
              height={120}
              className="hero-logo-image"
              sizes="(max-width: 640px) 82vw, 420px"
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>
        </div>

          {/* РўРµРєСЃС‚РѕРІС‹Р№ Р·Р°РіРѕР»РѕРІРѕРє РѕСЃС‚Р°РІР»СЏРµРј РєР°Рє РїРѕРґР·Р°РіРѕР»РѕРІРѕРє */}
          <h1 className="hero-title text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">
            РРЅРЅРѕРІР°С†РёРѕРЅРЅС‹Р№ РјРµС‚РѕРґ
            <br />
            <span className="text-cyan-300">РєРѕРЅС‚СѓСЂРЅРѕР№ РєРѕСЂСЂРµРєС†РёРё С‚РµР»Р°</span>
          </h1>

          <p className="text-lg md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Р‘РµР·РѕРїРµСЂР°С†РёРѕРЅРЅР°СЏ Р»РёРїРѕРјРѕРґРёС„РёРєР°С†РёСЏ СЃ Р±С‹СЃС‚СЂС‹Рј СЌС„С„РµРєС‚РѕРј.
            <br />
            РЎРѕРІСЂРµРјРµРЅРЅР°СЏ РїСЂРѕС†РµРґСѓСЂР° РґР»СЏ Р±РµР·РѕРїР°СЃРЅРѕРіРѕ РёР·РјРµРЅРµРЅРёСЏ РєРѕРЅС‚СѓСЂРѕРІ С‚РµР»Р°.
          </p>

          {/* РљРќРћРџРљР HERO вЂ” "РџРѕРґСЂРѕР±РЅРµРµ" РїРѕ С†РµРЅС‚СЂСѓ, "Р§Р°С‚" СЃРїСЂР°РІР° */}
          <div className="hero-buttons-row">
            {/* РЎР»РѕС‚ СЃР»РµРІР° вЂ” РєРЅРѕРїРєР° "Р—Р°РїРёСЃР°С‚СЊСЃСЏ" */}
            <div className="hero-btn-slot hero-btn-slot--left">
              <a
                href="/order"
                role="button"
                aria-label="Р—Р°РїРёСЃР°С‚СЊСЃСЏ РЅР° РїСЂРѕС†РµРґСѓСЂСѓ LipoLong"
                className="btn-hero btn-hero--primary"
                style={{ width: "5cm", height: "5vh", color: "#ffffff" }}
              >
                <span className="btn-hero-icon" aria-hidden="true">
                  {/* SVG РёРєРѕРЅРєР° "РєР°Р»РµРЅРґР°СЂСЊ + РіР°Р»РѕС‡РєР°" */}
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
                    {/* РІРµСЂС…РЅРёРµ "СѓС€РєРё" РєР°Р»РµРЅРґР°СЂСЏ */}
                    <path d="M8 3v3.5" />
                    <path d="M16 3v3.5" />
                    {/* СЂР°РјРєР° РєР°Р»РµРЅРґР°СЂСЏ */}
                    <rect x="3.2" y="5.5" width="17.6" height="15.3" rx="2.4" />
                    {/* РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊ РїРѕРґ С€Р°РїРєРѕР№ */}
                    <path d="M3.2 10h17.6" />
                    {/* РіР°Р»РѕС‡РєР° Р·Р°РїРёСЃРё */}
                    <path d="M9 14.5l2 2.1L15.5 12" />
                  </svg>
                </span>
                <span>Р—Р°РїРёСЃР°С‚СЊСЃСЏ</span>
              </a>
            </div>
            {/* РЎР»РѕС‚ С†РµРЅС‚СЂР° вЂ” РєРЅРѕРїРєР° "РџРѕРґСЂРѕР±РЅРµРµ" */}
            <div className="hero-btn-slot hero-btn-slot--center">
              <a
                href="#s2"
                role="button"
                aria-label="РџРѕРґСЂРѕР±РЅРµРµ Рѕ РїСЂРѕС†РµРґСѓСЂРµ LipoLong"
                className="btn-hero btn-hero--secondary"
                // Р–РЃРЎРўРљРђРЇ РіРµРѕРјРµС‚СЂРёСЏ: С„РёР·РёС‡РµСЃРєРёР№ СЂР°Р·РјРµСЂ РєРЅРѕРїРєРё
                style={{ width: "5cm", height: "5vh" }}
              >
                РџРѕРґСЂРѕР±РЅРµРµ в†“
              </a>
            </div>

            {/* РЎР»РѕС‚ СЃРїСЂР°РІР° вЂ” РєРЅРѕРїРєР° "Р§Р°С‚" */}
            <div className="hero-btn-slot hero-btn-slot--right">
              <a
                href="https://t.me/Zhirotop_Shop"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="РћС‚РєСЂС‹С‚СЊ РѕР±С‰РёР№ С‡Р°С‚ LipoLong РІ Telegram"
                className="btn-hero btn-hero--primary"
                // РўР° Р¶Рµ РіРµРѕРјРµС‚СЂРёСЏ вЂ” С‡С‚РѕР±С‹ РєРЅРѕРїРєРё Р±С‹Р»Рё РѕРґРёРЅР°РєРѕРІС‹Рµ
                style={{ width: "5cm", height: "5vh", color: "#ffffff" }}
              >
                <span className="btn-hero-icon" aria-hidden="true">
                  {/* SVG РёРєРѕРЅРєР° С‡Р°С‚Р°. РСЃРїРѕР»СЊР·СѓРµРј stroke=currentColor, РёРєРѕРЅРєР° РІРѕР·СЊРјС‘С‚ С†РІРµС‚ РёР· .btn-hero-icon */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a2 2 0 0 1 2-2h14a4 4 0 0 1 4 4z" />
                  </svg>
                </span>
                <span>РћР±С‰РёР№ С‡Р°С‚</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          РЎР•РљР¦РРЇ 2 вЂ” РЎР›РђР™Р”Р•Р  Р Р•Р—РЈР›Р¬РўРђРўРћР’
      ============================ */}
      <section
        id="s2"
        className="snap-section text-[#e8ffff] s2-no-scroll"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, #051418 0%, #030b0d 40%, #000607 100%)",
        }}
      >
        {/* РџР«Р›Р¬ РІ S2 */}
        <div className="dust-layer section-dust" aria-hidden="true">
          {DUST_POINTS.map((p, i) => (
            <div key={i} className="dust-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
          ))}
        </div>
        <div className="s2-shell w-full max-w-[1600px] mx-auto px-4 md:px-10">
          <div className="s2-head">
            <h2 className="s2-title text-3xl md:text-5xl font-extrabold text-cyan-200">
              Р РµР·СѓР»СЊС‚Р°С‚С‹ LipoLong
            </h2>

            <p className="s2-sub text-lg md:text-xl opacity-90 max-w-2xl text-cyan-100">
              РџРѕСЃРјРѕС‚СЂРё, РєР°Рє РјРµРЅСЏСЋС‚СЃСЏ Р·РѕРЅС‹ РїРѕСЃР»Рµ РїСЂРѕС†РµРґСѓСЂС‹. РЎР»Р°Р№РґС‹ Р»РёСЃС‚Р°СЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё, РЅРѕ С‚С‹ РІСЃРµРіРґР° РјРѕР¶РµС€СЊ РїРµСЂРµРєР»СЋС‡РёС‚СЊ РёС… РІСЂСѓС‡РЅСѓСЋ.
            </p>
          </div>

          <ResultsSlider />
        </div>
      </section>

      {/* ============================
          РЎР•РљР¦РРЇ 3 вЂ” РљРђРљ РџР РћРҐРћР”РРў РџР РћР¦Р•Р”РЈР Рђ
      ============================ */}
      <section
        id="s3"
        className="snap-section text-[#e8ffff] relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 10% 0%, #020617 0%, #020617 45%, #000000 100%)",
        }}
      >
        {/* С„РѕРЅРѕРІС‹Рµ РЅРµРѕРЅРѕРІС‹Рµ РїСЏС‚РЅР° */}
        <div className="procedure-liquid-bg">
          <div className="procedure-blob procedure-blob--1" />
          <div className="procedure-blob procedure-blob--2" />
          <div className="procedure-blob procedure-blob--3" />
        </div>
        {/* РџР«Р›Р¬ РІ S3 */}
        <div className="dust-layer section-dust" aria-hidden="true">
          {DUST_POINTS.map((p, i) => (
            <div key={i} className="dust-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
          ))}
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-[1]">
          <div className="text-center mb-10 md:mb-14 procedure-heading">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-cyan-200">
              РљР°Рє РїСЂРѕС…РѕРґРёС‚ РїСЂРѕС†РµРґСѓСЂР° LipoLong
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-cyan-100">
              Р’СЃС‘ РїСЂРѕСЃС‚Рѕ: РєРѕРЅСЃСѓР»СЊС‚Р°С†РёСЏ, СЂР°Р·РјРµС‚РєР° Р·РѕРЅ, РёРЅСЉРµРєС†РёРё РїСЂРµРїР°СЂР°С‚Р° Рё
              РЅР°Р±Р»СЋРґРµРЅРёРµ СЂРµР·СѓР»СЊС‚Р°С‚Р° РІ С‚РµС‡РµРЅРёРµ 7вЂ“10&nbsp;РґРЅРµР№. РљСѓСЂСЃ Рё РѕР±СЉС‘Рј
              РїРѕРґР±РёСЂР°РµС‚ СЃРїРµС†РёР°Р»РёСЃС‚ РёРЅРґРёРІРёРґСѓР°Р»СЊРЅРѕ.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* РЁР°Рі 1 */}
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
                РЁР°Рі 1
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                РљРѕРЅСЃСѓР»СЊС‚Р°С†РёСЏ Рё РїР»Р°РЅ
              </h3>
              <p className="text-sm md:text-base opacity-90">
                Р’СЂР°С‡ СЃРѕР±РёСЂР°РµС‚ Р°РЅР°РјРЅРµР·, РёСЃРєР»СЋС‡Р°РµС‚ РїСЂРѕС‚РёРІРѕРїРѕРєР°Р·Р°РЅРёСЏ Рё РІРјРµСЃС‚Рµ СЃ
                С‚РѕР±РѕР№ РѕРїСЂРµРґРµР»СЏРµС‚ Р·РѕРЅС‹ РєРѕСЂСЂРµРєС†РёРё Рё РѕР¶РёРґР°РµРјС‹Р№ СЂРµР·СѓР»СЊС‚Р°С‚.
              </p>
            </div>

            {/* РЁР°Рі 2 */}
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
                РЁР°Рі 2
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                РџРѕРґРіРѕС‚РѕРІРєР° Рё СЂР°Р·РјРµС‚РєР°
              </h3>
              <p className="text-sm md:text-base opacity-90">
                РљРѕР¶Р° РѕР±СЂР°Р±Р°С‚С‹РІР°РµС‚СЃСЏ Р°РЅС‚РёСЃРµРїС‚РёРєРѕРј, РїСЂРё РЅРµРѕР±С…РѕРґРёРјРѕСЃС‚Рё РЅР°РЅРѕСЃРёС‚СЃСЏ
                Р°РЅРµСЃС‚РµР·РёСЂСѓСЋС‰РёР№ РєСЂРµРј, РєРѕСЃРјРµС‚РѕР»РѕРі СЂР°Р·РјРµС‡Р°РµС‚ РєРѕРЅС‚СѓСЂС‹ РІРІРµРґРµРЅРёСЏ
                LipoLong.
              </p>
            </div>

            {/* РЁР°Рі 3 */}
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
                РЁР°Рі 3
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                РРЅСЉРµРєС†РёРѕРЅРЅС‹Р№ СЌС‚Р°Рї
              </h3>
              <p className="text-sm md:text-base opacity-90">
                РџСЂРµРїР°СЂР°С‚ РІРІРѕРґРёС‚СЃСЏ С‚РѕС‡РµС‡РЅРѕ РІ Р¶РёСЂРѕРІСѓСЋ С‚РєР°РЅСЊ. РџСЂРѕС†РµРґСѓСЂР° РѕР±С‹С‡РЅРѕ
                Р·Р°РЅРёРјР°РµС‚ 20вЂ“40&nbsp;РјРёРЅСѓС‚ Рё РїРµСЂРµРЅРѕСЃРёС‚СЃСЏ РєРѕРјС„РѕСЂС‚РЅРѕ.
              </p>
            </div>

            {/* РЁР°Рі 4 */}
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
                РЁР°Рі 4
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Р’РѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРёРµ Рё СЂРµР·СѓР»СЊС‚Р°С‚
              </h3>
              <p className="text-sm md:text-base opacity-90">
                РџРµСЂРІС‹Рµ РёР·РјРµРЅРµРЅРёСЏ РѕР±С‹С‡РЅРѕ Р·Р°РјРµС‚РЅС‹ С‡РµСЂРµР· 7вЂ“10&nbsp;РґРЅРµР№, РєСѓСЂСЃ
                СЃРѕСЃС‚РѕРёС‚ РёР· РЅРµСЃРєРѕР»СЊРєРёС… СЃРµР°РЅСЃРѕРІ, РєРѕС‚РѕСЂС‹Рµ РїРѕРґР±РёСЂР°РµС‚ СЃРїРµС†РёР°Р»РёСЃС‚.
              </p>
            </div>
          </div>

          <p className="mt-10 text-sm md:text-base opacity-70 max-w-3xl mx-auto text-center">
            LipoLong СЂР°Р±РѕС‚Р°РµС‚ СЃ Р¶РёСЂРѕРІС‹РјРё РєР»РµС‚РєР°РјРё РґРµР»РёРєР°С‚РЅРѕ, РЅРµ РїРѕРІСЂРµР¶РґР°СЏ С‚РєР°РЅРё
            Рё СЃРѕС…СЂР°РЅСЏСЏ РєРѕРјС„РѕСЂС‚РЅС‹Р№ РїРµСЂРёРѕРґ РІРѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРёСЏ.
          </p>
        </div>
      </section>

            {/* ================================
                РЎР•РљР¦РРЇ 4 вЂ” РљРћРќРўРђРљРўР« LIPOLONG
            ================================ */}
            <section id="s4" className="snap-section contacts-section px-4 md:px-0 s4-no-scroll" ref={contactsRef}>
              {/* РќР•РћРќ Р¤РћРќ */}
              <div className="contacts-glow" />
              {/* РџР«Р›Р¬ РІ S4 */}
              <div className="dust-layer section-dust" aria-hidden="true">
                {DUST_POINTS.map((p, i) => (
                  <div key={i} className="dust-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
                ))}
              </div>
              {/* local dust-layer removed to avoid duplicate particles; global dust-layer displays particles site-wide */}

              <div className={`${contactsVisible ? "contacts-animated" : ""} w-full max-w-6xl mx-auto`}>
                <div className="s4-shell">
                  <div className="s4-head text-center">
                    <h2 className="s4-title text-3xl md:text-5xl font-extrabold text-cyan-200">Р—Р°РїРёСЃСЊ РЅР° РїСЂРѕС†РµРґСѓСЂСѓ LipoLong</h2>
                    <p className="s4-sub text-lg md:text-xl opacity-90 text-cyan-100">
                      Р’С‹Р±РµСЂРёС‚Рµ СѓРґРѕР±РЅС‹Р№ СЃРїРѕСЃРѕР± СЃРІСЏР·Рё вЂ” РѕСЃС‚Р°РІСЊС‚Рµ Р·Р°СЏРІРєСѓ С‡РµСЂРµР· С„РѕСЂРјСѓ РёР»Рё РѕС„РѕСЂРјРёС‚Рµ РїРѕРєСѓРїРєСѓ РЅР°РїСЂСЏРјСѓСЋ. РњС‹ РїРѕРјРѕР¶РµРј РїРѕРґРѕР±СЂР°С‚СЊ РІСЂРµРјСЏ Рё РѕС‚РІРµС‚РёРј РЅР° РІРѕРїСЂРѕСЃС‹.
                    </p>
                  </div>

                  <div className="s4-grid">
                    <div className="s4-visual-card glass-card">
                      <div className="s4-pack-frame">
                        <div className="pack-animated-wrap">
                          <Image
                            src="/images/pack-placeholder.png"
                            alt="РЈРїР°РєРѕРІРєР° LipoLong"
                            width={520}
                            height={520}
                            className="s4-pack-image"
                            priority
                          />
                        </div>
                      </div>
                      <div className="s4-pack-content">
                        <p className="s4-eyebrow">LipoLong вЂ” РёРЅРЅРѕРІР°С†РёРѕРЅРЅС‹Р№ Р»РёРїРѕРјРѕРґСѓР»СЏС‚РѕСЂ</p>
                        <h3 className="s4-pack-title">РљРѕРЅС‚СѓСЂ С‚РµР»Р° РїРѕРґ РєРѕРЅС‚СЂРѕР»РµРј</h3>
                        <p className="s4-pack-text">
                          Р›РѕРєР°Р»СЊРЅРѕ СѓРјРµРЅСЊС€Р°РµС‚ Р¶РёСЂРѕРІС‹Рµ РѕС‚Р»РѕР¶РµРЅРёСЏ, РєРѕСЂСЂРµРєС‚РёСЂСѓРµС‚ РєРѕРЅС‚СѓСЂС‹ С‚РµР»Р° Рё РїРѕРјРѕРіР°РµС‚ РїРѕРґРґРµСЂР¶РёРІР°С‚СЊ СЂРµР·СѓР»СЊС‚Р°С‚ Р±РµР· РїСЂРѕРґРѕР»Р¶РёС‚РµР»СЊРЅРѕР№ СЂРµР°Р±РёР»РёС‚Р°С†РёРё.
                        </p>
                        <ul className="s4-pack-list">
                          <li>Р‘РµР·РѕРїР°СЃРЅС‹Р№ СЃРѕСЃС‚Р°РІ: РіРёР°Р»СѓСЂРѕРЅР°С‚ РЅР°С‚СЂРёСЏ + Р»РёРїРѕР»РёС‚РёРєРё</li>
                          <li>РљРѕСЂРѕС‚РєР°СЏ РїСЂРѕС†РµРґСѓСЂР° Рё Р±С‹СЃС‚СЂС‹Р№ РІРѕР·РІСЂР°С‚ Рє СЂРµР¶РёРјСѓ</li>
                          <li>РџРѕРґС…РѕРґРёС‚ РґР»СЏ Р¶РёРІРѕС‚Р°, Р±РѕРєРѕРІ, Р±РµРґРµСЂ Рё СЂСѓРє</li>
                        </ul>
                      </div>
                      <dl className="s4-pack-meta">
                        <div>
                          <dt>Р¤РѕСЂРјР° РІС‹РїСѓСЃРєР°</dt>
                          <dd>РђРјРїСѓР»Р° 8 РјР»</dd>
                        </div>
                        <div>
                          <dt>РЈСЃР»РѕРІРёСЏ С…СЂР°РЅРµРЅРёСЏ</dt>
                          <dd>РџСЂРё tВ° 2вЂ‘25В°РЎ, Р·Р°С‰РёС‰Р°С‚СЊ РѕС‚ СЃРІРµС‚Р°</dd>
                        </div>
                      </dl>
                      <div className="s4-actions">
                        <a
                          href="/order"
                          role="button"
                          className="btn-buy-primary"
                          style={{ padding: "1rem 2rem", fontSize: "1.05rem" }}
                        >
                          РљСѓРїРёС‚СЊ LipoLong
                        </a>
                      </div>
                    </div>

                    <div className="glass-card p-6 md:p-10 w-full s4-form-card">
                      <div className="s4-form-head">
                        <p className="s4-pill s4-pill--ghost">Р‘С‹СЃС‚СЂР°СЏ Р·Р°РїРёСЃСЊ</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-cyan-100">РћСЃС‚Р°РІСЊС‚Рµ СЃРІРѕРё РєРѕРЅС‚Р°РєС‚С‹</h3>
                        <p className="text-sm md:text-base text-cyan-100/80">
                          РњС‹ СѓС‚РѕС‡РЅРёРј, РєР°РєР°СЏ Р·РѕРЅР° РёРЅС‚РµСЂРµСЃСѓРµС‚, РїРѕРґС‚РІРµСЂРґРёРј СЃС‚РѕРёРјРѕСЃС‚СЊ Рё СЃРѕРіР»Р°СЃСѓРµРј РІСЂРµРјСЏ РєРѕРЅСЃСѓР»СЊС‚Р°С†РёРё.
                        </p>
                      </div>
                      <div className="s4-form-fields">
                        <label className="s4-field">
                          <span>РљР°Рє Рє РІР°Рј РѕР±СЂР°С‰Р°С‚СЊСЃСЏ?</span>
                          <input id="lead-name" name="lead-name" type="text" className="glass-input" placeholder="РќР°РїСЂРёРјРµСЂ, РђРЅРЅР°" />
                        </label>
                        <label className="s4-field">
                          <span>РўРµР»РµС„РѕРЅ РґР»СЏ СЃРІСЏР·Рё</span>
                          <input id="lead-phone" name="lead-phone" type="tel" className="glass-input" placeholder="+7 (___) ___-__-__" />
                        </label>
                        <label className="s4-field s4-field--textarea">
                          <span>РљРѕРјРјРµРЅС‚Р°СЂРёР№ РёР»Рё СѓРґРѕР±РЅРѕРµ РІСЂРµРјСЏ</span>
                          <textarea id="lead-message" name="lead-message" className="glass-input" style={{ height: "110px", borderRadius: "1rem" }} placeholder="РћРїРёС€РёС‚Рµ Р¶РµР»Р°РµРјСѓСЋ Р·РѕРЅСѓ Рё С„РѕСЂРјР°С‚ РєРѕРЅСЃСѓР»СЊС‚Р°С†РёРё." />
                        </label>
                        <button className="glass-submit">
                          РћС‚РїСЂР°РІРёС‚СЊ Р·Р°СЏРІРєСѓ
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

