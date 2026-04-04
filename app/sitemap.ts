import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"

const BASE_URL = "https://muskul.fit"

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []

  const pages = [
    { url: "/", priority: 1, changeFrequency: "daily" as const },
    { url: "/auth", priority: 0.8, changeFrequency: "monthly" as const },
    // Dashboard, Result and History are protected and user specific, but it is harmless to let Google see the login redirect for the localized versions. To maximize SEO power on entry pages:
  ]

  pages.forEach((page) => {
    // Determine languages for the alternate objects
    const languages: Record<string, string> = {}
    routing.locales.forEach((locale) => {
      languages[locale] =
        `${BASE_URL}/${locale}${page.url === "/" ? "" : page.url}`
    })

    // Create entry per locale for this page segment
    routing.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page.url === "/" ? "" : page.url}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      })
    })
  })

  return sitemapEntries
}
