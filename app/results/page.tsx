"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ResultsPage() {
  const router = useRouter()

  useEffect(() => {
    // This page is no longer used - redirect to home
    router.replace("/")
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <p>Перенаправление...</p>
      </div>
    </div>
  )
}
