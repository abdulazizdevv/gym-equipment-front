import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"

const BASE_URL = "https://muskul.fit"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: "", priority: 1, changeFrequency: "daily" as const },
    { url: "/auth", priority: 0.8, changeFrequency: "monthly" as const },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  pages.forEach((page) => {
    // Collect all translations first for alternates
    const languages: Record<string, string> = {}
    routing.locales.forEach((locale) => {
      languages[locale] = `${BASE_URL}/${locale}${page.url}`
    })

    // Create entry per locale for this page
    routing.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page.url}`,
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
