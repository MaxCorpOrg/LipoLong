


// Р¤Р°Р№Р»: src/app/order/page.tsx
import OrderForm from "@/components/OrderForm";
import Image from "next/image";
import nodemailer from "nodemailer";

export const metadata = {
  title: "Р—Р°РїРёСЃСЊ РЅР° РїСЂРѕС†РµРґСѓСЂСѓ LipoLong",
  description: "Р‘С‹СЃС‚СЂР°СЏ Р·Р°СЏРІРєР° РЅР° РїСЂРѕС†РµРґСѓСЂСѓ LipoLong",
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

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailTo = process.env.MAIL_TO ?? "Oblcom@bk.ru";
    const mailFrom = process.env.MAIL_FROM ?? smtpUser ?? "no-reply@lipolong.local";

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("SMTP env vars missing");
      throw new Error("Server misconfiguration");
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const emailSubject = "Новая заявка LipoLong";
    const emailText = `Новая заявка LipoLong
Имя: ${name}
Email: ${email}
Телефон: ${phone || "—"}
Сообщение: ${message}`;

    const htmlSafe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone || "—"),
      message: escapeHtml(message),
    };

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: emailSubject,
      text: emailText,
      html: `<p><strong>Новая заявка LipoLong</strong></p>
<ul>
  <li><strong>Имя:</strong> ${htmlSafe.name}</li>
  <li><strong>Email:</strong> ${htmlSafe.email}</li>
  <li><strong>Телефон:</strong> ${htmlSafe.phone}</li>
  <li><strong>Сообщение:</strong><br/>${htmlSafe.message.replace(/\n/g, "<br/>")}</li>
</ul>`,
    });

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (BOT_TOKEN && CHAT_ID) {
      const tgText = `Новая заявка на LipoLong%0AИмя: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AТелефон: ${encodeURIComponent(phone)}%0AСообщение: ${encodeURIComponent(message)}`;

      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: CHAT_ID, text: tgText }),
        }
      );

      if (!res.ok) {
        const body = await res.text();
        console.error("TG error", res.status, body);
      }
    }

    return { ok: true };
  }

  return (
    <section className="snap-section contacts-section px-4 md:px-0">
      {/* РќР•РћРќРћР’Р«Р• РџРЇРўРќРђ РљРђРљ Р’ РЎР•РљР¦РР 4 */}
      <div className="contacts-glow" />

      {/* РџР«Р›Р¬ */}
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
        {/* Р›РћР“РћРўРРџ РЎР’Р•Р РҐРЈ */}
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

        {/* Р—РђР“РћР›РћР’РћРљ Р РџРћР”Р—РђР“РћР›РћР’РћРљ */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-cyan-200">
            Р—Р°РїРёСЃСЊ РЅР° РїСЂРѕС†РµРґСѓСЂСѓ LipoLong
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-cyan-100">
            РћСЃС‚Р°РІСЊС‚Рµ Р·Р°СЏРІРєСѓ, Рё РјС‹ РїРѕРґР±РµСЂС‘Рј СѓРґРѕР±РЅРѕРµ РІСЂРµРјСЏ, РѕР±СЉСЏСЃРЅРёРј РїСЂРѕС‚РѕРєРѕР»
            РїСЂРѕС†РµРґСѓСЂС‹ Рё РѕС‚РІРµС‚РёРј РЅР° РІСЃРµ РІРѕРїСЂРѕСЃС‹.
          </p>
        </div>

        {/* 2 РљРћР›РћРќРљР: РўР•РљРЎРў + Р¤РћР РњРђ */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] items-start">
          {/* Р›РµРІР°СЏ РєРѕР»РѕРЅРєР° вЂ” РїРѕСЏСЃРЅРµРЅРёСЏ / РїСЂРµРёРјСѓС‰РµСЃС‚РІР° */}
          <div className="space-y-5 text-cyan-100 text-sm md:text-base">
            <h2 className="text-xl md:text-2xl font-semibold text-cyan-200">
              Р§С‚Рѕ Р±СѓРґРµС‚ РїРѕСЃР»Рµ РѕС‚РїСЂР°РІРєРё Р·Р°СЏРІРєРё
            </h2>
            <ul className="space-y-2 opacity-90">
              <li>вЂў Р’СЂР°С‡ РёР»Рё Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂ СЃРІСЏР¶РµС‚СЃСЏ СЃ РІР°РјРё РІ С‚РµС‡РµРЅРёРµ 15вЂ“30 РјРёРЅСѓС‚.</li>
              <li>вЂў РЈС‚РѕС‡РЅРёРј Р·РѕРЅСѓ РєРѕСЂСЂРµРєС†РёРё Рё РѕР¶РёРґР°РµРјС‹Р№ СЂРµР·СѓР»СЊС‚Р°С‚.</li>
              <li>вЂў РџРѕРґР±РµСЂС‘Рј СѓРґРѕР±РЅРѕРµ РІСЂРµРјСЏ РєРѕРЅСЃСѓР»СЊС‚Р°С†РёРё РёР»Рё РїСЂРѕС†РµРґСѓСЂС‹.</li>
              <li>вЂў РџСЂРё РЅРµРѕР±С…РѕРґРёРјРѕСЃС‚Рё РІС‹С€Р»РµРј РїРѕРґСЂРѕР±РЅС‹Рµ СЂРµРєРѕРјРµРЅРґР°С†РёРё РїРѕ РїРѕРґРіРѕС‚РѕРІРєРµ.</li>
            </ul>

            <div className="mt-4 text-xs md:text-sm opacity-70">
              РњС‹ РЅРµ РїРµСЂРµРґР°С‘Рј РІР°С€Рё РґР°РЅРЅС‹Рµ С‚СЂРµС‚СЊРёРј Р»РёС†Р°Рј. РљРѕРЅС‚Р°РєС‚С‹ РёСЃРїРѕР»СЊР·СѓСЋС‚СЃСЏ
              С‚РѕР»СЊРєРѕ РґР»СЏ СЃРІСЏР·Рё РїРѕ РїСЂРѕС†РµРґСѓСЂРµ LipoLong.
            </div>
          </div>

          {/* РџСЂР°РІР°СЏ РєРѕР»РѕРЅРєР° вЂ” СЃС‚РµРєР»СЏРЅРЅР°СЏ С„РѕСЂРјР° */}
          <OrderForm action={sendOrder} />
        </div>
      </div>
    </section>
  );
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}


