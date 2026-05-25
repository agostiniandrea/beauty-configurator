/**
 * site.config.ts — single source of truth for all site-level configuration.
 *
 * Edit this file to customise the site without touching component code.
 * Colors and typography live in app/globals.css (CSS custom properties).
 */

const siteConfig = {
  /** Displayed in the header, page titles, and the store card. */
  name: "Beauty Configurator",

  /** Short tagline shown in the hero. */
  tagline: {
    en: "Your perfect look, configured.",
    it: "Il tuo look perfetto, configurato.",
  },

  seo: {
    defaultTitle: "Beauty Configurator",
    titleTemplate: "%s | Beauty Configurator",
    description: {
      en: "Build your beauty look, option by option. Bring your configuration to the studio.",
      it: "Crea il tuo look bellezza, opzione per opzione. Porta la tua configurazione in studio.",
    },
    openGraph: {
      type: "website",
      siteName: "Beauty Configurator",
    },
  },

  contact: {
    /**
     * Used in the "Send by email" CTA on the order completion page.
     * Replace with the studio's actual email address.
     */
    email: "studio@beautyconfigurator.com",

    /** Shown on the store card that the client brings to the appointment. */
    studioName: "Beauty Studio",

    /** Optional — displayed on the store card. Leave empty to hide. */
    studioAddress: "",

    /** Optional — displayed on the store card. Leave empty to hide. */
    studioPhone: "",
  },

  features: {
    /**
     * Show prices next to options and in the summary.
     * Set to false if all options are included / pricing is consultation-only.
     */
    showPricing: true,

    /**
     * Show a "Send by email" button on the completion page.
     * Uses a mailto: link — no backend required.
     */
    enableEmailOrder: true,

    /**
     * Show a "Print" / "Save as PDF" button on the completion page.
     */
    enablePrint: true,

    /**
     * Show a "Copy link" button on the completion page.
     * Copies the full order URL to the clipboard.
     */
    enableShare: true,
  },

  locales: {
    supported: ["en", "it"] as const,
    default: "en" as const,
  },
} as const;

export type Locale = (typeof siteConfig.locales.supported)[number];

export default siteConfig;
