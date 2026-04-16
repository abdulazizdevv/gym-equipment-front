import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { FoodHistoryPage } from "@/components/pages/food-history-page"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "FoodHistory" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/${locale}/food/history`,
    },
  }
}

export default FoodHistoryPage
