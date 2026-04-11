"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import {
  BicepsFlexed,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react"
import { toast } from "sonner"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import { Link, useRouter } from "@/i18n/navigation"
import { loginLocal, registerLocal } from "@/lib/api/auth"
import { getApiErrorMessage } from "@/lib/api/http"
import { useAuthStore } from "@/stores/auth"
import { signIn, useSession } from "next-auth/react"

export function AuthPage() {
  const t = useTranslations("Auth")
  const router = useRouter()
  const params = useParams()
  const setAuth = useAuthStore((s) => s.setAuth)
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const [isSignup, setIsSignup] = useState(mode === "signup")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsSignup(mode === "signup")
  }, [mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      const email = formData.email.trim()

      const res = isSignup
        ? await registerLocal({
            name: formData.name.trim(),
            email,
            password: formData.password,
          })
        : await loginLocal({
            email,
            password: formData.password,
          })

      setAuth({ token: res.token, user: res.user })
      toast.success(res.message || "Success")
      router.push("/dashboard")
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const bullets = [t("bullet1"), t("bullet2"), t("bullet3")]

  return (
    <div className="gradient-mesh flex min-h-screen bg-background">
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden lg:flex">
        <div className="animate-pulse-glow absolute top-1/3 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="animate-pulse-glow absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 max-w-md space-y-8 p-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <BicepsFlexed className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              Mus<span className="text-primary">kul</span>
            </span>
          </Link>

          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-foreground">
              {t("sideTitle")}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {t("sideSubtitle")}
            </p>
          </div>

          <div className="space-y-4">
            {bullets.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-10 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pb-12 sm:pt-12">
        <div className="w-full max-w-sm space-y-6 sm:space-y-8">
          <div className="flex justify-end">
            <LocaleSwitcher />
          </div>
          <div className="flex justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                <BicepsFlexed className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                Mus<span className="text-primary">kul</span>
              </span>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {isSignup ? t("titleSignUp") : t("titleSignIn")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignup ? t("subtitleSignUp") : t("subtitleSignIn")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {t("name")}
                </label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 pr-4"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {t("email")}
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 pr-4"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {t("password")}
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 pr-10"
                />
                <IconButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={
                    showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )
                  }
                  variant="ghost"
                  size="sm"
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSignup ? t("submitSignUp") : t("submitSignIn")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">{t("or")}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full gap-3"
            onClick={() => {
              // Get the current locale from useParams
              const locale = (params.locale as string) || "en"
              signIn("google", {
                callbackUrl: `/${locale}/auth/google-callback`,
              })
            }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t("google")}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? t("hasAccount") : t("noAccount")}{" "}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="font-medium text-primary hover:underline"
            >
              {isSignup ? t("linkSignIn") : t("linkSignUp")}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
