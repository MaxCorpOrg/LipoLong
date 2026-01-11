'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z
    .string()
    .min(2, "Введите имя (мин. 2 символа)")
    .max(120, "Слишком длинное имя"),
  email: z
    .string()
    .email("Введите корректный email")
    .max(120, "Слишком длинный email"),
  phone: z
    .string()
    .max(32, "Слишком длинный номер")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(5, "Минимум 5 символов")
    .max(2000, "Слишком длинное сообщение"),
  startedAt: z.string().optional(),
  website: z.string().optional(),
});

type FormDataShape = z.infer<typeof schema>;

export default function OrderForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataShape>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",
      startedAt: Date.now().toString(),
    } as any,
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          startedAt: values.startedAt,
          website: values.website,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Не удалось отправить. Попробуйте ещё раз.");
      }

      setStatus("success");
      reset({
        name: "",
        email: "",
        phone: "",
        message: "",
        website: "",
        startedAt: Date.now().toString(),
      } as any);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Не удалось отправить. Попробуйте ещё раз.";
      console.error(err);
      setErrorMessage(message);
      setStatus("error");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="glass-card w-full space-y-6 p-6 md:p-8"
    >
      <h3 className="text-2xl font-bold mb-2 text-cyan-200 text-center">
        Оставьте заявку
      </h3>
      <p className="text-sm md:text-base text-center text-cyan-100 opacity-80 mb-4">
        Заполните форму, и мы подберём удобное время и ответим на вопросы.
      </p>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-cyan-200 mb-1">
          Имя
        </label>
        <input
          id="order-name"
          {...register("name")}
          className="glass-input w-full"
          placeholder="Например, Анна"
          maxLength={120}
        />
        {errors.name && (
          <p className="text-sm text-rose-400 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-cyan-200 mb-1">
          Email
        </label>
        <input
          id="order-email"
          {...register("email")}
          className="glass-input w-full"
          placeholder="you@example.com"
          type="email"
          maxLength={120}
        />
        {errors.email && (
          <p className="text-sm text-rose-400 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-cyan-200 mb-1">
          Телефон (необязательно)
        </label>
        <input
          id="order-phone"
          {...register("phone")}
          className="glass-input w-full"
          placeholder="+7 (___) ___-__-__"
          type="tel"
          maxLength={32}
        />
        {errors.phone && (
          <p className="text-sm text-rose-400 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-cyan-200 mb-1">
          Комментарий
        </label>
        <textarea
          id="order-message"
          {...register("message")}
          rows={4}
          className="glass-input w-full"
          style={{ borderRadius: "1rem", height: "110px" }}
          placeholder="Коротко опишите задачу или вопросы"
          maxLength={2000}
        />
        {errors.message && (
          <p className="text-sm text-rose-400 mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot для ботов: реальным пользователям скрыт */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="website">Ваш сайт</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website" as any)} />
        <input type="hidden" {...register("startedAt" as any)} />
      </div>

      <div className="flex flex-col items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="glass-submit w-full py-3 rounded-full text-sm md:text-base font-semibold tracking-[0.18em] uppercase"
        >
          {status === "loading" ? "Отправка..." : "Отправить заявку"}
        </button>

        {status === "success" && (
          <span className="text-sm text-cyan-300 text-center">
            Спасибо! Мы свяжемся с вами в ближайшее время.
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-rose-400 text-center">
            {errorMessage || "Не удалось отправить. Попробуйте ещё раз."}
          </span>
        )}
      </div>
    </form>
  );
}
