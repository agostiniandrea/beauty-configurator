import type { MetadataRoute } from "next";
import { getLooks } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Lists the home page, the two legal pages, and every look's configure page,
 * in both locales (en at the root, it under /it — see i18n/routing.ts).
 * Deliberately excludes /summary and /complete: they're mid-funnel steps
 * that only make sense with a selection in the query string, not pages a
 * search engine should land a visitor on directly.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const looks = getLooks();
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { en: siteUrl, it: `${siteUrl}/it` },
      },
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { en: `${siteUrl}/privacy`, it: `${siteUrl}/it/privacy` },
      },
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { en: `${siteUrl}/cookies`, it: `${siteUrl}/it/cookies` },
      },
    },
  ];

  for (const look of looks) {
    entries.push({
      url: `${siteUrl}/configure/${look.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/configure/${look.id}`,
          it: `${siteUrl}/it/configure/${look.id}`,
        },
      },
    });
  }

  return entries;
}
