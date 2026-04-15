import { LandingPage } from "@/components/pages/landing"
import { Metadata } from "next"
import { routing } from "@/i18n/routing"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    alternates: {
      canonical: `/${locale}`,
    },
  }
}

export default LandingPage
