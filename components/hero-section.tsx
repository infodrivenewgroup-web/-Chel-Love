"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Rocket, Check, Zap, Shield, Phone, MessageSquare } from "lucide-react"
import { OnlineCounter } from "./online-counter"
import { getOrCreateLeadId, setPhoneOrVk, upsertLead, sendYmGoal } from "@/lib/lead-tracking"

interface HeroSectionProps {
  onStartCheck: (value: string, method: "phone" | "vk") => void
}

export function HeroSection({ onStartCheck }: HeroSectionProps) {
  const [method, setMethod] = useState<"phone" | "vk">("phone")
  const [inputValue, setInputValue] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [borderAngle, setBorderAngle] = useState(0)
  const [glowIntensity, setGlowIntensity] = useState(0)

  useEffect(() => {
    const borderInterval = setInterval(() => {
      setBorderAngle((prev) => (prev + 2) % 360)
    }, 20)

    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => (prev + 1) % 100)
    }, 30)

    return () => {
      clearInterval(borderInterval)
      clearInterval(glowInterval)
    }
  }, [])

  const validateInput = (value: string) => {
    if (!value.trim()) {
      setIsValid(null)
      return
    }

    if (method === "phone") {
      const phoneRegex = /^(\+7|8|7)[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/
      const cleanPhone = value.replace(/[\s-]/g, "")
      setIsValid(phoneRegex.test(value) || (cleanPhone.length >= 11 && cleanPhone.length <= 12))
    } else {
      const vkRegex = /^(https?:\/\/)?(www\.)?(vk\.com|vkontakte\.ru)\/(id\d+|[a-zA-Z0-9_.]+)$/
      setIsValid(vkRegex.test(value))
    }
  }

  useEffect(() => {
    validateInput(inputValue)
  }, [inputValue, method])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid && inputValue.trim()) {
      getOrCreateLeadId()
      setPhoneOrVk(inputValue.trim())
      void upsertLead()
      sendYmGoal("START_CHECK", () => {
        onStartCheck(inputValue, method)
      })
    }
  }

  const getPlaceholder = () => {
    return method === "phone" ? "+7 XXX XXX XX XX" : "vk.com/id123456789"
  }

  const glowPulse = Math.sin((glowIntensity / 100) * Math.PI * 2) * 0.4 + 0.6

  return (
    <section id="check-form" className="pt-24 pb-12 px-4 matrix-bg min-h-[90vh] flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Online Counter */}
        <div className="flex justify-center mb-6 fade-in">
          <OnlineCounter />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 fade-in">
          <span className="text-gradient">ПРОВЕРКА ПАРТНЕРА</span>
          <br />
          <span className="text-white">НА ИЗМЕНУ ЗА 5 МИНУТ</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-center text-muted-foreground mb-8 max-w-2xl mx-auto slide-up">
          Узнайте изменяет ли муж или жена через соцсети и мессенджеры.{" "}
          <span className="text-primary font-semibold">Анонимная проверка</span> и{" "}
          <span className="text-primary font-semibold">гарантированный результат</span>
        </p>

        {/* Conversion Form */}
        <div className="max-w-xl mx-auto scale-in">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Method Selection */}
            <h2 className="text-xl font-semibold text-center mb-6">Проверить партнера по:</h2>

            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMethod("phone")
                  setInputValue("")
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                  method === "phone"
                    ? "bg-primary text-white shadow-lg glow-red"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                <Phone size={20} />
                <span className="font-medium">Номеру телефона</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod("vk")
                  setInputValue("")
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                  method === "vk"
                    ? "bg-secondary text-white shadow-lg glow-blue"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                <MessageSquare size={20} />
                <span className="font-medium">Профилю ВК</span>
              </button>
            </div>

            {/* Input Field */}
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={getPlaceholder()}
                  className={`w-full px-4 py-4 bg-input border-2 rounded-xl text-white placeholder:text-muted-foreground/60 focus:outline-none transition-all ${
                    isValid === null
                      ? "border-border focus:border-primary"
                      : isValid
                        ? "border-green-500 shadow-lg shadow-green-500/20"
                        : "border-red-500 shadow-lg shadow-red-500/20"
                  }`}
                  aria-label="Введите номер телефона или ссылку на профиль ВК для проверки партнера"
                />
                {isValid !== null && (
                  <div
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${isValid ? "text-green-500" : "text-red-500"}`}
                  >
                    {isValid ? <Check size={20} /> : <span className="text-sm">✗</span>}
                  </div>
                )}
              </div>

              <div className="relative">
                {/* Animated gradient border */}
                <div
                  className="absolute -inset-[3px] rounded-2xl"
                  style={{
                    background: isValid
                      ? `linear-gradient(${borderAngle}deg, #22c55e, #4ade80, #86efac, #22c55e)`
                      : `linear-gradient(${borderAngle}deg, #dc143c, #ff4d6d, #0080ff, #3b82f6, #dc143c)`,
                    opacity: isValid === false ? 0.3 : glowPulse,
                    filter: `blur(${isValid ? 2 : 1}px)`,
                  }}
                />

                {/* Button glow effect */}
                <div
                  className="absolute -inset-[6px] rounded-2xl pointer-events-none"
                  style={{
                    background: isValid
                      ? "transparent"
                      : `radial-gradient(ellipse at center, rgba(220, 20, 60, ${0.3 * glowPulse}) 0%, rgba(0, 128, 255, ${0.2 * glowPulse}) 50%, transparent 70%)`,
                    filter: "blur(8px)",
                  }}
                />

                <button
                  type="submit"
                  disabled={!isValid}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative w-full py-4 px-6 rounded-xl text-lg flex items-center justify-center gap-3 transition-all duration-200"
                  style={{
                    background: isValid
                      ? "linear-gradient(135deg, #dc143c 0%, #ff2d55 30%, #ff4d6d 50%, #ff2d55 70%, #dc143c 100%)"
                      : isValid === null
                        ? "linear-gradient(135deg, #b91c3c 0%, #dc143c 30%, #ef4444 50%, #dc143c 70%, #b91c3c 100%)"
                        : "linear-gradient(135deg, #4a1525 0%, #5c1a2e 50%, #4a1525 100%)",
                    color: isValid === false ? "rgba(255,255,255,0.5)" : "#ffffff",
                    fontWeight: "bold",
                    fontSize: "18px",
                    letterSpacing: "0.5px",
                    cursor: isValid ? "pointer" : isValid === null ? "pointer" : "not-allowed",
                    transform: isHovered && isValid ? "scale(1.03)" : "scale(1)",
                    boxShadow: isValid
                      ? `0 0 ${25 * glowPulse}px rgba(34, 197, 94, 0.6), 0 0 ${50 * glowPulse}px rgba(34, 197, 94, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)`
                      : isValid === null
                        ? `0 0 ${20 * glowPulse}px rgba(220, 20, 60, 0.5), 0 0 ${40 * glowPulse}px rgba(0, 128, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)`
                        : "0 4px 16px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Rocket size={24} className={isHovered && isValid ? "animate-bounce" : ""} />
                  НАЧАТЬ ПРОВЕРКУ
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Check className="text-green-500" size={16} />
                <span className="text-primary font-semibold">3000+</span>
                <span className="text-muted-foreground">успешных проверок</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="text-secondary" size={16} />
                <span className="text-primary font-semibold">5 минут</span>
                <span className="text-muted-foreground">— быстрый результат</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="text-primary" size={16} />
                <span className="text-primary font-semibold">100%</span>
                <span className="text-muted-foreground">анонимность</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
