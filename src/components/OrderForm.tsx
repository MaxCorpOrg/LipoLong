'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  email: z.string().email("Неверный email"),
  phone: z.string().min(6).optional().or(z.literal("")),
  message: z.string().min(5, "Короткое сообщение"),
});

type FormDataShape = z.infer<typeof schema>;

type OrderAction = (formData: FormData) => Promise<{ ok: boolean }>;

export default function OrderForm({ action }: { action: OrderAction }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataShape>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("loading");
    try {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("email", values.email);
      fd.append("phone", values.phone || "");
      fd.append("message", values.message);

      await action(fd);
      setStatus("success");
      reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="glass-card w-full max-w-xl mx-auto space-y-6 p-6 md:p-8"
    >
      <h3 className="text-2xl font-bold mb-2 text-cyan-200 text-center">
        Быстрая заявка
      </h3>
      <p className="text-sm md:text-base text-center text-cyan-100 opacity-80 mb-4">
        Заполните несколько полей — мы свяжемся с вами и подберём оптимальный
        формат процедуры.
      </p>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-cyan-200 mb-1">
          Имя
        </label>
        <input
          {...register("name")}
          className="glass-input w-full"
          placeholder="Как к вам обращаться?"
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
          {...register("email")}
          className="glass-input w-full"
          placeholder="you@example.com"
          type="email"
        />
        {errors.email && (
          <p className="text-sm text-rose-400 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-cyan-200 mb-1">
          Телефон (опционально)
        </label>
        <input
          {...register("phone")}
          className="glass-input w-full"
          placeholder="+7 (___) ___-__-__"
          type="tel"
        />
        {errors.phone && (
          <p className="text-sm text-rose-400 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-cyan-200 mb-1">
          Сообщение
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className="glass-input w-full"
          style={{ borderRadius: "1rem", height: "110px" }}
          placeholder="Какая зона интересует? Удобное время для связи."
        />
        {errors.message && (
          <p className="text-sm text-rose-400 mt-1">{errors.message.message}</p>
        )}
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
            Спасибо! Заявка отправлена, скоро свяжемся.
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-rose-400 text-center">
            Ошибка отправки. Попробуйте ещё раз позже.
          </span>
        )}
      </div>
    </form>
  );
}
