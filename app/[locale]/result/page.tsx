import { Suspense } from "react"
import { AnalysisResultPage } from "@/components/pages/analysis-result-page"
import { getTranslations } from "next-intl/server"
import { Metadata } from "next"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Result" })

  return {
    title: t("title"),
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/${locale}/result`,
    },
  }
}

export default function Page() {
  return (
    <Suspense>
      <AnalysisResultPage />
    </Suspense>
  )
}
