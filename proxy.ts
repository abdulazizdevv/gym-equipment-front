import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("muskul_auth_token")

  const protectedPaths = ["/dashboard", "/history", "/result"]
  const pathname = req.nextUrl.pathname

  // Check if pathname starts with any protected path (or includes locale prefix like /uz/dashboard)
  const isProtected = protectedPaths.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(`${path}/`) ||
      pathname.match(new RegExp(`^/[^/]+${path}(/|$)`)),
  )

  if (isProtected && !token?.value) {
    const homeUrl = new URL("/", req.url)
    // Explicitly fallback to root which next-intl redirects properly
    return NextResponse.redirect(homeUrl)
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
