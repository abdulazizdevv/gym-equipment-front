import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { FoodResultPage } from "@/components/pages/food-result-page"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "FoodResult" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/${locale}/food/result`,
    },
  }
}

export default FoodResultPage
