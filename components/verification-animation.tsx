"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import {
  CheckCircle2,
  Unlock,
  Shield,
  Database,
  Search,
  Globe,
  Users,
  MessageCircle,
  MapPin,
  Eye,
  AlertTriangle,
  Heart,
} from "lucide-react"
import { ReportGenerationAnimation } from "./report-generation-animation"

interface VerificationAnimationProps {
  inputValue: string
  method: "phone" | "vk"
  onComplete: () => void
}

const stages = [
  // VKontakte
  {
    text: "Сканирование профиля VKontakte...",
    description: "Поиск основного и дополнительных профилей ВКонтакте",
    duration: 7000,
    service: 0,
    icon: Search,
  },
  {
    text: "Анализ активности VKontakte...",
    description: "Проверка публикаций, лайков, комментариев и скрытых друзей",
    duration: 7500,
    service: 0,
    icon: Users,
  },
  // Telegram
  {
    text: "Сканирование аккаунта Telegram...",
    description: "Поиск аккаунтов и анализ групповых чатов",
    duration: 7000,
    service: 1,
    icon: MessageCircle,
  },
  {
    text: "Анализ каналов и групп Telegram...",
    description: "Проверка подписок на каналы и активности в группах",
    duration: 7000,
    service: 1,
    icon: Eye,
  },
  // WhatsApp
  {
    text: "Проверка аккаунтов WhatsApp...",
    description: "Поиск основного и дополнительных аккаунтов WhatsApp",
    duration: 7000,
    service: 2,
    icon: MessageCircle,
  },
  {
    text: "Анализ активности WhatsApp...",
    description: "Проверка статусов и связанных контактов",
    duration: 6500,
    service: 2,
    icon: Search,
  },
  // Instagram
  {
    text: "Сканирование профиля Instagram...",
    description: "Поиск аккаунтов и анализ публикаций",
    duration: 7000,
    service: 3,
    icon: Eye,
  },
  {
    text: "Анализ stories и подписок Instagram...",
    description: "Проверка историй, подписок и взаимодействий",
    duration: 6500,
    service: 3,
    icon: Globe,
  },
  // Одноклассники
  {
    text: "Проверка профиля Одноклассники...",
    description: "Поиск аккаунта и анализ активности",
    duration: 6500,
    service: 4,
    icon: Search,
  },
  // Сайты знакомств
  {
    text: "Сканирование сайтов знакомств...",
    description: "Проверка Tinder, Badoo, Mamba и других платформ",
    duration: 8000,
    service: 5,
    icon: MapPin,
  },
  {
    text: "Анализ профилей на сайтах знакомств...",
    description: "Проверка анкет и истории общения",
    duration: 7000,
    service: 5,
    icon: Users,
  },
  // TikTok
  {
    text: "Сканирование аккаунта TikTok...",
    description: "Поиск профиля и анализ видео-контента",
    duration: 6500,
    service: 6,
    icon: Eye,
  },
  // Локатор
  {
    text: "Анализ геолокационных данных...",
    description: "Сопоставление геометок и частых локаций",
    duration: 7000,
    service: 7,
    icon: MapPin,
  },
  // Финальные проверки
  {
    text: "Поиск удалённых профилей...",
    description: "Восстановление информации об удалённых аккаунтах",
    duration: 6000,
    service: null,
    icon: Database,
  },
  {
    text: "Выгрузка цифровой активности...",
    description: "Сбор данных о взаимодействиях с другими пользователями",
    duration: 5500,
    service: null,
    icon: Database,
  },
  {
    text: "Финальная обработка данных...",
    description: "Верификация и структурирование собранной информации",
    duration: 5000,
    service: null,
    icon: Shield,
  },
  {
    text: "Формирование отчёта проверки...",
    description: "Сохранение результатов в защищённое хранилище",
    duration: 4500,
    service: null,
    icon: CheckCircle2,
  },
]

const TOTAL_DURATION = stages.reduce((acc, stage) => acc + stage.duration, 0) // ~106 сек

const allIntriguingFacts = [
  { text: "Обнаружен дополнительный аккаунт WhatsApp", service: 2 },
  { text: "Обнаружен дополнительный профиль ВК", service: 0 },
  { text: "В основном профиле ВК найдены скрытые друзья", service: 0 },
  { text: "Обнаружена совместная онлайн активность со скрытыми друзьями ВК", service: 0 },
  { text: "В аккаунте Telegram замечена повышенная активность в канале 18+", service: 1 },
  { text: "В аккаунте Telegram замечена активность в тематической группе знакомства и флирта", service: 1 },
  { text: "Обнаружен удалённый профиль на сайте связанный со знакомством и флиртом", service: 5 },
]

const services = [
  { name: "VKontakte", icon: "VK", color: "#4C75A3" },
  { name: "Telegram", icon: "TG", color: "#0088CC" },
  { name: "WhatsApp", icon: "WA", color: "#25D366" },
  { name: "Instagram", icon: "IG", color: "#E4405F" },
  { name: "Одноклассники", icon: "OK", color: "#EE8208" },
  { name: "Сайты знакомств", icon: "💕", color: "#FE3C72" },
  { name: "TikTok", icon: "TT", color: "#000000" },
  { name: "Локатор", icon: "📍", color: "#4CAF50" },
]

export function VerificationAnimation({ inputValue, method, onComplete }: VerificationAnimationProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [stageProgress, setStageProgress] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showReportGeneration, setShowReportGeneration] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [discoveredFacts, setDiscoveredFacts] = useState<string[]>([])
  const [completedServices, setCompletedServices] = useState<Set<number>>(new Set())
  const logsRef = useRef<HTMLDivElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)
  const usedFactsRef = useRef<Set<number>>(new Set())
  const startTimeRef = useRef<number>(Date.now())
  const lastServiceRef = useRef<number | null>(null)

  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const checkNumber = useMemo(() => {
    return Math.floor(100000 + Math.random() * 900000)
  }, [])

  const selectedFactsWithTiming = useMemo(() => {
    const count = Math.floor(Math.random() * 3) + 2 // 2-4 факта
    const shuffled = [...allIntriguingFacts].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, count)

    // Вычисляем время появления факта в зависимости от сервиса
    return selected
      .map((fact) => {
        // Находим индекс первого этапа с этим сервисом
        let stageStartTime = 0
        let stageDuration = 5000
        for (let i = 0; i < stages.length; i++) {
          if (stages[i].service === fact.service) {
            stageDuration = stages[i].duration
            break
          }
          stageStartTime += stages[i].duration
        }
        // Добавляем случайную задержку внутри этапа сервиса (30-80% этапа)
        const delay = stageStartTime + stageDuration * (0.3 + Math.random() * 0.5)
        return { ...fact, appearTime: delay }
      })
      .sort((a, b) => a.appearTime - b.appearTime)
  }, [])

  const searchTitle = useMemo(() => {
    return method === "phone"
      ? "Поиск и анализ информации по номеру телефона"
      : "Поиск и анализ информации по ссылке VK"
  }, [method])

  const getCurrentTime = useCallback(() => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
  }, [])

  const generateLog = useCallback(
    (stageIndex: number) => {
      const time = getCurrentTime()
      const logTypes = [
        `[${time}] [GET /api/v2/scan] Initiating deep analysis...`,
        `[${time}] [QUERY: user_profile_${Math.random().toString(16).slice(2, 8)}]`,
        `[${time}] Establishing secure connection to database...`,
        `[${time}] [POST /analyze] Processing metadata extraction...`,
        `[${time}] Pattern recognition algorithm initiated...`,
        `[${time}] Social network graph generation in progress...`,
        `[${time}] [GET /user/activity] Response: 200 OK`,
        `[${time}] Deep scan layer ${Math.floor(Math.random() * 5) + 1} complete`,
        `[${time}] Cross-reference validation: ${Math.floor(Math.random() * 100)}% match`,
        `[${time}] Data mining: extracting behavioral patterns...`,
        `[${time}] [SCAN] Analyzing encrypted channels...`,
        `[${time}] Metadata extraction: profile_id_${Math.random().toString(16).slice(2, 10)}`,
        `[${time}] [API] Fetching social connections matrix...`,
        `[${time}] Neural pattern matching: confidence ${(Math.random() * 30 + 70).toFixed(1)}%`,
        `[${time}] [DECRYPT] Processing hidden data streams...`,
        `[${time}] Geolocation triangulation in progress...`,
        `[${time}] [HASH] Verifying data integrity: SHA256_OK`,
        `[${time}] Correlation matrix: ${Math.floor(Math.random() * 1000)} nodes analyzed`,
      ]
      return logTypes[Math.floor(Math.random() * logTypes.length)]
    },
    [getCurrentTime],
  )

  useEffect(() => {
    if (isComplete) return
    const interval = setInterval(() => {
      const log = generateLog(currentStage)
      setLogs((prev) => [...prev.slice(-50), log])
    }, 400)
    return () => clearInterval(interval)
  }, [isComplete, currentStage, generateLog])

  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight
    }
  }, [logs])

  useEffect(() => {
    if (factsRef.current) {
      factsRef.current.scrollTop = factsRef.current.scrollHeight
    }
  }, [discoveredFacts])

  useEffect(() => {
    if (isComplete) return

    const elapsed = Date.now() - startTimeRef.current

    selectedFactsWithTiming.forEach((fact, index) => {
      if (elapsed >= fact.appearTime && !usedFactsRef.current.has(index)) {
        usedFactsRef.current.add(index)
        setDiscoveredFacts((prev) => [...prev, fact.text])
      }
    })
  }, [overallProgress, isComplete, selectedFactsWithTiming])

  useEffect(() => {
    if (isComplete) return
    startTimeRef.current = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current

      let accumulatedTime = 0
      let currentStageIndex = 0
      let currentStageProgress = 0

      for (let i = 0; i < stages.length; i++) {
        if (elapsed < accumulatedTime + stages[i].duration) {
          currentStageIndex = i
          currentStageProgress = ((elapsed - accumulatedTime) / stages[i].duration) * 100
          break
        }
        accumulatedTime += stages[i].duration
        if (stages[i].service !== null) {
          setCompletedServices((prev) => new Set(prev).add(stages[i].service as number))
        }
        if (i === stages.length - 1) {
          currentStageIndex = stages.length - 1
          currentStageProgress = 100
        }
      }

      if (elapsed >= TOTAL_DURATION) {
        setCurrentStage(stages.length - 1)
        setStageProgress(100)
        setOverallProgress(100)
        setIsComplete(true)
        clearInterval(interval)
        // Show completion message briefly, then transition to report generation
        setTimeout(() => {
          setShowReportGeneration(true)
        }, 3000)
        return
      }

      setCurrentStage(currentStageIndex)
      setStageProgress(Math.min(currentStageProgress, 100))
      setOverallProgress((elapsed / TOTAL_DURATION) * 100)
    }, 100)

    return () => clearInterval(interval)
  }, [isComplete])

  // Handle report generation completion - show results page
  const handleReportGenerationComplete = () => {
    onComplete()
  }

  // Show report generation animation after verification complete
  if (showReportGeneration) {
    return <ReportGenerationAnimation onComplete={handleReportGenerationComplete} />
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-28 h-28 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping" />
            <div className="relative w-full h-full bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500">
              <Unlock className="w-14 h-14 text-green-500" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <h1 className="text-2xl md:text-4xl font-bold text-white">ПРОВЕРКА ЗАВЕРШЕНА!</h1>
          </div>
          <p className="text-gray-400 text-lg">Формирование отчета...</p>
        </div>
      </div>
    )
  }

  const StageIcon = stages[currentStage].icon
  const activeServiceIndex = stages[currentStage].service

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-3 md:p-6 max-w-7xl mx-auto">
        {/* Шапка */}
        <div className="border-b border-gray-800 pb-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
                <Search className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="font-bold text-lg md:text-xl hacker-title-glow">ПРОВЕРКА НА ВЕРНОСТЬ ОНЛАЙН</span>
            </div>
            <div className="flex items-center gap-4 text-xs md:text-sm">
              <span className="text-gray-400">
                Проверка №<span className="text-cyan-400 font-mono">{checkNumber}</span>
              </span>
              <span className="text-red-500 font-mono font-bold private-access-glow">DFH&amp;TA FNS V2.0</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-lg md:text-2xl font-semibold mb-2 cyber-title-glow">{searchTitle}</h1>
            <p className="text-cyan-400 font-mono text-sm md:text-base">
              Starting Robots' AI To Search And Analyze Information:{" "}
              <span className="text-yellow-400">{inputValue}</span>
            </p>
          </div>
        </div>

        {/* Основной прогресс */}
        <div className="mb-4 bg-gray-900/50 rounded-lg p-3 md:p-4 border border-gray-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm text-gray-400">Общий прогресс проверки</span>
            <span className="text-xl md:text-2xl font-bold text-cyan-400 font-mono">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 md:h-4 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 relative"
              style={{
                width: `${overallProgress}%`,
                background: "linear-gradient(90deg, #dc2626, #7c3aed, #2563eb)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Сервисы */}
        <div className="mb-4 bg-gray-900/50 rounded-lg p-3 md:p-4 border border-gray-800">
          <p className="text-xs text-gray-500 mb-3">Сканируемые сервисы:</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {services.map((service, i) => {
              const isActive = activeServiceIndex === i
              const isCompleted = completedServices.has(i)
              return (
                <div
                  key={service.name}
                  className={`p-2 md:p-3 rounded-lg border text-center transition-all duration-500 ${
                    isActive
                      ? "border-yellow-500 bg-yellow-500/20 scale-105 shadow-lg shadow-yellow-500/30"
                      : isCompleted
                        ? "border-green-500 bg-green-500/10"
                        : "border-gray-700 bg-gray-800/30 opacity-40"
                  }`}
                >
                  <div
                    className="text-lg md:text-2xl mb-1 transition-all duration-300"
                    style={{
                      color: isActive ? "#facc15" : isCompleted ? "#22c55e" : service.color,
                      filter: isActive ? "brightness(1.3)" : "none",
                    }}
                  >
                    {isCompleted ? "✓" : service.icon}
                  </div>
                  <p
                    className={`text-xs truncate ${isActive ? "text-yellow-400" : isCompleted ? "text-green-400" : "text-gray-500"}`}
                  >
                    {service.name}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Основной контент - 3 колонки */}
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          {/* Левая панель - текущий этап */}
          <div className="bg-gray-900/50 rounded-lg p-3 md:p-4 border border-gray-800">
            <h3 className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Текущий процесс</h3>

            <div className="p-3 bg-gray-800/50 rounded-lg border border-cyan-500/30 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <StageIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-cyan-400 font-medium text-sm md:text-base">{stages[currentStage].text}</p>
                  <p className="text-gray-500 text-xs mt-1">{stages[currentStage].description}</p>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-3">
                    <div
                      className="h-full bg-cyan-500 rounded-full transition-all duration-100"
                      style={{ width: `${stageProgress}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-3 text-xs text-gray-500">
                <span>
                  Этап {currentStage + 1} из {stages.length}
                </span>
                <span>{Math.round(stageProgress)}%</span>
              </div>
            </div>

            <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <p className="text-blue-400 text-xs flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Все данные защищены шифрованием AES-256
              </p>
            </div>
          </div>

          {/* Центральная панель - терминал логов */}
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-gray-800">
              <span className="text-red-500 text-xs font-mono font-bold private-access-glow">
                Приватный доступ vernost.pro v.2.0
              </span>
              <span className="text-xs text-gray-500 font-mono">forensic.log</span>
            </div>
            <div
              ref={logsRef}
              className="flex-1 p-3 font-mono text-xs overflow-y-auto scrollbar-thin"
              style={{ maxHeight: "300px", minHeight: "250px" }}
            >
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed mb-0.5 text-green-500">
                  {log}
                  {i === logs.length - 1 && <span className="text-green-400 animate-pulse">█</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Правая панель - обнаруженные факты */}
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-gray-800">
              <span className="text-red-400 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                ОБНАРУЖЕНО
              </span>
              <span className="text-xs text-gray-500">{discoveredFacts.length} записей</span>
            </div>
            <div
              ref={factsRef}
              className="flex-1 p-3 overflow-y-auto scrollbar-thin"
              style={{ maxHeight: "300px", minHeight: "250px" }}
            >
              {discoveredFacts.length === 0 ? (
                <div className="text-gray-600 text-xs text-center py-8">Ожидание обнаружения данных...</div>
              ) : (
                discoveredFacts.map((fact, i) => (
                  <div key={i} className="p-2 mb-2 bg-red-900/20 border border-red-500/30 rounded-lg animate-fade-in">
                    <p className="text-red-400 text-xs font-medium flex items-start gap-2">
                      <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {fact}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
