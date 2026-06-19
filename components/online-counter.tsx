"use client"

import { useState, useEffect } from "react"
import { Users } from "lucide-react"

export function OnlineCounter() {
  const [count, setCount] = useState(4)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(Math.floor(Math.random() * 5) + 2) // 2-6 users
    }, 40000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-green-500/30">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <Users size={14} className="text-green-500" />
      <span className="text-sm text-muted-foreground">
        На сайте — <span className="text-green-500 font-semibold">{count}</span> пользователя онлайн
      </span>
    </div>
  )
}
