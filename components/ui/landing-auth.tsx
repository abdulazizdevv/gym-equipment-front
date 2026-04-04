"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { LayoutDashboard, ArrowRight, ChevronRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { LinkButton } from "@/components/ui/link-button"
import { useAuthStore } from "@/stores/auth"

export function LandingHeaderAuth() {
  const tc = useTranslations("Common")
  const token = useAuthStore((s) => s.token)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-8 w-16 animate-pulse rounded-lg bg-secondary/50 sm:h-9 sm:w-20" />
    )
  }

  if (token) {
    return (
      <Link
        href="/dashboard"
        className="flex shrink-0 items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20 sm:px-4 sm:text-sm"
      >
        <LayoutDashboard className="h-4 w-4" />
        {tc("dashboard")}
      </Link>
    )
  }

  return (
    <>
      <Link
        href="/auth"
        className="shrink-0 px-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
      >
        {tc("login")}
      </Link>
      <Link
        href="/auth?mode=signup"
        className="shrink-0 whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-center text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-4 sm:text-sm"
      >
        {tc("getStarted")}
      </Link>
    </>
  )
}

export function LandingHeroAuth() {
  const t = useTranslations("Landing")
  const token = useAuthStore((s) => s.token)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-4 sm:pt-4">
        <div className="h-11 md:h-12 w-full animate-pulse rounded-xl bg-secondary/50 sm:w-40" />
        <div className="h-11 md:h-12 w-full animate-pulse rounded-xl bg-secondary/50 sm:w-40" />
      </div>
    )
  }

  if (token) {
    return (
      <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4">
        <LinkButton
          href="/dashboard"
          variant="primary"
          size="lg"
          className="group w-full sm:w-auto sm:px-8"
        >
          {t("goToDashboard")}
          <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
        </LinkButton>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4">
      <LinkButton
        href="/auth?mode=signup"
        variant="primary"
        size="lg"
        className="group w-full sm:w-auto sm:px-8"
      >
        {t("ctaFree")}
        <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
      </LinkButton>
      <LinkButton
        href="/auth"
        variant="outline"
        size="lg"
        className="w-full sm:w-auto sm:px-8"
      >
        {t("ctaDemo")}
      </LinkButton>
    </div>
  )
}

export function LandingCtaAuth() {
  const t = useTranslations("Landing")
  const token = useAuthStore((s) => s.token)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-11 md:h-12 w-full animate-pulse rounded-xl bg-secondary/50" />
    )
  }

  if (token) {
    return (
      <LinkButton
        href="/dashboard"
        variant="primary"
        size="lg"
        className="group w-full"
      >
        {t("goToDashboard")}
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </LinkButton>
    )
  }

  return (
    <LinkButton
      href="/auth?mode=signup"
      variant="primary"
      size="lg"
      className="group w-full"
    >
      {t("ctaBannerBtn")}
      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </LinkButton>
  )
}
