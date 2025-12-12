import OrderForm from "@/components/OrderForm";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Запись на процедуру LipoLong",
  description: "Оставьте заявку на процедуру LipoLong",
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
  return (
    <section className="snap-section contacts-section px-4 md:px-0">
      {/* Секция 4 */}
      <div className="contacts-glow" />

      {/* Пыль */}
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
        {/* Логотип */}
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

        {/* Заголовок и описание */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-cyan-200">
            Запись на процедуру LipoLong
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-cyan-100">
            Оставьте контакты и пару слов — подберём удобное время и ответим на вопросы.
          </p>
        </div>

        {/* 2 колонки: текст + форма */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] items-start">
          {/* Левая колонка — процесс */}
          <div className="space-y-5 text-cyan-100 text-sm md:text-base">
            <h2 className="text-xl md:text-2xl font-semibold text-cyan-200">
              Что будет после отправки заявки
            </h2>
            <ul className="space-y-2 opacity-90">
              <li>• Свяжемся в течение 15–30 минут.</li>
              <li>• Уточним цели и зоны, расскажем о показаниях и противопоказаниях.</li>
              <li>• Подберём комфортную дату и предложим стоимость.</li>
              <li>• Дадим рекомендации по подготовке и восстановлению.</li>
            </ul>

            <div className="mt-4 text-xs md:text-sm opacity-70">
              Мы не передаём данные третьим лицам. Используем только для связи и записи в LipoLong.
            </div>
          </div>

          {/* Правая колонка — форма */}
          <OrderForm />
        </div>
      </div>
    </section>
  );
}
