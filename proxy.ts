import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("muskul_auth_token")

  const protectedPaths = [
    "/equipment",
    "/dashboard",
    "/history",
    "/result",
    "/food",
    "/food/history",
    "/food/result",
  ]
  const pathname = req.nextUrl.pathname

  const isProtected = protectedPaths.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(`${path}/`) ||
      pathname.match(new RegExp(`^/[^/]+${path}(/|$)`)),
  )

  if (isProtected && !token?.value) {
    // 🔥 locale ni olish
    const segments = pathname.split("/")
    const locale = segments[1] || "en"

    const homeUrl = new URL(`/${locale}`, req.url)

    return NextResponse.redirect(homeUrl)
  }

  return intlMiddleware(req)
}
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
