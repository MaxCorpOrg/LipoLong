


// Файл: src/app/order/page.tsx
import OrderForm from "@/components/OrderForm";
import Image from "next/image";

export const metadata = {
  title: "Запись на процедуру LipoLong",
  description: "Быстрая заявка на процедуру LipoLong",
};

type DustPoint = { top: string; left: string; delay: string };

const DUST_POINTS: DustPoint[] = [
  { top: "8%", left: "12%", delay: "0s" },
  { top: "18%", left: "38%", delay: "1.2s" },
  { top: "26%", left: "72%", delay: "2.4s" },
  { top: "40%", left: "18%", delay: "3.1s" },
  { top: "52%", left: "48%", delay: "1.8s" },
  { top: "64%", left: "80%", delay: "2.9s" },
  { top: "78%", left: "26%", delay: "0.9s" },
  { top: "86%", left: "60%", delay: "3.7s" },
];

export default function OrderPage() {
  async function sendOrder(formData: FormData): Promise<{ ok: boolean }> {
    "use server";

    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const phone = formData.get("phone")?.toString() ?? "";
    const message = formData.get("message")?.toString() ?? "";

    // Basic server-side validation
    if (name.length < 2 || !/\S+@\S+/.test(email) || message.length < 3) {
      throw new Error("Invalid input");
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Telegram env vars missing");
      throw new Error("Server misconfiguration");
    }

    const text = `Новая заявка на LipoLong%0AИмя: ${escapeHtml(
      name
    )}%0AEmail: ${escapeHtml(email)}%0AТелефон: ${escapeHtml(
      phone
    )}%0AСообщение: ${escapeHtml(message)}`;

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("TG error", res.status, body);
      throw new Error("Telegram send failed");
    }

    return { ok: true };
  }

  return (
    <section className="snap-section contacts-section px-4 md:px-0">
      {/* НЕОНОВЫЕ ПЯТНА КАК В СЕКЦИИ 4 */}
      <div className="contacts-glow" />

      {/* ПЫЛЬ */}
      <div className="dust-layer section-dust" aria-hidden="true">
        {DUST_POINTS.map((p, i) => (
          <div
            key={i}
            className="dust-particle"
            style={{ top: p.top, left: p.left, animationDelay: p.delay }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl mx-auto pt-28 pb-24 relative z-[2]">
        {/* ЛОГОТИП СВЕРХУ */}
        <div className="flex justify-center mb-8">
          <div className="hero-logo-wrap">
            <Image
              src="/Logo.png"
              alt="LipoLong"
              width={320}
              height={90}
              className="hero-logo-image"
              priority
            />
          </div>
        </div>

        {/* ЗАГОЛОВОК И ПОДЗАГОЛОВОК */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-cyan-200">
            Запись на процедуру LipoLong
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-cyan-100">
            Оставьте заявку, и мы подберём удобное время, объясним протокол
            процедуры и ответим на все вопросы.
          </p>
        </div>

        {/* 2 КОЛОНКИ: ТЕКСТ + ФОРМА */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] items-start">
          {/* Левая колонка — пояснения / преимущества */}
          <div className="space-y-5 text-cyan-100 text-sm md:text-base">
            <h2 className="text-xl md:text-2xl font-semibold text-cyan-200">
              Что будет после отправки заявки
            </h2>
            <ul className="space-y-2 opacity-90">
              <li>• Врач или администратор свяжется с вами в течение 15–30 минут.</li>
              <li>• Уточним зону коррекции и ожидаемый результат.</li>
              <li>• Подберём удобное время консультации или процедуры.</li>
              <li>• При необходимости вышлем подробные рекомендации по подготовке.</li>
            </ul>

            <div className="mt-4 text-xs md:text-sm opacity-70">
              Мы не передаём ваши данные третьим лицам. Контакты используются
              только для связи по процедуре LipoLong.
            </div>
          </div>

          {/* Правая колонка — стеклянная форма */}
          <OrderForm action={sendOrder} />
        </div>
      </div>
    </section>
  );
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "%26")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/#/g, "%23");
}

