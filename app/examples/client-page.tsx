"use client"

import type React from "react"

import { Header } from "@/components/header"
import Link from "next/link"
import { useState, useEffect } from "react"
import Breadcrumbs from "@/components/breadcrumbs"
import {
  ArrowLeft,
  Users,
  MessageCircle,
  MapPin,
  Search,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Heart,
  Lock,
  Globe,
  Smartphone,
  Link2,
  Camera,
  Activity,
  ChevronRight,
  Star,
  Sparkles,
} from "lucide-react"

interface ProfileData {
  phone: string
  checkDate: string
  checkTime: string
  reportId: string
}

interface ReportSection {
  id: string
  title: string
  icon: string
  color: string
  delay: number
  content: {
    status: string
    statusHighlight?: boolean
    findings: {
      label: string
      value: string
      note?: string
      highlight?: boolean
    }[]
    chart?: {
      title: string
      data: number[]
      labels: string[]
    }
    alert?: string
  }
}

interface SummaryStat {
  label: string
  value: number | string
  color: string
  isRisk?: boolean
}

interface ClientPageProps {
  profileData: ProfileData
  reportSections: ReportSection[]
  summaryStats: SummaryStat[]
}

const iconMap: { [key: string]: React.ElementType } = {
  Users: Users,
  MessageCircle: MessageCircle,
  Smartphone: Smartphone,
  Camera: Camera,
  Heart: Heart,
  Activity: Activity,
  MapPin: MapPin,
  ArrowLeft: ArrowLeft,
  Search: Search,
  Shield: Shield,
  CheckCircle2: CheckCircle2,
  AlertTriangle: AlertTriangle,
  Eye: Eye,
  Lock: Lock,
  Globe: Globe,
  Link2: Link2,
  Star: Star,
  Sparkles: Sparkles,
  ChevronRight: ChevronRight,
}

export default function ClientPage({ profileData, reportSections, summaryStats }: ClientPageProps) {
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [showStats, setShowStats] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({})

  // Последовательное появление секций
  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 500)

    reportSections.forEach((section, index) => {
      setTimeout(
        () => {
          setVisibleSections((prev) => [...prev, section.id])
        },
        1000 + index * 300,
      )
    })

    // Показать CTA после всех секций
    setTimeout(() => setShowCTA(true), 1000 + reportSections.length * 300 + 500)

    return () => clearTimeout(timer)
  }, [reportSections])

  // Анимация чисел в статистике
  useEffect(() => {
    if (!showStats) return

    summaryStats.forEach((stat) => {
      if (stat.isRisk || typeof stat.value !== "number") return
      const target = stat.value
      let current = 0
      const increment = Math.ceil(target / 30)
      const interval = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(interval)
        }
        setAnimatedStats((prev) => ({ ...prev, [stat.label]: current }))
      }, 50)
    })
  }, [showStats, summaryStats])

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        gradient: "from-blue-500 to-blue-600",
      },
      sky: {
        bg: "bg-sky-500/10",
        border: "border-sky-500/30",
        text: "text-sky-400",
        gradient: "from-sky-500 to-sky-600",
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
        gradient: "from-green-500 to-green-600",
      },
      pink: {
        bg: "bg-pink-500/10",
        border: "border-pink-500/30",
        text: "text-pink-400",
        gradient: "from-pink-500 to-pink-600",
      },
      orange: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        text: "text-orange-400",
        gradient: "from-orange-500 to-orange-600",
      },
      red: {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
        gradient: "from-red-500 to-red-600",
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-400",
        gradient: "from-purple-500 to-purple-600",
      },
      emerald: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        gradient: "from-emerald-500 to-emerald-600",
      },
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs />

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-6 text-sm">
              <ArrowLeft className="w-4 h-4" />
              На главную
            </div>

            <div className="inline-flex items-center justify-center gap-2 mb-3">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Демонстрационный отчёт</h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground mb-4">Пример результатов проверки на верность</p>

            {/* Информация о проверке */}
            <div className="inline-flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground bg-card/50 px-3 sm:px-5 py-2 sm:py-3 rounded-full border border-border">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span>Отчёт № {profileData.reportId}</span>
              </div>
              <span className="hidden sm:inline w-1 h-1 bg-muted-foreground rounded-full" />
              <span>Проверка: {profileData.phone}</span>
              <span className="hidden sm:inline w-1 h-1 bg-muted-foreground rounded-full" />
              <span>
                {profileData.checkDate} в {profileData.checkTime}
              </span>
            </div>
          </div>

          {/* Уведомление */}
          <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 border border-primary/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/90">
                <span className="font-semibold text-primary">Важно:</span> Это демонстрационный пример. В реальном
                отчёте вы получите полную детальную информацию по каждому пункту с прямыми ссылками на все обнаруженные
                профили.
              </p>
            </div>
          </div>

          {/* Сводная статистика */}
          <div
            className={`bg-card border border-border rounded-xl p-4 sm:p-6 mb-6 transition-all duration-700 ${showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Сводка результатов проверки
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {summaryStats.map((stat) => {
                const Icon = iconMap[stat.label] || Activity // Default icon if not found
                return (
                  <div
                    key={stat.label}
                    className={`${getColorClasses(stat.color).bg} border ${getColorClasses(stat.color).border} rounded-lg p-3 text-center`}
                  >
                    <div className={`text-2xl sm:text-3xl font-bold ${getColorClasses(stat.color).text}`}>
                      {stat.isRisk ? stat.value : animatedStats[stat.label] || 0}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Шкала риска */}
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-white">Уровень риска измены</span>
                </div>
                <span className="text-lg font-bold text-red-500">89%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full transition-all duration-1000"
                  style={{ width: showStats ? "89%" : "0%" }}
                />
              </div>
              <p className="text-xs text-red-400 mt-2">
                Обнаружены активные профили на сайтах знакомств и подозрительная скрытая активность
              </p>
            </div>
          </div>

          {/* Секции отчёта */}
          <div className="space-y-4">
            {reportSections.map((section) => {
              const Icon = iconMap[section.icon] || Users // Default icon if not found
              const colors = getColorClasses(section.color)
              const isVisible = visibleSections.includes(section.id)

              return (
                <div
                  key={section.id}
                  className={`bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  {/* Заголовок секции */}
                  <div
                    className={`${colors.bg} border-b ${colors.border} px-4 sm:px-5 py-3 flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">{section.title}</h3>
                        <p
                          className={`text-xs sm:text-sm ${section.content.statusHighlight ? "text-red-400 font-semibold" : "text-muted-foreground"}`}
                        >
                          {section.content.status}
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className={`w-5 h-5 ${colors.text}`} />
                  </div>

                  {/* Содержимое секции */}
                  <div className="p-4 sm:p-5">
                    {/* Уведомление о полном отчёте */}
                    <div className="bg-muted/30 border border-border rounded-lg p-3 mb-4 flex items-start gap-2">
                      <Eye className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        В полном отчёте вы получите детальную развёрнутую информацию по данному разделу с прямыми
                        ссылками и доказательствами.
                      </p>
                    </div>

                    {/* Найденные данные */}
                    <div className="space-y-3">
                      {section.content.findings.map((finding, index) => (
                        <div
                          key={index}
                          className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 p-2 sm:p-3 rounded-lg ${finding.highlight ? "bg-red-500/5 border border-red-500/20" : "bg-muted/20"}`}
                        >
                          <span className="text-sm text-muted-foreground flex-shrink-0">{finding.label}:</span>
                          <div className="text-right sm:text-right">
                            <span
                              className={`text-sm ${finding.highlight ? "text-red-400 font-medium" : "text-white"}`}
                            >
                              {finding.value}
                            </span>
                            {finding.note && (
                              <span className="text-xs text-primary block sm:inline sm:ml-2">{finding.note}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* График активности (если есть) */}
                    {section.content.chart && (
                      <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-3">{section.content.chart.title}</p>
                        <div className="flex items-end justify-between gap-1 sm:gap-2 h-20">
                          {section.content.chart.data.map((value, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-1">
                              <div
                                className={`w-full bg-gradient-to-t ${colors.gradient} rounded-t transition-all duration-700`}
                                style={{
                                  height: isVisible ? `${value}%` : "0%",
                                  transitionDelay: `${index * 100}ms`,
                                }}
                              />
                              <span className="text-xs text-muted-foreground">
                                {section.content.chart.labels[index]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Предупреждение (если есть) */}
                    {section.content.alert && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-400">{section.content.alert}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Итоговый CTA блок */}
          <div
            className={`mt-8 transition-all duration-700 ${showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Информационный блок */}
            <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-primary/30 rounded-2xl p-5 sm:p-8 mb-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-4">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Демонстрационный пример</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Настоящий отчёт содержит ещё более детальную информацию
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <Link2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">ПРЯМЫЕ ССЫЛКИ</p>
                    <p className="text-xs text-muted-foreground">На все скрытые профили и аккаунты</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">КРУГ ОБЩЕНИЯ</p>
                    <p className="text-xs text-muted-foreground">Информация о контактах и их совместная активность</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">СКРЫТЫЕ ДРУЗЬЯ ВК</p>
                    <p className="text-xs text-muted-foreground">Закрытые списки будут доступны вам</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">ЦИФРОВОЙ СЛЕД</p>
                    <p className="text-xs text-muted-foreground">Скрытые интересы, посещаемые сайты</p>
                  </div>
                </div>
              </div>

              <p className="text-center text-base sm:text-lg text-white/90 font-medium">
                Узнайте правду о своём партнёре с нашим профессиональным сервисом!
              </p>
            </div>

            {/* Кнопка CTA */}
            <div className="text-center">
              <Link
                href="/#check-form"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                Начать проверку
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                100% анонимно • Быстрый результат • Гарантия точности проверок
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
