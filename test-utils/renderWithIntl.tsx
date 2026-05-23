import * as React from "react";
import { render, type RenderResult } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { act } from "react";
import en from "../messages/en.json";

type Messages = typeof en;

type Options = {
  locale?: "en" | "it";
  messages?: Messages;
};

/**
 * Wraps a component in NextIntlClientProvider with English messages by default.
 * Use this instead of the bare `render()` for any component that calls
 * useTranslations() or useLocale() — whether directly or via a child.
 */
export const renderWithIntl = (
  ui: React.ReactElement,
  { locale = "en", messages = en }: Options = {},
): RenderResult => {
  let renderer!: RenderResult;

  act(() => {
    renderer = render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        {ui}
      </NextIntlClientProvider>,
    );
  });

  return renderer;
};
