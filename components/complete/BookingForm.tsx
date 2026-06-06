"use client";

import { useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";
import { mq } from "@/lib/breakpoints";

const FormSection = styled.section`
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-5);

  ${mq.md} {
    padding: var(--space-8);
  }
`;

const FormHeader = styled.div`
  margin-bottom: var(--space-6);

  ${mq.md} {
    margin-bottom: var(--space-7);
  }
`;

const FormTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-light);
  color: var(--color-text-primary);
`;

const FormSubtitle = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);

  ${mq.sm} { grid-template-columns: repeat(2, 1fr); }
`;

const Field = styled.div``;

const Label = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-lg);
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
`;

const inputStyles = `
  width: 100%;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
  outline: none;

  &::placeholder { color: var(--color-text-muted); }
  &:focus {
    border-color: var(--color-brand-rose);
    box-shadow: var(--shadow-focus);
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
  gap: var(--space-2);
  padding: var(--space-3) var(--space-8);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  background: var(--color-action-bg);
  color: var(--color-action-text);
  border: none;
  cursor: pointer;
  transition: background var(--transition-base);
  &:hover { background: var(--color-action-bg-hover); }
`;

const SuccessCard = styled.div`
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-8);
  text-align: center;
`;

const SuccessIconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-brand-rose) 15%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
`;

const SuccessIcon = styled.span`
  color: var(--color-brand-rose);
  font-size: var(--font-size-2xl);
`;

const SuccessTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-light);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
`;

const SuccessSubtitle = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  max-width: 320px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
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
  const [submitted, setSubmitted] = useState(false);

  const selectionText = categories
    .map((cat) => {
      const opt = allOptions.find((o) => o.id === selection[cat.id]);
      return `${cat.name[locale]}: ${opt?.name[locale] ?? "—"}`;
    })
    .join("\n");

  function handleAction(formData: FormData) {
    const subject = encodeURIComponent(t("emailSubject", { look: look.name[locale] }));
    const body = encodeURIComponent(
      t("emailBody", {
        look: look.name[locale],
        selection: selectionText,
        date: (formData.get("date") as string) || "—",
        phone: (formData.get("phone") as string) || "—",
        message: (formData.get("message") as string) || "—",
      })
    );
    window.open(`mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessCard role="status">
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

      <Form action={handleAction}>
        <FieldGrid>
          <Field>
            <Label htmlFor="booking-name">
              {t("name")} <abbr title={t("required")} aria-label={t("required")}>*</abbr>
            </Label>
            <Input
              id="booking-name"
              name="name"
              type="text"
              required
              aria-required="true"
              placeholder={t("namePlaceholder")}
            />
          </Field>
          <Field>
            <Label htmlFor="booking-email">
              {t("email")} <abbr title={t("required")} aria-label={t("required")}>*</abbr>
            </Label>
            <Input
              id="booking-email"
              name="email"
              type="email"
              required
              aria-required="true"
              placeholder={t("emailPlaceholder")}
            />
          </Field>
          <Field>
            <Label htmlFor="booking-phone">{t("phone")}</Label>
            <Input
              id="booking-phone"
              name="phone"
              type="tel"
              placeholder={t("phonePlaceholder")}
            />
          </Field>
          <Field>
            <Label htmlFor="booking-date">{t("date")}</Label>
            <Input
              id="booking-date"
              name="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />
          </Field>
        </FieldGrid>

        <Field>
          <Label htmlFor="booking-message">{t("message")}</Label>
          <Textarea
            id="booking-message"
            name="message"
            rows={3}
            placeholder={t("messagePlaceholder")}
          />
        </Field>

        <SubmitButton type="submit">
          {t("submit")} <span aria-hidden="true">→</span>
        </SubmitButton>
      </Form>
    </FormSection>
  );
}
