"use client"

import { MapPin, MessageCircle, Activity, UserX } from "lucide-react"

interface BenefitsSectionProps {
  onScrollToForm: () => void
}

export function BenefitsSection({ onScrollToForm }: BenefitsSectionProps) {
  const benefits = [
    {
      icon: MapPin,
      title: "Проверка по геолокации",
      description: "Узнайте, где бывает ваша половина и какие места посещает чаще всего",
      color: "text-primary",
    },
    {
      icon: MessageCircle,
      title: "Анализ переписки",
      description: "С кем общается ваш партнёр и кому уделяет особое внимание в соцсетях",
      color: "text-secondary",
    },
    {
      icon: Activity,
      title: "Отслеживание активности",
      description: "Полный мониторинг активности в социальных сетях и мессенджерах",
      color: "text-green-500",
    },
    {
      icon: UserX,
      title: "Поиск скрытых аккаунтов",
      description: "Обнаружение секретных профилей на сайтах знакомств и в соцсетях",
      color: "text-yellow-500",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">Что вы получите</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Комплексный анализ цифровой активности вашего партнёра
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <button
              key={index}
              onClick={onScrollToForm}
              className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 text-left"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${benefit.color}`}
              >
                <benefit.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
