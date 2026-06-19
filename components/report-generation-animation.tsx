"use client"

import { useState, useEffect } from "react"
import { FileText, Shield, CheckCircle2, Lock, Database, BarChart3, Users, FileCheck } from "lucide-react"

interface ReportGenerationAnimationProps {
  onComplete: () => void
}

const reportStages = [
  { id: 1, text: "Сбор данных проверки...", icon: Database, duration: 1500 },
  { id: 2, text: "Анализ результатов...", icon: BarChart3, duration: 2000 },
  { id: 3, text: "Проверка достоверности...", icon: Shield, duration: 1500 },
  { id: 4, text: "Формирование статистики...", icon: Users, duration: 1500 },
  { id: 5, text: "Шифрование данных...", icon: Lock, duration: 1500 },
  { id: 6, text: "Генерация отчета...", icon: FileText, duration: 2000 },
]

const TOTAL_DURATION = 10000 // 10 seconds

export function ReportGenerationAnimation({ onComplete }: ReportGenerationAnimationProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100)
      setProgress(newProgress)

      // Calculate current stage based on elapsed time
      let accumulatedTime = 0
      for (let i = 0; i < reportStages.length; i++) {
        accumulatedTime += reportStages[i].duration
        if (elapsed < accumulatedTime) {
          setCurrentStage(i)
          break
        }
        if (i === reportStages.length - 1) {
          setCurrentStage(reportStages.length - 1)
        }
      }

      if (elapsed >= TOTAL_DURATION) {
        clearInterval(interval)
        setIsComplete(true)
        setProgress(100)
        // Instant redirect after completion
        setTimeout(() => {
          onComplete()
        }, 800)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  const CurrentIcon = reportStages[currentStage]?.icon || FileText

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium text-sm">Проверка завершена</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Формирование отчета
            </h1>
            <p className="text-gray-400 text-sm">
              Подготавливаем персональный отчет с результатами
            </p>
          </div>

          {/* Animated Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Outer ring animation */}
              <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-emerald-500/20 animate-ping" style={{ animationDuration: "2s" }} />
              {/* Middle ring */}
              <div className="absolute inset-2 w-28 h-28 rounded-full border-2 border-emerald-500/30 animate-pulse" />
              {/* Inner circle with icon */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CurrentIcon className="w-14 h-14 text-white animate-pulse" />
              </div>
              {/* Spinning dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Current Stage Text */}
          <div className="text-center mb-6">
            <p className="text-white font-medium text-lg animate-pulse">
              {reportStages[currentStage]?.text}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-100 ease-linear relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-400">Прогресс</span>
              <span className="text-emerald-400 font-bold">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="grid grid-cols-6 gap-2 mb-6">
            {reportStages.map((stage, index) => {
              const StageIcon = stage.icon
              const isActive = index === currentStage
              const isCompleted = index < currentStage || isComplete

              return (
                <div
                  key={stage.id}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500/20 scale-105"
                      : isCompleted
                      ? "bg-emerald-500/10"
                      : "bg-slate-700/30"
                  }`}
                >
                  <StageIcon
                    className={`w-5 h-5 mb-1 transition-colors ${
                      isActive
                        ? "text-emerald-400 animate-pulse"
                        : isCompleted
                        ? "text-emerald-500"
                        : "text-gray-500"
                    }`}
                  />
                  {isCompleted && !isActive && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
            <Shield className="w-4 h-4" />
            <span>Данные защищены шифрованием</span>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Пожалуйста, не закрывайте страницу
          </p>
        </div>
      </div>
    </div>
  )
}
