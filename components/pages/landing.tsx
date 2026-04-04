import {
  Camera,
  Cpu,
  Zap,
  Target,
  ArrowRight,
  Dumbbell,
  Brain,
  ChevronRight,
} from "lucide-react"
import { getTranslations } from "next-intl/server"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { Link } from "@/i18n/navigation"
import {
  LandingHeaderAuth,
  LandingHeroAuth,
  LandingCtaAuth,
} from "@/components/ui/landing-auth"

export async function LandingPage() {
  const t = await getTranslations("Landing")
  const tc = await getTranslations("Common")

  const features = [
    { icon: Camera, title: t("feature1Title"), description: t("feature1Desc") },
    { icon: Brain, title: t("feature2Title"), description: t("feature2Desc") },
    { icon: Target, title: t("feature3Title"), description: t("feature3Desc") },
    { icon: Zap, title: t("feature4Title"), description: t("feature4Desc") },
  ]

  const stats = [
    { value: "500+", label: t("statEquipment") },
    { value: "50+", label: t("statGroups") },
    { value: "99%", label: t("statAccuracy") },
    { value: "2s", label: t("statTime") },
  ]

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 z-50 w-full glass pt-[max(0.5rem,env(safe-area-inset-top))]">
        <div className="container mx-auto flex min-h-14 items-center justify-between gap-2 px-3 sm:min-h-16 sm:gap-3 sm:px-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
              <Dumbbell className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display truncate text-base font-bold text-foreground sm:text-lg">
              Mus<span className="text-primary">kul</span>
            </span>
          </Link>
          <div className="flex min-w-0 max-w-[calc(100%-8rem)] flex-1 items-center justify-end gap-1.5 sm:max-w-none sm:flex-none sm:gap-3">
            <LocaleSwitcher className="shrink-0" />
            <LandingHeaderAuth />
          </div>
        </div>
      </nav>

      <section className="gradient-mesh relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="animate-pulse-glow absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div
          className="animate-pulse-glow absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pt-28">
          <div className="mx-auto max-w-4xl space-y-6 text-center sm:space-y-8">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary sm:px-4 sm:text-sm">
              <Cpu className="h-3.5 w-3.5" />
              {t("badgePowered")}
            </div>

            <h1 className="font-display text-3xl leading-[1.15] font-bold tracking-tight sm:text-5xl md:text-7xl">
              {t("heroBefore")}
              <span className="text-gradient">{t("heroGradient")}</span>
              {t("heroAfter")}
            </h1>

            <p className="mx-auto max-w-2xl px-1 text-base leading-relaxed text-muted-foreground sm:px-0 sm:text-lg md:text-xl">
              {t("heroSubtitle")}
            </p>

            <LandingHeroAuth />
          </div>

          <div className="mx-auto mt-12 max-w-5xl sm:mt-20">
            <div className="glow-primary glass rounded-2xl p-1 sm:p-1.5">
              <div className="overflow-hidden rounded-xl bg-card">
                <div className="flex min-w-0 items-center gap-2 border-b border-border px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-destructive/60 sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary/40 sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary/60 sm:h-3 sm:w-3" />
                  <span className="ml-1 min-w-0 truncate font-body text-[10px] text-muted-foreground sm:ml-3 sm:text-xs">
                    {t("mockWindow")}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-6 p-4 sm:gap-8 sm:p-8 md:flex-row md:p-12">
                  <div className="w-full flex-1">
                    <div className="space-y-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-5 text-center sm:p-8">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <Camera className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("mockUploadHint")}
                      </p>
                      <div className="inline-flex rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
                        {t("mockUploadBtn")}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex-1 space-y-4">
                    <div className="glass space-y-2 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                        <span className="text-xs font-medium text-primary">
                          {t("mockResultLabel")}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-foreground">
                        {t("mockEquipmentName")}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t("mockEquipmentDesc")}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["Latissimus", "Biceps", "Rhomboids"].map((m) => (
                        <div
                          key={m}
                          className="glass rounded-lg p-2 text-center"
                        >
                          <span className="text-[10px] font-medium text-primary">
                            {m}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="space-y-1.5 text-center sm:space-y-2"
              >
                <div className="font-display text-2xl font-bold text-gradient sm:text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-mesh py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 space-y-3 text-center sm:mb-16 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase sm:text-xs">
              {t("capabilities")}
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-5xl">
              {t("howItWorks")}
            </h2>
            <p className="mx-auto max-w-lg px-2 text-sm text-muted-foreground sm:px-0 sm:text-base">
              {t("howItWorksDesc")}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative space-y-3 overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:border-primary/30 sm:space-y-4 sm:p-6"
              >
                <div className="absolute top-0 right-0 pr-3 font-display text-6xl font-bold text-foreground/[0.03]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-shadow group-hover:glow-primary">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="glass relative mx-auto max-w-3xl overflow-hidden rounded-2xl p-6 text-center space-y-5 sm:rounded-3xl sm:p-12 sm:space-y-6">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5" />
            <div className="relative z-10 space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                {t("ctaBannerTitle")}
              </h2>
              <p className="mx-auto max-w-md px-1 text-sm text-muted-foreground sm:px-0 sm:text-base">
                {t("ctaBannerDesc")}
              </p>
              <LandingCtaAuth />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-bold text-foreground">
              Mus<span className="text-primary">kul</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {tc("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </div>
  )
}
