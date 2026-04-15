import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/auth",
        "/dashboard",
        "/history",
        "/result",
        "/auth/google-callback",
        "/ru/auth",
        "/ru/dashboard",
        "/ru/history",
        "/ru/result",
        "/ru/auth/google-callback",
        "/uz/auth",
        "/uz/dashboard",
        "/uz/history",
        "/uz/result",
        "/uz/auth/google-callback",
      ],
    },
    host: "https://muskul.fit",
    sitemap: "https://muskul.fit/sitemap.xml",
  }
}
