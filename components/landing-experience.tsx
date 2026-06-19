"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VerificationAnimation } from "@/components/verification-animation"
import { ResultsPage } from "@/components/results-page"
import { ConversionHero } from "@/components/conversion-hero"
import { TopArticles } from "@/components/top-articles"
import { persistTrackingParams } from "@/lib/lead-tracking"

type PageState = "home" | "verification" | "results"

interface LandingExperienceProps {
  /** Custom H1 matched to the Яндекс Директ ad that drove the click. */
  headline?: string
  /** Custom emotional subheading matched to the ad. */
  subheading?: string
}

/**
 * Shared interactive experience used by the main page and every dedicated
 * Яндекс Директ landing page. It keeps the exact same проверка flow
 * (форма → анимация → результат) and tracking, only swapping the SEO headline.
 */
export function LandingExperience({ headline, subheading }: LandingExperienceProps) {
  const [pageState, setPageState] = useState<PageState>("home")
  const [inputData, setInputData] = useState({ value: "", method: "phone" as "phone" | "vk" })
  const formRef = useRef<HTMLDivElement>(null)

  // Сохраняем yclid + UTM при первом заходе для кросс-доменной аналитики Яндекс Директ
  useEffect(() => {
    persistTrackingParams()
  }, [])

  const handleStartCheck = (value: string, method: "phone" | "vk") => {
    setInputData({ value, method })
    setPageState("verification")
    window.history.pushState(null, "", window.location.href)
  }

  useEffect(() => {
    if (pageState === "verification" || pageState === "results") {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [pageState])

  const handleVerificationComplete = () => {
    setPageState("results")
  }

  if (pageState === "verification") {
    return (
      <VerificationAnimation
        inputValue={inputData.value}
        method={inputData.method}
        onComplete={handleVerificationComplete}
      />
    )
  }

  if (pageState === "results") {
    return <ResultsPage />
  }

  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main>
        <div id="check-form" ref={formRef}>
          <ConversionHero onStartCheck={handleStartCheck} headline={headline} subheading={subheading} />
        </div>
        <TopArticles />
      </main>
      <Footer />
    </div>
  )
}
