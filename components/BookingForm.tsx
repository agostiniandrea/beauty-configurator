"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

type Props = {
  look: Look;
  categories: Category[];
  allOptions: Option[];
  selection: Selection;
  locale: Locale;
};

export default function BookingForm({ look, categories, allOptions, selection, locale }: Props) {
  const t = useTranslations("booking");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectionText = categories
    .map((cat) => {
      const opt = allOptions.find((o) => o.id === selection[cat.id]);
      return `${cat.name[locale]}: ${opt?.name[locale] ?? "—"}`;
    })
    .join("\n");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(t("emailSubject", { look: look.name[locale] }));
    const body = encodeURIComponent(
      t("emailBody", {
        look: look.name[locale],
        selection: selectionText,
        date: date || "—",
        phone: phone || "—",
        message: message || "—",
      })
    );
    window.open(`mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  }

  const inputClass = "w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-rose)]/40 focus:border-[var(--color-brand-rose)] transition-all";
  const labelClass = "block text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)] mb-2";

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-rose)]/15 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
          <span className="text-[var(--color-brand-rose)] text-2xl">✦</span>
        </div>
        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-light text-[var(--color-text-primary)] mb-2">
          {t("successTitle")}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-sm mx-auto leading-relaxed">
          {t("successSubtitle")}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
      <div className="mb-7">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-light text-[var(--color-text-primary)]">
          {t("title")}
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="booking-name" className={labelClass}>{t("name")} *</label>
            <input
              id="booking-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="booking-email" className={labelClass}>{t("email")} *</label>
            <input
              id="booking-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="booking-phone" className={labelClass}>{t("phone")}</label>
            <input
              id="booking-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phonePlaceholder")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="booking-date" className={labelClass}>{t("date")}</label>
            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="booking-message" className={labelClass}>{t("message")}</label>
          <textarea
            id="booking-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("messagePlaceholder")}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="self-start flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-semibold bg-[var(--color-action-bg)] text-[var(--color-action-text)] hover:bg-[var(--color-action-bg-hover)] transition-all"
        >
          {t("submit")} →
        </button>
      </form>
    </section>
  );
}
