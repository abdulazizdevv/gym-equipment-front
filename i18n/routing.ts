import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "uz"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Avoid automatic locale-based redirects for crawlers and first visits.
  localeDetection: false,
});
