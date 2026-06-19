"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Shield, Headphones, UserCheck, Lock } from "lucide-react"
import { sendYmGoal, upsertLead, isLeadSaved, redirectToSiteB } from "@/lib/lead-tracking"

export function ResultsPage() {
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [originalPrice] = useState(2499)
  const [discountedPrice] = useState(1999)
  const [isDiscountActive, setIsDiscountActive] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          setIsDiscountActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleGetReport = () => {
    // 1. Send click_polychit goal to counter 109840176 first.
    sendYmGoal("click_polychit", async () => {
      // 2. Ensure the lead is saved on site "Б" (only if not already saved).
      if (!isLeadSaved()) {
        await upsertLead()
      }
      // 3. Redirect to site "Б" /payment with lead_id + yclid + UTM (never phone_or_vk).
      redirectToSiteB()
    })
  }

  return (
    <div className="min-h-screen bg-background matrix-bg py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full text-green-500 mb-4">
            <CheckCircle2 size={20} />
            <span className="font-semibold">ПРОВЕРКА УСПЕШНО ЗАВЕРШЕНА!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">ВАШ ОТЧЁТ ГОТОВ!</h1>
        </div>

        {/* Report Details */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6 scale-in">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl font-bold text-white">ОТЧЁТ ГОТОВ К ОТПРАВКЕ!</h2>
          </div>

          <p className="text-muted-foreground mb-6">
            Ваш персональный отчет о <span className="text-primary">цифровой жизни</span> вашего партнёра успешно
            сформирован. Информация в отчете сформирована с учетом найденной информации о вашем партнере.
          </p>

          <p className="text-white font-medium mb-4">Отчет включает в себя:</p>

          <div className="space-y-3 mb-6">
            {[
              "Полный отчёт о цифровой активности партнёра (ВК, WhatsApp, Telegram)",
              "Подробную информацию и аналитику совместной цифровой активности вашего партнера с другими пользователями в соцсетях и мессенджерах за последние 30 дней",
              "Информацию о всех найденных аккаунтах и профилей соцсетей и мессенджеров с указанием конкретных ссылок (включая удалённые), в том числе отчет о поиске профилей на сайтах знакомств и флирта",
              "Выгрузка информации о скрытых друзьях ВК + анализ их цифровой совместной активности в сети",
              "Отчет геолокации - в котором содержится информация о перемещениях партнера, а так же анализ часто посещаемых места (За последний месяц)",
              "Детальная история изменений страницы ВКонтакте с момента ее создания",
              "Информация о том как записан ваш партнер у других пользователей в записной книжке",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            После оплаты вы сразу получите готовый отчёт с результатами проверки вашей второй половины. В случае
            возникновения любых вопросов по отчету, наши операторы работают круглосуточно и готовы быстро помочь вам в
            любое время! Мы гарантируем достоверность найденной информации, а так же полную конфиденциальность наших
            клиентов и безопасность обработки данных на всех этапах проверки.
          </p>
        </div>

        {/* Pricing Block */}
        <div className="bg-card border border-primary/50 rounded-2xl p-6 md:p-8 mb-6 slide-up">
          {isDiscountActive && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary animate-pulse">
                <span className="font-bold">Успей получить скидку: 500 рублей!</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-primary">{formatTime(timeLeft)}</div>
              <p className="text-xs text-muted-foreground mt-1">до конца акции</p>
            </div>
          )}

          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-2">
              Стоимость: <span className="line-through text-gray-500">{originalPrice}₽</span>
            </p>
            {isDiscountActive && (
              <p className="text-yellow-500 font-medium mb-2">СКИДКА 500₽ — Успейте воспользоваться!</p>
            )}
            <p className="text-lg text-white">
              ИТОГО:{" "}
              <span className="text-4xl font-bold text-primary animate-pulse">
                {isDiscountActive ? discountedPrice : originalPrice}₽
              </span>
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGetReport}
              className="w-full py-5 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Lock size={24} />
              Получить отчёт со скидкой 500 руб!
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Shield, text: "Достоверность данных" },
            { icon: Lock, text: "100% конфиденциальность" },
            { icon: UserCheck, text: "Без регистрации" },
            { icon: Headphones, text: "Поддержка 24/7" },
          ].map((item, i) => (
            <div key={i} className="text-center p-4 bg-card border border-border rounded-xl">
              <item.icon size={24} className="mx-auto text-secondary mb-2" />
              <p className="text-xs text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Mini Reviews */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { text: "Получила отчет за 5 минут. Все данные достоверные. Рекомендую!", name: "Ольга" },
            { text: "Спасибо за оперативность! Теперь знаю правду о муже.", name: "Наталья" },
            { text: "Профессиональный сервис. Результат превзошел ожидания.", name: "Андрей" },
          ].map((review, i) => (
            <div key={i} className="p-4 bg-card border border-border rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">&quot;{review.text}&quot;</p>
              <p className="text-xs text-white font-medium">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
