"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { persistTrackingParams, sendYmHit, isDebugMetrika, YM_COUNTER_ID } from "@/lib/lead-tracking"

/**
 * Handles SPA navigation hits for Yandex Metrika counter 109840176.
 * - Persists yclid + UTM on first load (for cross-domain analytics with site "Б").
 * - Skips the FIRST hit (the counter init already fires the first pageview)
 *   to avoid a double first pageview.
 * - Sends a manual hit with the full URL on every subsequent SPA navigation.
 */
export function MetrikaTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstHit = useRef(true)

  // Persist tracking params once, as early as possible.
  useEffect(() => {
    persistTrackingParams()
    if (isDebugMetrika() && typeof window !== "undefined") {
      console.info("[metrika]", "init", {
        counterId: YM_COUNTER_ID,
        url: window.location.href,
      })
    }
  }, [])

  useEffect(() => {
    if (isFirstHit.current) {
      // Skip the first hit — counter init already counted it.
      isFirstHit.current = false
      return
    }
    sendYmHit()
  }, [pathname, searchParams])

  return null
}
