"use client";

import React, { useEffect, useRef, useState } from "react";
import ResultsSlider from "./ResultsSlider";
import Image from "next/image";

/* ------------------------------
   DUST POINTS тАФ ╨С╨Х╨Ч Math.random
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
      ╨Р╨Э╨Ш╨Ь╨Р╨ж╨Ш╨п ╨и╨Р╨У╨Ю╨Т (╨б╨Х╨Ъ╨ж╨Ш╨п 3)
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
              if (prev[index]) return prev; // ╤Г╨╢╨╡ ╨░╨╜╨╕╨╝╨╕╤А╨╛╨▓╨░╨╜
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
          ╨б╨Х╨Ъ╨ж╨Ш╨п 1 тАФ HERO LIPOLONG
      ============================ */}
      <section className="snap-section hero-liquid">
        <div className="hero-liquid-bg">
          <div className="hero-liquid-blob hero-liquid-blob--1" />
          <div className="hero-liquid-blob hero-liquid-blob--2" />
          <div className="hero-liquid-blob hero-liquid-blob--3" />
          <div className="hero-liquid-blob hero-liquid-blob--4" />
          <div className="hero-liquid-blob hero-liquid-blob--5" />
        </div>
        {/* ╨Я╨л╨Ы╨м ╨▓ HERO */}
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
          {/* ╨Ы╨Ю╨У╨Ю╨в╨Ш╨Я ╨Ъ╨Р╨Ъ ╨С╨Ю╨Ы╨м╨и╨Ю╨Щ ╨Ч╨Р╨У╨Ю╨Ы╨Ю╨Т╨Ю╨Ъ */}
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

          {/* ╨в╨╡╨║╤Б╤В╨╛╨▓╤Л╨╣ ╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║ ╨╛╤Б╤В╨░╨▓╨╗╤П╨╡╨╝ ╨║╨░╨║ ╨┐╨╛╨┤╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║ */}
          <h1 className="hero-title text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">
            ╨Ш╨╜╨╜╨╛╨▓╨░╤Ж╨╕╨╛╨╜╨╜╤Л╨╣ ╨╝╨╡╤В╨╛╨┤
            <br />
            <span className="text-cyan-300">╨║╨╛╨╜╤В╤Г╤А╨╜╨╛╨╣ ╨║╨╛╤А╤А╨╡╨║╤Ж╨╕╨╕ ╤В╨╡╨╗╨░</span>
          </h1>

          <p className="text-lg md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            ╨С╨╡╨╖╨╛╨┐╨╡╤А╨░╤Ж╨╕╨╛╨╜╨╜╨░╤П ╨╗╨╕╨┐╨╛╨╝╨╛╨┤╨╕╤Д╨╕╨║╨░╤Ж╨╕╤П ╤Б ╨▒╤Л╤Б╤В╤А╤Л╨╝ ╤Н╤Д╤Д╨╡╨║╤В╨╛╨╝.
            <br />
            ╨б╨╛╨▓╤А╨╡╨╝╨╡╨╜╨╜╨░╤П ╨┐╤А╨╛╤Ж╨╡╨┤╤Г╤А╨░ ╨┤╨╗╤П ╨▒╨╡╨╖╨╛╨┐╨░╤Б╨╜╨╛╨│╨╛ ╨╕╨╖╨╝╨╡╨╜╨╡╨╜╨╕╤П ╨║╨╛╨╜╤В╤Г╤А╨╛╨▓ ╤В╨╡╨╗╨░.
          </p>

          {/* ╨Ъ╨Э╨Ю╨Я╨Ъ╨Ш HERO тАФ "╨Я╨╛╨┤╤А╨╛╨▒╨╜╨╡╨╡" ╨┐╨╛ ╤Ж╨╡╨╜╤В╤А╤Г, "╨з╨░╤В" ╤Б╨┐╤А╨░╨▓╨░ */}
          <div className="hero-buttons-row">
            {/* ╨б╨╗╨╛╤В ╤Б╨╗╨╡╨▓╨░ тАФ ╨║╨╜╨╛╨┐╨║╨░ "╨Ч╨░╨┐╨╕╤Б╨░╤В╤М╤Б╤П" */}
            <div className="hero-btn-slot hero-btn-slot--left">
              <a
                href="/order"
                role="button"
                aria-label="╨Ч╨░╨┐╨╕╤Б╨░╤В╤М╤Б╤П ╨╜╨░ ╨┐╤А╨╛╤Ж╨╡╨┤╤Г╤А╤Г LipoLong"
                className="btn-hero btn-hero--primary"
                style={{ width: "5cm", height: "5vh", color: "#ffffff" }}
              >
                <span className="btn-hero-icon" aria-hidden="true">
                  {/* SVG ╨╕╨║╨╛╨╜╨║╨░ "╨║╨░╨╗╨╡╨╜╨┤╨░╤А╤М + ╨│╨░╨╗╨╛╤З╨║╨░" */}
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
                    {/* ╨▓╨╡╤А╤Е╨╜╨╕╨╡ "╤Г╤И╨║╨╕" ╨║╨░╨╗╨╡╨╜╨┤╨░╤А╤П */}
                    <path d="M8 3v3.5" />
                    <path d="M16 3v3.5" />
                    {/* ╤А╨░╨╝╨║╨░ ╨║╨░╨╗╨╡╨╜╨┤╨░╤А╤П */}
                    <rect x="3.2" y="5.5" width="17.6" height="15.3" rx="2.4" />
                    {/* ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М ╨┐╨╛╨┤ ╤И╨░╨┐╨║╨╛╨╣ */}
                    <path d="M3.2 10h17.6" />
                    {/* ╨│╨░╨╗╨╛╤З╨║╨░ ╨╖╨░╨┐╨╕╤Б╨╕ */}
                    <path d="M9 14.5l2 2.1L15.5 12" />
                  </svg>
                </span>
                <span>╨Ч╨░╨┐╨╕╤Б╨░╤В╤М╤Б╤П</span>
              </a>
            </div>
            {/* ╨б╨╗╨╛╤В ╤Ж╨╡╨╜╤В╤А╨░ тАФ ╨║╨╜╨╛╨┐╨║╨░ "╨Я╨╛╨┤╤А╨╛╨▒╨╜╨╡╨╡" */}
            <div className="hero-btn-slot hero-btn-slot--center">
              <a
                href="#s2"
                role="button"
                aria-label="╨Я╨╛╨┤╤А╨╛╨▒╨╜╨╡╨╡ ╨╛ ╨┐╤А╨╛╤Ж╨╡╨┤╤Г╤А╨╡ LipoLong"
                className="btn-hero btn-hero--secondary"
                // ╨Ц╨Б╨б╨в╨Ъ╨Р╨п ╨│╨╡╨╛╨╝╨╡╤В╤А╨╕╤П: ╤Д╨╕╨╖╨╕╤З╨╡╤Б╨║╨╕╨╣ ╤А╨░╨╖╨╝╨╡╤А ╨║╨╜╨╛╨┐╨║╨╕
                style={{ width: "5cm", height: "5vh" }}
              >
                ╨Я╨╛╨┤╤А╨╛╨▒╨╜╨╡╨╡ тЖУ
              </a>
            </div>

            {/* ╨б╨╗╨╛╤В ╤Б╨┐╤А╨░╨▓╨░ тАФ ╨║╨╜╨╛╨┐╨║╨░ "╨з╨░╤В" */}
            <div className="hero-btn-slot hero-btn-slot--right">
              <a
                href="https://t.me/Zhirotop_Shop"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="╨Ю╤В╨║╤А╤Л╤В╤М ╨╛╨▒╤Й╨╕╨╣ ╤З╨░╤В LipoLong ╨▓ Telegram"
                className="btn-hero btn-hero--primary"
                // ╨в╨░ ╨╢╨╡ ╨│╨╡╨╛╨╝╨╡╤В╤А╨╕╤П тАФ ╤З╤В╨╛╨▒╤Л ╨║╨╜╨╛╨┐╨║╨╕ ╨▒╤Л╨╗╨╕ ╨╛╨┤╨╕╨╜╨░╨║╨╛╨▓╤Л╨╡
                style={{ width: "5cm", height: "5vh", color: "#ffffff" }}
              >
                <span className="btn-hero-icon" aria-hidden="true">
                  {/* SVG ╨╕╨║╨╛╨╜╨║╨░ ╤З╨░╤В╨░. ╨Ш╤Б╨┐╨╛╨╗╤М╨╖╤Г╨╡╨╝ stroke=currentColor, ╨╕╨║╨╛╨╜╨║╨░ ╨▓╨╛╨╖╤М╨╝╤С╤В ╤Ж╨▓╨╡╤В ╨╕╨╖ .btn-hero-icon */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a2 2 0 0 1 2-2h14a4 4 0 0 1 4 4z" />
                  </svg>
                </span>
                <span>╨Ю╨▒╤Й╨╕╨╣ ╤З╨░╤В</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          ╨б╨Х╨Ъ╨ж╨Ш╨п 2 тАФ ╨б╨Ы╨Р╨Щ╨Ф╨Х╨а ╨а╨Х╨Ч╨г╨Ы╨м╨в╨Р╨в╨Ю╨Т
      ============================ */}
      <section
        id="s2"
        className="snap-section text-[#e8ffff] s2-no-scroll"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, #051418 0%, #030b0d 40%, #000607 100%)",
        }}
      >
        {/* ╨Я╨л╨Ы╨м ╨▓ S2 */}
        <div className="dust-layer section-dust" aria-hidden="true">
          {DUST_POINTS.map((p, i) => (
            <div key={i} className="dust-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
          ))}
        </div>
        <div className="s2-shell w-full max-w-[1600px] mx-auto px-4 md:px-10">
          <div className="s2-head">
            <h2 className="s2-title text-3xl md:text-5xl font-extrabold text-cyan-200">
              ╨а╨╡╨╖╤Г╨╗╤М╤В╨░╤В╤Л LipoLong
            </h2>

            <p className="s2-sub text-lg md:text-xl opacity-90 max-w-2xl text-cyan-100">
              ╨Я╨╛╤Б╨╝╨╛╤В╤А╨╕, ╨║╨░╨║ ╨╝╨╡╨╜╤П╤О╤В╤Б╤П ╨╖╨╛╨╜╤Л ╨┐╨╛╤Б╨╗╨╡ ╨┐╤А╨╛╤Ж╨╡╨┤╤Г╤А╤Л. ╨б╨╗╨░╨╣╨┤╤Л ╨╗╨╕╤Б╤В╨░╤О╤В╤Б╤П ╨░╨▓╤В╨╛╨╝╨░╤В╨╕╤З╨╡╤Б╨║╨╕, ╨╜╨╛ ╤В╤Л ╨▓╤Б╨╡╨│╨┤╨░ ╨╝╨╛╨╢╨╡╤И╤М ╨┐╨╡╤А╨╡╨║╨╗╤О╤З╨╕╤В╤М ╨╕╤Е ╨▓╤А╤Г╤З╨╜╤Г╤О.
            </p>
          </div>

          <ResultsSlider />
        </div>
      </section>

      {/* ============================
          ╨б╨Х╨Ъ╨ж╨Ш╨п 3 тАФ ╨Ъ╨Р╨Ъ ╨Я╨а╨Ю╨е╨Ю╨Ф╨Ш╨в ╨Я╨а╨Ю╨ж╨Х╨Ф╨г╨а╨Р
      ============================ */}
      <section
        id="s3"
        className="snap-section text-[#e8ffff] relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 10% 0%, #020617 0%, #020617 45%, #000000 100%)",
        }}
      >
        {/* ╤Д╨╛╨╜╨╛╨▓╤Л╨╡ ╨╜╨╡╨╛╨╜╨╛╨▓╤Л╨╡ ╨┐╤П╤В╨╜╨░ */}
        <div className="procedure-liquid-bg">
          <div className="procedure-blob procedure-blob--1" />
          <div className="procedure-blob procedure-blob--2" />
          <div className="procedure-blob procedure-blob--3" />
        </div>
        {/* ╨Я╨л╨Ы╨м ╨▓ S3 */}
        <div className="dust-layer section-dust" aria-hidden="true">
          {DUST_POINTS.map((p, i) => (
            <div key={i} className="dust-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
          ))}
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-[1]">
          <div className="text-center mb-10 md:mb-14 procedure-heading">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-cyan-200">
              ╨Ъ╨░╨║ ╨┐╤А╨╛╤Е╨╛╨┤╨╕╤В ╨┐╤А╨╛╤Ж╨╡╨┤╤Г╤А╨░ LipoLong
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-cyan-100">
              ╨Т╤Б╤С ╨┐╤А╨╛╤Б╤В╨╛: ╨║╨╛╨╜╤Б╤Г╨╗╤М╤В╨░╤Ж╨╕╤П, ╤А╨░╨╖╨╝╨╡╤В╨║╨░ ╨╖╨╛╨╜, ╨╕╨╜╤К╨╡╨║╤Ж╨╕╨╕ ╨┐╤А╨╡╨┐╨░╤А╨░╤В╨░ ╨╕
              ╨╜╨░╨▒╨╗╤О╨┤╨╡╨╜╨╕╨╡ ╤А╨╡╨╖╤Г╨╗╤М╤В╨░╤В╨░ ╨▓ ╤В╨╡╤З╨╡╨╜╨╕╨╡ 7тАУ10&nbsp;╨┤╨╜╨╡╨╣. ╨Ъ╤Г╤А╤Б ╨╕ ╨╛╨▒╤К╤С╨╝
              ╨┐╨╛╨┤╨▒╨╕╤А╨░╨╡╤В ╤Б╨┐╨╡╤Ж╨╕╨░╨╗╨╕╤Б╤В ╨╕╨╜╨┤╨╕╨▓╨╕╨┤╤Г╨░╨╗╤М╨╜╨╛.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* ╨и╨░╨│ 1 */}
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
                ╨и╨░╨│ 1
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                ╨Ъ╨╛╨╜╤Б╤Г╨╗╤М╤В╨░╤Ж╨╕╤П ╨╕ ╨┐╨╗╨░╨╜
              </h3>
              <p className="text-sm md:text-base opacity-90">
                ╨Т╤А╨░╤З ╤Б╨╛╨▒╨╕╤А╨░╨╡╤В ╨░╨╜╨░╨╝╨╜╨╡╨╖, ╨╕╤Б╨║╨╗╤О╤З╨░╨╡╤В ╨┐╤А╨╛╤В╨╕╨▓╨╛╨┐╨╛╨║╨░╨╖╨░╨╜╨╕╤П ╨╕ ╨▓╨╝╨╡╤Б╤В╨╡ ╤Б
                ╤В╨╛╨▒╨╛╨╣ ╨╛╨┐╤А╨╡╨┤╨╡╨╗╤П╨╡╤В ╨╖╨╛╨╜╤Л ╨║╨╛╤А╤А╨╡╨║╤Ж╨╕╨╕ ╨╕ ╨╛╨╢╨╕╨┤╨░╨╡╨╝╤Л╨╣ ╤А╨╡╨╖╤Г╨╗╤М╤В╨░╤В.
              </p>
            </div>

            {/* ╨и╨░╨│ 2 */}
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
                ╨и╨░╨│ 2
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                ╨Я╨╛╨┤╨│╨╛╤В╨╛╨▓╨║╨░ ╨╕ ╤А╨░╨╖╨╝╨╡╤В╨║╨░
              </h3>
              <p className="text-sm md:text-base opacity-90">
                ╨Ъ╨╛╨╢╨░ ╨╛╨▒╤А╨░╨▒╨░╤В╤Л╨▓╨░╨╡╤В╤Б╤П ╨░╨╜╤В╨╕╤Б╨╡╨┐╤В╨╕╨║╨╛╨╝, ╨┐╤А╨╕ ╨╜╨╡╨╛╨▒╤Е╨╛╨┤╨╕╨╝╨╛╤Б╤В╨╕ ╨╜╨░╨╜╨╛╤Б╨╕╤В╤Б╤П
                ╨░╨╜╨╡╤Б╤В╨╡╨╖╨╕╤А╤Г╤О╤Й╨╕╨╣ ╨║╤А╨╡╨╝, ╨║╨╛╤Б╨╝╨╡╤В╨╛╨╗╨╛╨│ ╤А╨░╨╖╨╝╨╡╤З╨░╨╡╤В ╨║╨╛╨╜╤В╤Г╤А╤Л ╨▓╨▓╨╡╨┤╨╡╨╜╨╕╤П
                LipoLong.
              </p>
            </div>

            {/* ╨и╨░╨│ 3 */}
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
                ╨и╨░╨│ 3
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                ╨Ш╨╜╤К╨╡╨║╤Ж╨╕╨╛╨╜╨╜╤Л╨╣ ╤Н╤В╨░╨┐
              </h3>
              <p className="text-sm md:text-base opacity-90">
                ╨Я╤А╨╡╨┐╨░╤А╨░╤В ╨▓╨▓╨╛╨┤╨╕╤В╤Б╤П ╤В╨╛╤З╨╡╤З╨╜╨╛ ╨▓ ╨╢╨╕╤А╨╛╨▓╤Г╤О ╤В╨║╨░╨╜╤М. ╨Я╤А╨╛╤Ж╨╡╨┤╤Г╤А╨░ ╨╛╨▒╤Л╤З╨╜╨╛
                ╨╖╨░╨╜╨╕╨╝╨░╨╡╤В 20тАУ40&nbsp;╨╝╨╕╨╜╤Г╤В ╨╕ ╨┐╨╡╤А╨╡╨╜╨╛╤Б╨╕╤В╤Б╤П ╨║╨╛╨╝╤Д╨╛╤А╤В╨╜╨╛.
              </p>
            </div>

            {/* ╨и╨░╨│ 4 */}
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
                ╨и╨░╨│ 4
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                ╨Т╨╛╤Б╤Б╤В╨░╨╜╨╛╨▓╨╗╨╡╨╜╨╕╨╡ ╨╕ ╤А╨╡╨╖╤Г╨╗╤М╤В╨░╤В
              </h3>
              <p className="text-sm md:text-base opacity-90">
                ╨Я╨╡╤А╨▓╤Л╨╡ ╨╕╨╖╨╝╨╡╨╜╨╡╨╜╨╕╤П ╨╛╨▒╤Л╤З╨╜╨╛ ╨╖╨░╨╝╨╡╤В╨╜╤Л ╤З╨╡╤А╨╡╨╖ 7тАУ10&nbsp;╨┤╨╜╨╡╨╣, ╨║╤Г╤А╤Б
                ╤Б╨╛╤Б╤В╨╛╨╕╤В ╨╕╨╖ ╨╜╨╡╤Б╨║╨╛╨╗╤М╨║╨╕╤Е ╤Б╨╡╨░╨╜╤Б╨╛╨▓, ╨║╨╛╤В╨╛╤А╤Л╨╡ ╨┐╨╛╨┤╨▒╨╕╤А╨░╨╡╤В ╤Б╨┐╨╡╤Ж╨╕╨░╨╗╨╕╤Б╤В.
              </p>
            </div>
          </div>

          <p className="mt-10 text-sm md:text-base opacity-70 max-w-3xl mx-auto text-center">
            LipoLong ╤А╨░╨▒╨╛╤В╨░╨╡╤В ╤Б ╨╢╨╕╤А╨╛╨▓╤Л╨╝╨╕ ╨║╨╗╨╡╤В╨║╨░╨╝╨╕ ╨┤╨╡╨╗╨╕╨║╨░╤В╨╜╨╛, ╨╜╨╡ ╨┐╨╛╨▓╤А╨╡╨╢╨┤╨░╤П ╤В╨║╨░╨╜╨╕
            ╨╕ ╤Б╨╛╤Е╤А╨░╨╜╤П╤П ╨║╨╛╨╝╤Д╨╛╤А╤В╨╜╤Л╨╣ ╨┐╨╡╤А╨╕╨╛╨┤ ╨▓╨╛╤Б╤Б╤В╨░╨╜╨╛╨▓╨╗╨╡╨╜╨╕╤П.
          </p>
        </div>
      </section>

            {/* ================================
                ╨б╨Х╨Ъ╨ж╨Ш╨п 4 тАФ ╨Ъ╨Ю╨Э╨в╨Р╨Ъ╨в╨л LIPOLONG
            ================================ */}
            <section id="s4" className="snap-section contacts-section px-4 md:px-0 s4-no-scroll" ref={contactsRef}>
              {/* ╨Э╨Х╨Ю╨Э ╨д╨Ю╨Э */}
              <div className="contacts-glow" />
              {/* ╨Я╨л╨Ы╨м ╨▓ S4 */}
              <div className="dust-layer section-dust" aria-hidden="true">
                {DUST_POINTS.map((p, i) => (
                  <div key={i} className="dust-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
                ))}
              </div>
              {/* local dust-layer removed to avoid duplicate particles; global dust-layer displays particles site-wide */}

              <div className={`${contactsVisible ? "contacts-animated" : ""} w-full max-w-6xl mx-auto`}>
                <div className="s4-shell">
                  <div className="s4-head text-center">
                    <h2 className="s4-title text-3xl md:text-5xl font-extrabold text-cyan-200">╨Ч╨░╨┐╨╕╤Б╤М ╨╜╨░ ╨┐╤А╨╛╤Ж╨╡╨┤╤Г╤А╤Г LipoLong</h2>
                    <p className="s4-sub text-lg md:text-xl opacity-90 text-cyan-100">
                      ╨Т╤Л╨▒╨╡╤А╨╕╤В╨╡ ╤Г╨┤╨╛╨▒╨╜╤Л╨╣ ╤Б╨┐╨╛╤Б╨╛╨▒ ╤Б╨▓╤П╨╖╨╕ тАФ ╨╛╤Б╤В╨░╨▓╤М╤В╨╡ ╨╖╨░╤П╨▓╨║╤Г ╤З╨╡╤А╨╡╨╖ ╤Д╨╛╤А╨╝╤Г ╨╕╨╗╨╕ ╨╛╤Д╨╛╤А╨╝╨╕╤В╨╡ ╨┐╨╛╨║╤Г╨┐╨║╤Г ╨╜╨░╨┐╤А╤П╨╝╤Г╤О. ╨Ь╤Л ╨┐╨╛╨╝╨╛╨╢╨╡╨╝ ╨┐╨╛╨┤╨╛╨▒╤А╨░╤В╤М ╨▓╤А╨╡╨╝╤П ╨╕ ╨╛╤В╨▓╨╡╤В╨╕╨╝ ╨╜╨░ ╨▓╨╛╨┐╤А╨╛╤Б╤Л.
                    </p>
                  </div>

                  <div className="s4-grid">
                    <div className="s4-visual-card glass-card">
                      <div className="s4-pack-frame">
                        <div className="pack-animated-wrap">
                          <Image
                            src="/images/pack-placeholder.png"
                            alt="╨г╨┐╨░╨║╨╛╨▓╨║╨░ LipoLong"
                            width={520}
                            height={520}
                            className="s4-pack-image"
                            priority
                          />
                        </div>
                      </div>
                      <div className="s4-pack-content">
                        <p className="s4-eyebrow">LipoLong тАФ ╨╕╨╜╨╜╨╛╨▓╨░╤Ж╨╕╨╛╨╜╨╜╤Л╨╣ ╨╗╨╕╨┐╨╛╨╝╨╛╨┤╤Г╨╗╤П╤В╨╛╤А</p>
                        <h3 className="s4-pack-title">╨Ъ╨╛╨╜╤В╤Г╤А ╤В╨╡╨╗╨░ ╨┐╨╛╨┤ ╨║╨╛╨╜╤В╤А╨╛╨╗╨╡╨╝</h3>
                        <p className="s4-pack-text">
                          ╨Ы╨╛╨║╨░╨╗╤М╨╜╨╛ ╤Г╨╝╨╡╨╜╤М╤И╨░╨╡╤В ╨╢╨╕╤А╨╛╨▓╤Л╨╡ ╨╛╤В╨╗╨╛╨╢╨╡╨╜╨╕╤П, ╨║╨╛╤А╤А╨╡╨║╤В╨╕╤А╤Г╨╡╤В ╨║╨╛╨╜╤В╤Г╤А╤Л ╤В╨╡╨╗╨░ ╨╕ ╨┐╨╛╨╝╨╛╨│╨░╨╡╤В ╨┐╨╛╨┤╨┤╨╡╤А╨╢╨╕╨▓╨░╤В╤М ╤А╨╡╨╖╤Г╨╗╤М╤В╨░╤В ╨▒╨╡╨╖ ╨┐╤А╨╛╨┤╨╛╨╗╨╢╨╕╤В╨╡╨╗╤М╨╜╨╛╨╣ ╤А╨╡╨░╨▒╨╕╨╗╨╕╤В╨░╤Ж╨╕╨╕.
                        </p>
                        <ul className="s4-pack-list">
                          <li>╨С╨╡╨╖╨╛╨┐╨░╤Б╨╜╤Л╨╣ ╤Б╨╛╤Б╤В╨░╨▓: ╨│╨╕╨░╨╗╤Г╤А╨╛╨╜╨░╤В ╨╜╨░╤В╤А╨╕╤П + ╨╗╨╕╨┐╨╛╨╗╨╕╤В╨╕╨║╨╕</li>
                          <li>╨Ъ╨╛╤А╨╛╤В╨║╨░╤П ╨┐╤А╨╛╤Ж╨╡╨┤╤Г╤А╨░ ╨╕ ╨▒╤Л╤Б╤В╤А╤Л╨╣ ╨▓╨╛╨╖╨▓╤А╨░╤В ╨║ ╤А╨╡╨╢╨╕╨╝╤Г</li>
                          <li>╨Я╨╛╨┤╤Е╨╛╨┤╨╕╤В ╨┤╨╗╤П ╨╢╨╕╨▓╨╛╤В╨░, ╨▒╨╛╨║╨╛╨▓, ╨▒╨╡╨┤╨╡╤А ╨╕ ╤А╤Г╨║</li>
                        </ul>
                      </div>
                      <dl className="s4-pack-meta">
                        <div>
                          <dt>╨д╨╛╤А╨╝╨░ ╨▓╤Л╨┐╤Г╤Б╨║╨░</dt>
                          <dd>╨Р╨╝╨┐╤Г╨╗╨░ 8 ╨╝╨╗</dd>
                        </div>
                        <div>
                          <dt>╨г╤Б╨╗╨╛╨▓╨╕╤П ╤Е╤А╨░╨╜╨╡╨╜╨╕╤П</dt>
                          <dd>╨Я╤А╨╕ t┬░ 2тАС25┬░╨б, ╨╖╨░╤Й╨╕╤Й╨░╤В╤М ╨╛╤В ╤Б╨▓╨╡╤В╨░</dd>
                        </div>
                      </dl>
                      <div className="s4-actions">
                        <a
                          href="/order"
                          role="button"
                          className="btn-buy-primary"
                          style={{ padding: "1rem 2rem", fontSize: "1.05rem" }}
                        >
                          ╨Ъ╤Г╨┐╨╕╤В╤М LipoLong
                        </a>
                      </div>
                    </div>

                    <div className="glass-card p-6 md:p-10 w-full s4-form-card">
                      <div className="s4-form-head">
                        <p className="s4-pill s4-pill--ghost">╨С╤Л╤Б╤В╤А╨░╤П ╨╖╨░╨┐╨╕╤Б╤М</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-cyan-100">╨Ю╤Б╤В╨░╨▓╤М╤В╨╡ ╤Б╨▓╨╛╨╕ ╨║╨╛╨╜╤В╨░╨║╤В╤Л</h3>
                        <p className="text-sm md:text-base text-cyan-100/80">
                          ╨Ь╤Л ╤Г╤В╨╛╤З╨╜╨╕╨╝, ╨║╨░╨║╨░╤П ╨╖╨╛╨╜╨░ ╨╕╨╜╤В╨╡╤А╨╡╤Б╤Г╨╡╤В, ╨┐╨╛╨┤╤В╨▓╨╡╤А╨┤╨╕╨╝ ╤Б╤В╨╛╨╕╨╝╨╛╤Б╤В╤М ╨╕ ╤Б╨╛╨│╨╗╨░╤Б╤Г╨╡╨╝ ╨▓╤А╨╡╨╝╤П ╨║╨╛╨╜╤Б╤Г╨╗╤М╤В╨░╤Ж╨╕╨╕.
                        </p>
                      </div>
                      <div className="s4-form-fields">
                        <label className="s4-field">
                          <span>╨Ъ╨░╨║ ╨║ ╨▓╨░╨╝ ╨╛╨▒╤А╨░╤Й╨░╤В╤М╤Б╤П?</span>
                          <input type="text" className="glass-input" placeholder="╨Э╨░╨┐╤А╨╕╨╝╨╡╤А, ╨Р╨╜╨╜╨░" />
                        </label>
                        <label className="s4-field">
                          <span>╨в╨╡╨╗╨╡╤Д╨╛╨╜ ╨┤╨╗╤П ╤Б╨▓╤П╨╖╨╕</span>
                          <input\n                            id="lead-phone"\n                            name="lead-phone"\n                            type="tel"\n                            className="glass-input"\n                            placeholder="+7 (___) ___-__-__"\n                          />
                        </label>
                        <label className="s4-field s4-field--textarea">
                          <span>╨Ъ╨╛╨╝╨╝╨╡╨╜╤В╨░╤А╨╕╨╣ ╨╕╨╗╨╕ ╤Г╨┤╨╛╨▒╨╜╨╛╨╡ ╨▓╤А╨╡╨╝╤П</span>
                          <textarea className="glass-input" style={{ height: "110px", borderRadius: "1rem" }} placeholder="╨Ю╨┐╨╕╤И╨╕╤В╨╡ ╨╢╨╡╨╗╨░╨╡╨╝╤Г╤О ╨╖╨╛╨╜╤Г ╨╕ ╤Д╨╛╤А╨╝╨░╤В ╨║╨╛╨╜╤Б╤Г╨╗╤М╤В╨░╤Ж╨╕╨╕." />
                        </label>
                        <button className="glass-submit">
                          ╨Ю╤В╨┐╤А╨░╨▓╨╕╤В╤М ╨╖╨░╤П╨▓╨║╤Г
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

