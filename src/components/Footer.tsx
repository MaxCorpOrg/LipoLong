export default function Footer() {
  return (
    <footer
      id="s5"
      className="snap-section footer-liquid relative pt-20 pb-16 mt-0 overflow-hidden"
    >
      {/* Жидкий неоновый фон футера */}
      <div className="footer-liquid-bg">
        <div className="footer-blob footer-blob--1" />
        <div className="footer-blob footer-blob--2" />
        <div className="footer-blob footer-blob--3" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 relative z-[2] text-[#e8ffff]">
        {/* Верхний блок: заголовок КОНТАКТЫ */}
        <div className="text-center md:text-left mb-10">
          <p className="text-xs md:text-sm uppercase tracking-[0.28em] text-cyan-200/90 mb-3">
            КОНТАКТЫ
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-cyan-200">
            LipoLong
          </h2>
        </div>

        {/* Основная сетка: контакты + реквизиты/документы */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          {/* Левая колонка — телефоны, email, режим работы */}
          <div className="space-y-8">
            {/* Телефоны */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/15 shadow-lg shadow-cyan-500/25">
                {/* SVG телефон */}
                <svg aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-300"
                >
                  <path d="M6.5 3.5L9 4.2c.5.16.88.58 1 1.1l.5 2a1.6 1.6 0 0 1-.46 1.56l-1.2 1.2a11.8 11.8 0 0 0 4.6 4.6l1.2-1.2a1.6 1.6 0 0 1 1.56-.46l2 .5c.52.12.94.5 1.1 1l.7 2.5c.18.68-.16 1.4-.8 1.72A5.4 5.4 0 0 1 16 21C9.95 21 5 16.05 5 10c0-1.3.22-2.55.65-3.72.24-.64 1.01-.98 1.78-.78Z" />
                </svg>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80 mb-1">
                  ТЕЛЕФОН
                </p>
                <div className="space-y-1 text-base md:text-lg">
                  <a
                    href="tel:+79042440444"
                    className="hover:text-cyan-300 transition-colors"
                    aria-label="Позвонить +7 904 244 04 44"
                  >
                    +7 904 244 04 44
                  </a>
                  <br />
                  <a
                    href="tel:+74956645084"
                    className="hover:text-cyan-300 transition-colors"
                    aria-label="Позвонить +7 495 66 45 084"
                  >

                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/15 shadow-lg shadow-cyan-500/25">
                {/* SVG конверт */}
                <svg aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-300"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M4 7.5 11.3 12a1.5 1.5 0 0 0 1.4 0L20 7.5" />
                </svg>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80 mb-1">
                  E-MAIL
                </p>
                <a
                  href="mailto:Oblcom@bk.ru"
                  className="text-base md:text-lg hover:text-cyan-300 transition-colors break-all"
                  aria-label="Написать на email Oblcom@bk.ru"
                >
                  Oblcom@bk.ru
                </a>
              </div>
            </div>

            {/* Часы работы */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/15 shadow-lg shadow-cyan-500/25">
                {/* SVG часы */}
                <svg aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-300"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l2.5 2.5" />
                </svg>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80 mb-1">
                  ЧАСЫ РАБОТЫ МАГАЗИНА
                </p>
                <p className="text-base md:text-lg text-cyan-100/90">
                  Пн–Вс 8:00 – 21:00 по МСК
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка — реквизиты + документы */}
          <div className="space-y-8 md:text-right">
            {/* Реквизиты компании */}
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80 mb-3">
                РЕКВИЗИТЫ КОМПАНИИ
              </p>
              <div className="inline-block md:text-right text-left text-sm md:text-base leading-relaxed text-cyan-100/80">
                <p className="mb-1">
                  <span className="font-semibold">ИНН:</span> {/* значение можно будет дописать позже */}
                </p>
              </div>
            </div>

            {/* Документы */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">
                ДОКУМЕНТЫ
              </p>
              <a
                href="/docs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Открыть документы компании LipoLong (в новой вкладке)"
                className="btn-hero btn-hero--secondary inline-flex items-center gap-3 text-sm md:text-base py-2 px-4"
              >
                {/* SVG иконка документа */}
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-300"
                  aria-hidden="true"
                >
                  <path d="M7 3h7l4 4v14H7z" />
                  <path d="M14 3v5h5" />
                  <path d="M10 13h6" />
                  <path d="M10 17h4" />
                </svg>
                <span>Смотреть документы</span>
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя строка — копирайт */}
        <div className="mt-12 pt-6 border-t border-white/10 text-xs md:text-sm text-cyan-100/60 text-center md:text-left">
          © {new Date().getFullYear()} LipoLong. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
