"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Rocket,
  Check,
  Zap,
  Shield,
  Phone,
  MessageSquare,
  Lock,
  Eye,
  Users,
  Clock,
  Star,
  AlertTriangle,
} from "lucide-react"
import { OnlineCounter } from "./online-counter"
import Link from "next/link"
import { getOrCreateLeadId, setPhoneOrVk, upsertLead, sendYmGoal } from "@/lib/lead-tracking"

interface ConversionHeroProps {
  onStartCheck: (value: string, method: "phone" | "vk") => void
  /** Optional custom H1 for landing pages targeted at specific Яндекс Директ ads. */
  headline?: string
  /** Optional custom emotional subheading for landing pages. */
  subheading?: string
}

export function ConversionHero({ onStartCheck, headline, subheading }: ConversionHeroProps) {
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
      // 1. Create / get a unique lead_id for this user attempt.
      getOrCreateLeadId()
      // 2. Persist phone_or_vk to sessionStorage (never logged, never to Metrika, never in URL).
      setPhoneOrVk(inputValue.trim())
      // 3. Save the lead on site "Б" early (fire-and-forget, server-side only).
      void upsertLead()
      // 4. Send START_CHECK goal to counter 109840176, then start the visual check.
      //    sendYmGoal has a 300–700ms fallback so the flow never breaks if Metrika is unavailable.
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
    <section id="check-form" className="pt-20 pb-16 px-4 matrix-bg min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Online Counter */}
        <div className="flex justify-center mb-8 fade-in">
          <OnlineCounter />
        </div>

        {/* Urgency Banner */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full animate-pulse">
            <AlertTriangle className="w-4 h-4 text-yellow-400" aria-hidden="true" />
            <span className="text-yellow-400 text-sm font-medium">Узнайте правду прямо сейчас — пока не поздно!</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6 fade-in leading-tight">
          <span className="text-gradient">{headline ?? "Проверка партнера на верность онлайн"}</span>
        </h1>

        {/* Emotional Subheading */}
        <p className="text-xl sm:text-2xl md:text-3xl text-center text-white/90 mb-4 font-semibold slide-up">
          {subheading ?? (
            <>
              Узнайте <span className="text-primary">правду за 5 минут</span> — анонимно и безопасно
            </>
          )}
        </p>

        <div className="hidden md:flex flex-wrap justify-center gap-3 mb-8 text-muted-foreground">
          <span className="flex items-center gap-1 text-sm">
            <Eye className="w-4 h-4 text-primary" aria-hidden="true" /> Скрывает телефон?
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4 text-primary" aria-hidden="true" /> Задерживается допоздна?
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Users className="w-4 h-4 text-primary" aria-hidden="true" /> Появились новые "друзья"?
          </span>
        </div>

        {/* Main Conversion Card */}
        <div className="max-w-2xl mx-auto scale-in">
          <div className="relative">
            {/* Glowing border effect */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-lg opacity-50 animate-pulse"
              aria-hidden="true"
            />

            <article className="relative bg-card/95 backdrop-blur-md border border-border rounded-3xl p-6 md:p-10 shadow-2xl">
              {/* Card Header */}
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-4">
                  <Lock className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="text-primary text-sm font-semibold">100% АНОНИМНАЯ ПРОВЕРКА</span>
                </div>
                <h2 className="hidden md:block text-xl md:text-2xl font-semibold text-white/90 mb-3 leading-relaxed">
                  Узнайте тайную жизнь вашего партнёра — <span className="text-primary">с кем общается</span> в соцсетях
                  и мессенджерах, <span className="text-primary">что скрывает</span> от вас в сети
                </h2>
                <p className="hidden md:block text-white/70 text-sm">
                  Введите данные партнёра — получите <span className="text-primary font-medium">полный отчёт</span> без
                  взломов и скандалов
                </p>
                <p className="md:hidden text-white font-bold text-base leading-relaxed">
                  Для начала проверки введите данные и узнайте всю правду о его/её активности в сети прямо сейчас
                </p>
              </div>

              {/* Method Selection */}
              <div className="flex gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMethod("phone")
                    setInputValue("")
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 md:py-4 px-3 md:px-4 rounded-xl transition-all font-semibold text-sm md:text-base ${
                    method === "phone"
                      ? "bg-primary text-white shadow-lg glow-red scale-105"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                  aria-pressed={method === "phone"}
                >
                  <Phone size={20} className="md:w-[22px] md:h-[22px]" aria-hidden="true" />
                  <span className="whitespace-nowrap">По номеру</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMethod("vk")
                    setInputValue("")
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 md:py-4 px-3 md:px-4 rounded-xl transition-all font-semibold text-sm md:text-base ${
                    method === "vk"
                      ? "bg-secondary text-white shadow-lg glow-blue scale-105"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                  aria-pressed={method === "vk"}
                >
                  <MessageSquare size={20} className="md:w-[22px] md:h-[22px]" aria-hidden="true" />
                  <span className="whitespace-nowrap">По профилю ВК</span>
                </button>
              </div>

              {/* Input Field */}
              <form onSubmit={handleSubmit}>
                <div className="relative mb-6">
                  <label htmlFor="partner-input" className="sr-only">
                    {method === "phone"
                      ? "Введите номер телефона партнера"
                      : "Введите ссылку на профиль ВКонтакте партнера"}
                  </label>
                  <input
                    id="partner-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={getPlaceholder()}
                    className={`w-full px-4 md:px-5 py-4 md:py-5 bg-input border-2 rounded-xl text-white text-base md:text-lg placeholder:text-muted-foreground/60 focus:outline-none transition-all ${
                      isValid === null
                        ? "border-border focus:border-primary"
                        : isValid
                          ? "border-green-500 shadow-lg shadow-green-500/20"
                          : "border-red-500 shadow-lg shadow-red-500/20"
                    }`}
                    aria-describedby="input-hint"
                  />
                  <span id="input-hint" className="sr-only">
                    Введите номер телефона или ссылку на профиль ВКонтакте для анонимной проверки партнера на верность
                  </span>
                  {isValid !== null && (
                    <div
                      className={`absolute right-4 top-1/2 -translate-y-1/2 ${isValid ? "text-green-500" : "text-red-500"}`}
                      aria-hidden="true"
                    >
                      {isValid ? <Check size={24} /> : <span className="text-lg">✗</span>}
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
                    aria-hidden="true"
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
                    aria-hidden="true"
                  />

                  <button
                    type="submit"
                    disabled={!isValid}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative w-full py-4 md:py-5 px-6 rounded-xl text-lg md:text-xl flex items-center justify-center gap-3 transition-all duration-200"
                    style={{
                      background: isValid
                        ? "linear-gradient(135deg, #dc143c 0%, #ff2d55 30%, #ff4d6d 50%, #ff2d55 70%, #dc143c 100%)"
                        : isValid === null
                          ? "linear-gradient(135deg, #b91c3c 0%, #dc143c 30%, #ef4444 50%, #dc143c 70%, #b91c3c 100%)"
                          : "linear-gradient(135deg, #4a1525 0%, #5c1a2e 50%, #4a1525 100%)",
                      color: isValid === false ? "rgba(255,255,255,0.5)" : "#ffffff",
                      fontWeight: "800",
                      letterSpacing: "1px",
                      cursor: isValid ? "pointer" : isValid === null ? "pointer" : "not-allowed",
                      transform: isHovered && isValid ? "scale(1.03)" : "scale(1)",
                      boxShadow: isValid
                        ? `0 0 ${25 * glowPulse}px rgba(34, 197, 94, 0.6), 0 0 ${50 * glowPulse}px rgba(34, 197, 94, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)`
                        : isValid === null
                          ? `0 0 ${20 * glowPulse}px rgba(220, 20, 60, 0.5), 0 0 ${40 * glowPulse}px rgba(0, 128, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)`
                          : "0 4px 16px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Rocket
                      size={24}
                      className={`md:w-7 md:h-7 ${isHovered && isValid ? "animate-bounce" : ""}`}
                      aria-hidden="true"
                    />
                    НАЧАТЬ ПРОВЕРКУ
                  </button>
                </div>
              </form>

              <div className="flex md:hidden flex-wrap justify-center gap-2 mt-6 pt-4 border-t border-border/50">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="w-3 h-3 text-primary" aria-hidden="true" /> Скрывает телефон?
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 text-primary" aria-hidden="true" /> Задерживается допоздна?
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3 text-primary" aria-hidden="true" /> Новые "друзья"?
                </span>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-green-500" aria-hidden="true" />
                    <span className="text-lg md:text-2xl font-bold text-primary">3000+</span>
                  </div>
                  <span className="text-muted-foreground text-[10px] md:text-xs">успешных проверок</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-secondary" aria-hidden="true" />
                    <span className="text-lg md:text-2xl font-bold text-primary">5 мин</span>
                  </div>
                  <span className="text-muted-foreground text-[10px] md:text-xs">быстрый результат</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" aria-hidden="true" />
                    <span className="text-lg md:text-2xl font-bold text-primary">100%</span>
                  </div>
                  <span className="text-muted-foreground text-[10px] md:text-xs">анонимность</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 md:mt-10 text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
            ))}
          </div>
          <p className="text-muted-foreground text-xs md:text-sm">
            <span className="text-white font-semibold">4.9 из 5</span> — на основе 2,847 отзывов
          </p>
        </div>

        {/* What We Check - with internal links */}
        <div className="mt-10 md:mt-12 max-w-3xl mx-auto">
          <h3 className="text-center text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Что мы проверяем:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {[
              { name: "ВКонтакте", icon: "VK", alt: "Проверка партнера ВКонтакте" },
              { name: "Telegram", icon: "TG", alt: "Проверка партнера Telegram" },
              { name: "WhatsApp", icon: "WA", alt: "Проверка партнера WhatsApp" },
              { name: "Instagram", icon: "IG", alt: "Проверка партнера Instagram" },
              { name: "Сайты знакомств", icon: "💕", alt: "Проверка на сайтах знакомств" },
              { name: "Скрытые друзья", icon: "👥", alt: "Поиск скрытых друзей" },
              { name: "Удалённые профили", icon: "🗑️", alt: "Поиск удалённых профилей" },
              { name: "Геолокации", icon: "📍", alt: "Анализ геолокаций" },
            ].map((service) => (
              <div
                key={service.name}
                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-muted/50 rounded-xl border border-border"
                title={service.alt}
              >
                <span className="text-base md:text-lg" role="img" aria-label={service.alt}>
                  {service.icon}
                </span>
                <span className="text-white text-xs md:text-sm font-medium">{service.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Links Section - SEO анкоры */}
        <nav className="mt-10 md:mt-12 max-w-2xl mx-auto" aria-label="Полезные ссылки">
          <h3 className="text-center text-base md:text-lg font-bold text-white mb-4">Полезная информация:</h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <Link
              href="/blog"
              className="px-3 md:px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg border border-border text-white text-xs md:text-sm transition-colors"
            >
              Статьи о верности партнера
            </Link>
            <Link
              href="/#check-form"
              className="px-3 md:px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg border border-primary/30 text-primary text-xs md:text-sm transition-colors"
            >
              Проверить партнера анонимно
            </Link>
            <a
              href="https://t.me/VernostOnlineSupportBot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 md:px-4 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg border border-secondary/30 text-secondary text-xs md:text-sm transition-colors"
            >
              Консультация 24/7
            </a>
          </div>
        </nav>

        {/* Guarantee */}
        <div className="mt-8 md:mt-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-3 md:p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-500 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-green-400 font-bold text-sm md:text-base">Гарантия конфиденциальности</p>
              <p className="text-green-400/80 text-xs md:text-sm">
                Партнёр никогда не узнает о проверке. Все данные защищены.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
