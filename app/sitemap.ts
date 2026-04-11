import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://muskul.fit"
  const locales = ["en", "ru", "uz"]
  const routes = [
    { path: "", priority: 1, changeFrequency: "daily" as const },
    { path: "/auth", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/dashboard", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/history", priority: 0.7, changeFrequency: "weekly" as const },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })
    })
  })

  return sitemapEntries
}
