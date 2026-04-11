import { Suspense } from "react"
import { AnalysisResultPage } from "@/components/pages/analysis-result-page"
import { getTranslations } from "next-intl/server"
import { Metadata } from "next"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ sessionId?: string }>
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { locale } = await params
  const { sessionId } = await searchParams
  const t = await getTranslations({ locale, namespace: "Result" })

  return {
    title: t("title"),
    robots: {
      index: false,
    },
    alternates: {
      canonical: `/${locale}/result${sessionId ? `?sessionId=${sessionId}` : ""}`,
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
