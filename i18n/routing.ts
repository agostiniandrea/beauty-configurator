import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it"],
  defaultLocale: "en",
  // Default locale lives at the root (/, /configure/...), only Italian
  // gets a prefix (/it, /it/configure/...). Visiting /en redirects to /.
  localePrefix: "as-needed",
});
