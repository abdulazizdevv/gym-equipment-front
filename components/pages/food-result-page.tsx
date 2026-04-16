"use client"

import { useMemo } from "react"
import { useLocale, useTranslations } from "next-intl"
import {
  BicepsFlexed,
  UtensilsCrossed,
  ArrowLeft,
  Info,
  ChevronRight,
  Flame,
  Beef,
  Droplets,
  Wheat,
  Leaf,
  Apple,
  AlertTriangle,
} from "lucide-react"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { HeaderActionLink } from "@/components/ui/header-action"
import { Link } from "@/i18n/navigation"

const mockFoodResult = {
  name: {
    uz: "Osh (Palov)",
    ru: "Узбекский плов",
    en: "Uzbek Pilaf (Plov)",
  },
  category: "Main dish",
  servingSize: "350g",
  calories: 520,
  nutrition: {
    proteins: { value: 22, unit: "g", percentage: 44, color: "primary" },
    fats: { value: 18, unit: "g", percentage: 28, color: "accent" },
    carbs: { value: 65, unit: "g", percentage: 72, color: "primary" },
    fiber: { value: 3.2, unit: "g", percentage: 13, color: "accent" },
  },
  ingredients: [
    { name: "Guruch (Rice)", amount: "200g", calories: 260 },
    { name: "Mol go'shti (Beef)", amount: "80g", calories: 160 },
    { name: "Sabzi (Carrots)", amount: "50g", calories: 20 },
    { name: "Piyoz (Onion)", amount: "30g", calories: 12 },
    { name: "O'simlik yog'i", amount: "15ml", calories: 68 },
  ],
  healthTips: {
    uz: [
      "Kaloriya yuqori - faol mashg'ulotdan keyin iste'mol qiling",
      "Oqsil miqdori yaxshi - mushak tiklash uchun foydali",
      "Sabzavotli variantini tanlang - tolalar ko'proq bo'ladi",
      "Porsiyani nazorat qiling - 350g dan oshmasin",
    ],
    ru: [
      "Высокая калорийность - употребляйте после активной тренировки",
      "Хорошее содержание белка - полезно для восстановления мышц",
      "Выбирайте вариант с овощами - больше клетчатки",
      "Контролируйте порцию - не более 350г",
    ],
    en: [
      "High calorie - consume after an active workout",
      "Good protein content - beneficial for muscle recovery",
      "Choose the vegetable variant - more fiber",
      "Control portion - no more than 350g",
    ],
  },
}

export function FoodResultPage() {
  const t = useTranslations("FoodResult")
  const tc = useTranslations("Common")
  const locale = useLocale() as "uz" | "ru" | "en"

  const tips = useMemo(() => mockFoodResult.healthTips[locale] ?? mockFoodResult.healthTips.en, [locale])
  const foodName = useMemo(() => mockFoodResult.name[locale] ?? mockFoodResult.name.en, [locale])

  return (
    <div className="gradient-mesh min-h-screen bg-background">
      <header className="glass sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
        <div className="container mx-auto flex min-h-14 items-center justify-between gap-2 px-3 sm:min-h-16 sm:px-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
              <BicepsFlexed className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display truncate text-base font-bold text-foreground sm:text-lg">
              Mus<span className="text-primary">kul</span>
            </span>
          </Link>
          <div className="-mr-1 flex min-w-0 max-w-[min(100%,calc(100vw-5.5rem))] flex-nowrap items-center justify-end gap-1 overflow-x-auto overflow-y-hidden py-0.5 [-webkit-overflow-scrolling:touch] sm:mr-0 sm:max-w-none sm:gap-3 sm:overflow-visible sm:py-0">
            <LocaleSwitcher className="shrink-0" />
            <HeaderActionLink
              href="/food"
              icon={<ArrowLeft className="h-4 w-4 shrink-0" />}
              label={tc("back")}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-3 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="glass overflow-hidden rounded-2xl">
              <div className="flex aspect-4/3 items-center justify-center bg-secondary">
                <UtensilsCrossed className="h-16 w-16 text-muted-foreground/20" />
              </div>
              <div className="space-y-2 p-4 sm:space-y-3 sm:p-5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                  <span className="text-xs font-medium text-accent">
                    {t("detected")}
                  </span>
                </div>
                <h1 className="font-display text-xl font-bold break-words text-foreground sm:text-2xl">
                  {foodName}
                </h1>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {mockFoodResult.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass space-y-3 rounded-2xl p-4 text-center sm:p-6">
              <Flame className="mx-auto h-8 w-8 text-accent" />
              <div>
                <p className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {mockFoodResult.calories}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("calories")} · {t("perServing")}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("servingSize")}: {mockFoodResult.servingSize}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Beef,
                  label: t("proteins"),
                  value: `${mockFoodResult.nutrition.proteins.value}g`,
                  color: "text-primary",
                },
                {
                  icon: Droplets,
                  label: t("fats"),
                  value: `${mockFoodResult.nutrition.fats.value}g`,
                  color: "text-accent",
                },
                {
                  icon: Wheat,
                  label: t("carbs"),
                  value: `${mockFoodResult.nutrition.carbs.value}g`,
                  color: "text-primary",
                },
                {
                  icon: Leaf,
                  label: t("fiber"),
                  value: `${mockFoodResult.nutrition.fiber.value}g`,
                  color: "text-accent",
                },
              ].map((macro) => (
                <div key={macro.label} className="glass space-y-1 rounded-xl p-3 text-center sm:p-4">
                  <macro.icon className={`mx-auto h-5 w-5 ${macro.color}`} />
                  <p className="text-xs text-muted-foreground">{macro.label}</p>
                  <p className="font-display text-sm font-semibold text-foreground">
                    {macro.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <div className="glass space-y-4 rounded-2xl p-4 sm:space-y-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Apple className="h-4 w-4 shrink-0 text-accent" />
                <h2 className="font-display text-base font-semibold text-foreground sm:text-lg">
                  {t("nutritionFacts")}
                </h2>
              </div>

              {Object.entries(mockFoodResult.nutrition).map(([key, data]) => {
                const labelKey = key as "proteins" | "fats" | "carbs" | "fiber"
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {t(labelKey)}
                      </span>
                      <span className="font-display text-sm font-bold text-foreground">
                        {data.value}
                        {data.unit}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          data.color === "primary"
                            ? "bg-linear-to-r from-primary to-primary/60"
                            : "bg-linear-to-r from-accent to-accent/60"
                        }`}
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="glass space-y-3 rounded-2xl p-4 sm:space-y-4 sm:p-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 shrink-0 text-accent" />
                <h2 className="font-display text-base font-semibold text-foreground sm:text-lg">
                  {t("ingredients")}
                </h2>
              </div>
              <div className="space-y-3">
                {mockFoodResult.ingredients.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 border-b border-border py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:py-2"
                  >
                    <div className="flex min-w-0 items-start gap-3 sm:items-center">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <span className="font-display text-xs font-bold text-accent">
                          {i + 1}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.amount}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 self-start pl-10 font-display text-xs font-semibold text-muted-foreground sm:self-center sm:pl-0">
                      {item.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass space-y-3 rounded-2xl p-4 sm:space-y-4 sm:p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-accent" />
                <h2 className="font-display text-base font-semibold text-foreground sm:text-lg">
                  {t("healthTips")}
                </h2>
              </div>
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/food"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-display font-semibold text-foreground transition-colors hover:bg-secondary sm:min-h-14 sm:py-4 sm:text-base"
            >
              {t("newAnalysis")}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
