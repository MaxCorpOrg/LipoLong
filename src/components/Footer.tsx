const FOOTER_DUST_POINTS = [
  { top: "6%", left: "12%", delay: "0s" },
  { top: "18%", left: "32%", delay: "1.2s" },
  { top: "28%", left: "72%", delay: "2.6s" },
  { top: "42%", left: "18%", delay: "0.8s" },
  { top: "54%", left: "48%", delay: "3.2s" },
  { top: "70%", left: "80%", delay: "1.6s" },
  { top: "76%", left: "26%", delay: "2.8s" },
  { top: "84%", left: "60%", delay: "4.1s" },
];

export default function Footer() {
  return (
    <footer
      id="s5"
      className="snap-section footer-liquid relative pt-20 pb-16 overflow-hidden"
    >
      <div className="footer-shell w-full max-w-6xl mx-auto px-6 relative z-[2] text-[#e8ffff]">
        <div className="footer-head text-center md:text-left">
          <h2 className="footer-title">LipoLong</h2>
          <p className="footer-sub">
            Подберем удобное время консультации, расскажем о процедуре и сразу
            оформим заказ — выберите нужный канал связи.
          </p>
        </div>

        <div className="footer-grid">
          <div className="footer-card">
            <ul className="footer-list">
              <li className="footer-list-item">
                <div className="footer-list-icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6.5 3.5L9 4.2c.5.16.88.58 1 1.1l.5 2a1.6 1.6 0 0 1-.46 1.56l-1.2 1.2a11.8 11.8 0 0 0 4.6 4.6l1.2-1.2a1.6 1.6 0 0 1 1.56-.46l2 .5c.52.12.94.5 1.1 1l.7 2.5c.18.68-.16 1.4-.8 1.72A5.4 5.4 0 0 1 16 21C9.95 21 5 16.05 5 10c0-1.3.22-2.55.65-3.72.24-.64 1.01-.98 1.78-.78Z" />
                  </svg>
                </div>
                <div>
                  <p className="footer-label">Телефон</p>
                  <a
                    href="tel:+79042440444"
                    className="footer-value"
                    aria-label="Позвонить по номеру +7 904 244 04 44"
                  >
                    +7 904 244 04 44
                  </a>
                  <p className="footer-meta-text">Ежедневно 10:00–22:00 по МСК</p>
                </div>
              </li>

              <li className="footer-list-item">
                <div className="footer-list-icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M4 7.5 11.3 12a1.5 1.5 0 0 0 1.4 0L20 7.5" />
                  </svg>
                </div>
                <div>
                  <p className="footer-label">E-mail</p>
                  <a
                    href="mailto:Oblcom@bk.ru"
                    className="footer-value"
                    aria-label="Написать на email Oblcom@bk.ru"
                  >
                    Oblcom@bk.ru
                  </a>
                  <p className="footer-meta-text">
                    Отвечаем в течение рабочего дня
                  </p>
                </div>
              </li>

              <li className="footer-list-item">
                <div className="footer-list-icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v4l2.5 2.5" />
                  </svg>
                </div>
                <div>
                  <p className="footer-label">График</p>
                  <p className="footer-value">Пн–Вс 10:00 – 22:00 по МСК</p>
                  <p className="footer-meta-text">
                    Консультируем и оформляем заказы
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-card footer-card--secondary">
            <div className="footer-meta">
              <p className="footer-label text-cyan-200/90">Реквизиты компании</p>
              <p className="footer-value">
                ИНН: <span className="footer-meta-strong">—</span>
              </p>
              <p className="footer-meta-text">
                Предоставим дополнительные документы по запросу или познакомим с
                ними в один клик.
              </p>
            </div>

            <div className="footer-docs">
              <p className="footer-label text-cyan-200/90">Документы</p>
              <a
                href="/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero btn-hero--secondary inline-flex items-center gap-3 text-sm md:text-base py-2 px-5"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 3h7l4 4v14H7z" />
                  <path d="M14 3v5h5" />
                  <path d="M10 13h6" />
                  <path d="M10 17h4" />
                </svg>
                Смотреть документы
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} LipoLong. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
