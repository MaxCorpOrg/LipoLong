import nodemailer from "nodemailer";

export type OrderPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export function validateOrderPayload(payload: OrderPayload): { ok: boolean; error?: string } {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const phone = (payload.phone ?? "").trim();
  const message = payload.message.trim();

  if (name.length < 2) return { ok: false, error: "Укажите имя (мин. 2 символа)" };
  if (name.length > 120) return { ok: false, error: "Слишком длинное имя" };
  if (!/\S+@\S+/.test(email)) return { ok: false, error: "Некорректный email" };
  if (email.length > 120) return { ok: false, error: "Email слишком длинный" };
  if (phone.length > 32) return { ok: false, error: "Телефон слишком длинный" };
  if (message.length < 3) return { ok: false, error: "Слишком короткое сообщение" };
  if (message.length > 2000) return { ok: false, error: "Сообщение слишком длинное" };

  payload.name = name;
  payload.email = email;
  payload.phone = phone;
  payload.message = message;
  return { ok: true };
}

export async function sendOrder(payload: OrderPayload): Promise<{ ok: boolean; error?: string }> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo = process.env.MAIL_TO ?? "Oblcom@bk.ru";
  const mailFrom = process.env.MAIL_FROM ?? smtpUser ?? "no-reply@lipolong.local";

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("SMTP env vars missing");
    return { ok: false, error: "SMTP не настроен" };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const emailSubject = "Новая заявка LipoLong";
  const emailText = `Новая заявка LipoLong
Имя: ${payload.name}
Email: ${payload.email}
Телефон: ${payload.phone || "—"}
Сообщение: ${payload.message}`;

  const htmlSafe = {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    phone: escapeHtml(payload.phone || "—"),
    message: escapeHtml(payload.message),
  };

  try {
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
  } catch (error) {
    console.error("Mail send failed", error);
    return { ok: false, error: "Не удалось отправить письмо" };
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (BOT_TOKEN && CHAT_ID) {
    const tgText = `Новая заявка на LipoLong%0AИмя: ${encodeURIComponent(
      payload.name
    )}%0AEmail: ${encodeURIComponent(payload.email)}%0AТелефон: ${encodeURIComponent(
      payload.phone || ""
    )}%0AСообщение: ${encodeURIComponent(payload.message)}`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: tgText }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("TG error", res.status, body);
      }
    } catch (error) {
      console.error("TG send failed", error);
    }
  }

  return { ok: true };
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
