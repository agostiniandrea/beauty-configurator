"use client";

import { useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

const FormSection = styled.section`
  border-radius: 24px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 32px;
`;

const FormHeader = styled.div`
  margin-bottom: 28px;
`;

const FormTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 300;
  color: var(--color-text-primary);
`;

const FormSubtitle = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
`;

const Field = styled.div``;

const Label = styled.label`
  display: block;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  margin-bottom: 8px;
`;

const inputStyles = `
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 12px 16px;
  font-size: 14px;
  color: var(--color-text-primary);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &::placeholder { color: var(--color-text-muted); }
  &:focus {
    border-color: var(--color-brand-rose);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-rose) 15%, transparent);
  }
`;

const Input = styled.input`${inputStyles}`;

const Textarea = styled.textarea`
  ${inputStyles}
  resize: none;
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  background: var(--color-action-bg);
  color: var(--color-action-text);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: var(--color-action-bg-hover); }
`;

const SuccessCard = styled.div`
  border-radius: 24px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 32px;
  text-align: center;
`;

const SuccessIconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--color-brand-rose) 15%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const SuccessIcon = styled.span`
  color: var(--color-brand-rose);
  font-size: 24px;
`;

const SuccessTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 300;
  color: var(--color-text-primary);
  margin-bottom: 8px;
`;

const SuccessSubtitle = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
  max-width: 320px;
  margin: 0 auto;
  line-height: 1.6;
`;

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

  if (submitted) {
    return (
      <SuccessCard>
        <SuccessIconWrap aria-hidden="true">
          <SuccessIcon>✦</SuccessIcon>
        </SuccessIconWrap>
        <SuccessTitle>{t("successTitle")}</SuccessTitle>
        <SuccessSubtitle>{t("successSubtitle")}</SuccessSubtitle>
      </SuccessCard>
    );
  }

  return (
    <FormSection>
      <FormHeader>
        <FormTitle>{t("title")}</FormTitle>
        <FormSubtitle>{t("subtitle")}</FormSubtitle>
      </FormHeader>

      <Form onSubmit={handleSubmit}>
        <FieldGrid>
          <Field>
            <Label htmlFor="booking-name">{t("name")} *</Label>
            <Input
              id="booking-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
            />
          </Field>
          <Field>
            <Label htmlFor="booking-email">{t("email")} *</Label>
            <Input
              id="booking-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
            />
          </Field>
          <Field>
            <Label htmlFor="booking-phone">{t("phone")}</Label>
            <Input
              id="booking-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phonePlaceholder")}
            />
          </Field>
          <Field>
            <Label htmlFor="booking-date">{t("date")}</Label>
            <Input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </Field>
        </FieldGrid>

        <Field>
          <Label htmlFor="booking-message">{t("message")}</Label>
          <Textarea
            id="booking-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("messagePlaceholder")}
          />
        </Field>

        <SubmitButton type="submit">
          {t("submit")} →
        </SubmitButton>
      </Form>
    </FormSection>
  );
}
