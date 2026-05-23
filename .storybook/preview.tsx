import React from "react";
import type { Preview } from "@storybook/nextjs";
import { NextIntlClientProvider } from "next-intl";
import en from "../messages/en.json";
import "../app/globals.css";

// Inject font CSS variables so Storybook uses the correct typefaces
const StorybookFonts = () => (
  <style>{`
    :root {
      --font-cormorant: "Cormorant Garamond", Georgia, serif;
      --font-dm-sans: "DM Sans", system-ui, sans-serif;
    }
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  `}</style>
);

// Mock window.matchMedia for hooks that use it
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#FAF7F4" },
        { name: "white", value: "#FFFCF9" },
        { name: "dark", value: "#2D1F1A" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={en}>
        <StorybookFonts />
        <div style={{ fontFamily: "var(--font-dm-sans, system-ui, sans-serif)" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
