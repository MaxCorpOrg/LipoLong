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

          <div
            id="s5-coop"
            className="footer-card footer-card--secondary footer-card--coop"
          >
            <p className="footer-coop-title">
              Приглашаем к сотрудничеству
              <br />
              оптовых партнёров
            </p>
            <p className="footer-coop-subtitle">
              Эксклюзивные условия, стабильные поставки и прямая
              <br />
              связь с представителем LipoLong
            </p>
            <div className="footer-coop-actions">
              <a
                href="https://t.me/Vorgesar"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-coop-link"
                aria-label="Написать в Telegram"
              >
                <span className="footer-coop-icon footer-coop-icon--tg">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M21.8 4.2c.5-1.5-.5-2.5-2-2L4.1 8c-1.7.6-1.7 1.9-.3 2.3l4.1 1.3 1.6 4.9c.3.9 1.2 1.1 1.9.4l2.4-2.5 4.4 3.2c.8.5 1.5.2 1.7-.7L21.8 4.2zM8.6 12.2 18.5 6.8l-7.9 7.4-.3 3.4-1.2-3.8-3.7-1.2 3.2-.4z" />
                  </svg>
                </span>
                <span className="footer-coop-text">
                  <span className="footer-coop-label">Telegram</span>
                  <span className="footer-coop-desc">
                    Получить условия
                    <br />
                    и оптовые цены
                  </span>
                </span>
              </a>
              <a
                href="tel:+79042440444"
                className="footer-coop-link"
                aria-label="Позвонить +7 904 244 04 44"
              >
                <span className="footer-coop-icon footer-coop-icon--phone">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.7 11.7 0 0 0 3.7 1.2 1 1 0 0 1 .9 1v3.5a1 1 0 0 1-1 1A17.9 17.9 0 0 1 4 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 .9 11.7 11.7 0 0 0 1.2 3.7 1 1 0 0 1-.24 1l-2.2 2.2z" />
                  </svg>
                </span>
                <span className="footer-coop-text">
                  <span className="footer-coop-label">Телефон</span>
                  <span className="footer-coop-desc footer-coop-desc--phone">
                    Позвонить
                    <br />
                    и обсудить сотрудничество
                  </span>
                </span>
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
