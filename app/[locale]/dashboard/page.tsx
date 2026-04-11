import { DashboardPage } from "@/components/pages/dashboard-page"
import { getTranslations } from "next-intl/server"
import { Metadata } from "next"

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
      canonical: `/${locale}/dashboard`,
    },
  }
}

export default DashboardPage
