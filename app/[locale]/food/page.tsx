import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { FoodDashboardPage } from "@/components/pages/food-dashboard-page"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "FoodDashboard" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/food`,
    },
  }
}

export default FoodDashboardPage
