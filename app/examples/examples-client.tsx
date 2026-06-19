"use client"

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
  Heart,
  Lock,
  Camera,
  ChevronRight,
  Star,
  Sparkles,
} from "lucide-react"

// Данные проверяемого человека
const profileData = {
  phone: "+7 (9XX) XXX-XX-47",
  checkDate: "12.12.2025",
  checkTime: "14:32",
  reportId: "VER-2025-48291",
}

// Секции отчёта с данными
const reportSections = [
  {
    id: "vk",
    title: "ВКонтакте",
    icon: Users,
    color: "blue",
    delay: 0,
    content: {
      status: "Обнаружен основной профиль",
      findings: [
        { label: "ID профиля", value: "id2847XXXXX", note: "(В полном отчёте — прямая ссылка)" },
        { label: "Имя профиля", value: "Александр М.", note: "" },
        { label: "Статус профиля", value: "Активен, последний визит: сегодня в 11:24", note: "", highlight: true },
        { label: "Скрытые друзья", value: "47 контактов в скрытом списке", note: "", warning: true },
        { label: "Закрытые альбомы", value: "3 альбома со скрытым доступом", note: "", warning: true },
      ],
    },
  },
  {
    id: "telegram",
    title: "Telegram",
    icon: MessageCircle,
    color: "cyan",
    delay: 200,
    content: {
      status: "Найден аккаунт Telegram",
      findings: [
        { label: "Username", value: "@alex_m***", note: "(В полном отчёте — полный username)" },
        { label: "Статус", value: "Онлайн был недавно", note: "" },
        { label: "Публичные группы", value: "Состоит в 12 публичных группах", note: "" },
        { label: "Премиум статус", value: "Активен", note: "", highlight: true },
      ],
    },
  },
  {
    id: "dating",
    title: "Сайты знакомств",
    icon: Heart,
    color: "pink",
    delay: 400,
    content: {
      status: "⚠️ Обнаружена активность",
      findings: [
        { label: "Tinder", value: "Профиль активен", note: "", warning: true },
        { label: "Badoo", value: "Последний визит: 3 дня назад", note: "", warning: true },
        { label: "Mamba", value: "Профиль удалён недавно", note: "", highlight: true },
        { label: "Общее", value: "Найдено на 3 платформах", note: "", warning: true },
      ],
    },
  },
  {
    id: "instagram",
    title: "Instagram",
    icon: Camera,
    color: "purple",
    delay: 600,
    content: {
      status: "Найден аккаунт Instagram",
      findings: [
        { label: "Username", value: "@alex.m***", note: "(В полном отчёте — полный username)" },
        { label: "Публикации", value: "87 постов", note: "" },
        { label: "Подписчики", value: "1,247 подписчиков", note: "" },
        { label: "Закрытый аккаунт", value: "Да", note: "", highlight: true },
      ],
    },
  },
  {
    id: "geo",
    title: "Геолокации",
    icon: MapPin,
    color: "green",
    delay: 800,
    content: {
      status: "Найдены отметки геолокации",
      findings: [
        { label: "Частые места", value: "5 повторяющихся локаций", note: "" },
        { label: "Последняя отметка", value: "ТЦ 'Авиапарк', Москва", note: "", highlight: true },
        { label: "Нетипичные места", value: "2 новых адреса за месяц", note: "", warning: true },
      ],
    },
  },
  {
    id: "hidden",
    title: "Скрытые связи",
    icon: Lock,
    color: "orange",
    delay: 1000,
    content: {
      status: "⚠️ Обнаружены скрытые контакты",
      findings: [
        { label: "Скрытые друзья ВК", value: "47 человек", note: "", warning: true },
        { label: "Удалённые переписки", value: "Следы удалённых диалогов", note: "", warning: true },
        { label: "Второй номер", value: "Привязан дополнительный номер", note: "", warning: true },
        { label: "Альтернативные аккаунты", value: "Найден 1 дополнительный профиль", note: "", warning: true },
      ],
    },
  },
]

// Данные для блока статистики
const statsData = [
  { label: "Проверенных профилей", value: "3,847+" },
  { label: "Точность анализа", value: "99.2%" },
  { label: "Время проверки", value: "~5 мин" },
]

export default function ExamplesPage() {
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Анимация появления секций
    reportSections.forEach((section, index) => {
      setTimeout(
        () => {
          setVisibleSections((prev) => [...prev, section.id])
        },
        500 + index * 300,
      )
    })
  }, [])

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string; glow: string } } = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        glow: "shadow-blue-500/20",
      },
      cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        text: "text-cyan-400",
        glow: "shadow-cyan-500/20",
      },
      pink: {
        bg: "bg-pink-500/10",
        border: "border-pink-500/30",
        text: "text-pink-400",
        glow: "shadow-pink-500/20",
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-400",
        glow: "shadow-purple-500/20",
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
        glow: "shadow-green-500/20",
      },
      orange: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        text: "text-orange-400",
        glow: "shadow-orange-500/20",
      },
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Примеры проверок", href: "/examples" },
            ]}
          />

          {/* Заголовок страницы */}
          <div
            className={`mb-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Вернуться к проверке партнера</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Пример отчёта проверки партнера</h1>
                <p className="text-muted-foreground">Демонстрация анонимной проверки партнера на измену</p>
              </div>
            </div>
          </div>

          {/* Информация о проверке */}
          <div
            className={`bg-card/80 backdrop-blur border border-border rounded-2xl p-6 mb-8 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-green-400 font-medium">Анонимная проверка партнера завершена</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Проверяемый номер</p>
                <p className="text-white font-mono">{profileData.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Дата проверки</p>
                <p className="text-white">{profileData.checkDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Время</p>
                <p className="text-white">{profileData.checkTime}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">ID отчёта</p>
                <p className="text-white font-mono text-sm">{profileData.reportId}</p>
              </div>
            </div>
          </div>

          {/* Секции отчёта */}
          <div className="space-y-4 mb-8">
            {reportSections.map((section) => {
              const colors = getColorClasses(section.color)
              const isVisible = visibleSections.includes(section.id)
              const Icon = section.icon

              return (
                <div
                  key={section.id}
                  className={`${colors.bg} border ${colors.border} rounded-2xl overflow-hidden transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                >
                  {/* Заголовок секции */}
                  <div className="flex items-center gap-3 p-4 border-b border-white/5">
                    <div className={`p-2 rounded-lg ${colors.bg}`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{section.title}</h3>
                      <p
                        className={`text-sm ${section.content.status.includes("⚠️") ? "text-orange-400" : colors.text}`}
                      >
                        {section.content.status}
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>

                  {/* Содержимое секции */}
                  <div className="p-4 space-y-3">
                    {section.content.findings.map((finding, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start justify-between p-3 rounded-lg ${
                          finding.warning
                            ? "bg-orange-500/10 border border-orange-500/20"
                            : finding.highlight
                              ? "bg-green-500/10 border border-green-500/20"
                              : "bg-white/5"
                        }`}
                      >
                        <div className="flex-1">
                          <p className="text-muted-foreground text-sm">{finding.label}</p>
                          <p
                            className={`font-medium ${
                              finding.warning ? "text-orange-400" : finding.highlight ? "text-green-400" : "text-white"
                            }`}
                          >
                            {finding.value}
                          </p>
                          {finding.note && <p className="text-muted-foreground text-xs mt-1">{finding.note}</p>}
                        </div>
                        {finding.warning && <AlertTriangle className="w-4 h-4 text-orange-400 mt-1" />}
                        {finding.highlight && <Sparkles className="w-4 h-4 text-green-400 mt-1" />}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA блок */}
          <div
            className={`bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-primary/30 rounded-2xl p-8 text-center transition-all duration-700 delay-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Хотите проверить своего партнера?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Получите полный отчёт о активности вашего партнёра в социальных сетях, мессенджерах и сайтах знакомств.
              Анонимная проверка партнера за 5 минут.
            </p>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
              {statsData.map((stat, idx) => (
                <div key={idx}>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/#check-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              <Search className="w-5 h-5" />
              Проверить партнера на измену
              <ChevronRight className="w-5 h-5" />
            </Link>

            <p className="text-muted-foreground text-sm mt-4 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              100% анонимность • Партнёр не узнает о проверке
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
