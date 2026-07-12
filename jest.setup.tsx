import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "jest-styled-components";

// Mock next/navigation (App Router)
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: "/",
    query: {},
  }),
  usePathname: () => "/en",
  useSearchParams: () => new URLSearchParams(),
  notFound: jest.fn(),
}));

// Mock next/font/google — returns static CSS variable class names
jest.mock("next/font/google", () => ({
  Cormorant_Garamond: () => ({ variable: "__font_cormorant", className: "__font_cormorant" }),
  DM_Sans: () => ({ variable: "__font_dm_sans", className: "__font_dm_sans" }),
}));

// Mock next-intl — translations return the key, locale is "en"
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock the locale-aware navigation wrappers (i18n/navigation.ts) — the real
// createNavigation needs the next-intl request context, unavailable in jsdom.
jest.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    locale: _locale,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    locale?: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  redirect: jest.fn(),
  getPathname: ({ locale, href }: { locale: string; href: string }) =>
    locale === "en" ? href : `/${locale}${href}`,
}));

// Mock window.matchMedia
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

// Mock window.print
Object.defineProperty(window, "print", {
  writable: true,
  value: jest.fn(),
});
