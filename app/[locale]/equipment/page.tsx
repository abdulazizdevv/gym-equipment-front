import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { DashboardPage } from "@/components/pages/dashboard-page"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Dashboard" })

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/equipment`,
    },
  }
}

export default DashboardPage
