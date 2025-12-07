import assert from "node:assert/strict";
import { validateOrderPayload, sendOrder } from "../src/lib/sendOrder.ts";

type TestFn = () => void | Promise<void>;

async function run(name: string, fn: TestFn) {
  try {
    await fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

await run("validateOrderPayload trims и пропускает валидные данные", () => {
  const payload = {
    name: "  Анна ",
    email: " user@example.com ",
    phone: "  +7 904 244-04-44 ",
    message: "  Хочу уточнить по процедуре ",
  };

  const res = validateOrderPayload(payload);
  assert.equal(res.ok, true);
  assert.equal(payload.name, "Анна");
  assert.equal(payload.email, "user@example.com");
  assert.equal(payload.phone, "+7 904 244-04-44");
  assert.equal(payload.message, "Хочу уточнить по процедуре");
});

await run("validateOrderPayload режет слишком короткое имя", () => {
  const res = validateOrderPayload({
    name: "А",
    email: "a@b.c",
    phone: "",
    message: "Сообщение",
  });
  assert.equal(res.ok, false);
  assert.ok(res.error?.includes("Укажите имя"));
});

await run("validateOrderPayload ловит некорректный email", () => {
  const res = validateOrderPayload({
    name: "Анна",
    email: "not-an-email",
    phone: "",
    message: "Сообщение",
  });
  assert.equal(res.ok, false);
  assert.ok(res.error?.includes("email"));
});

await run("validateOrderPayload ограничивает длину сообщения", () => {
  const longMessage = "x".repeat(2001);
  const res = validateOrderPayload({
    name: "Анна",
    email: "a@b.c",
    phone: "",
    message: longMessage,
  });
  assert.equal(res.ok, false);
  assert.ok(res.error?.includes("слишком длинное"));
});

await run("sendOrder сообщает об отсутствии SMTP настроек", async () => {
  const backup = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_PORT: process.env.SMTP_PORT,
    MAIL_TO: process.env.MAIL_TO,
    MAIL_FROM: process.env.MAIL_FROM,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  };

  try {
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.SMTP_PORT;
    delete process.env.MAIL_TO;
    delete process.env.MAIL_FROM;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const res = await sendOrder({
      name: "Анна",
      email: "a@b.c",
      phone: "",
      message: "Сообщение",
    });

    assert.equal(res.ok, false);
    assert.ok(res.error?.includes("SMTP"));
  } finally {
    Object.assign(process.env, backup);
  }
});
