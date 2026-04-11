import { HistoryPage } from "@/components/pages/history-page"
import { getTranslations } from "next-intl/server"
import { Metadata } from "next"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "History" })
  return {
    title: t("title"),
    alternates: {
      canonical: `/${locale}/history`,
    },
  }
}

export default HistoryPage
