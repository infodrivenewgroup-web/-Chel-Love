"use client"

import { UserX, Zap, Shield, Lock } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: UserX,
      title: "Анонимность",
      description: "Проверяемый никогда не узнает о проверке",
    },
    {
      icon: Zap,
      title: "Быстрота",
      description: "Результат готов уже через 5 минут",
    },
    {
      icon: Shield,
      title: "Гарантия",
      description: "100% гарантия достоверности данных",
    },
    {
      icon: Lock,
      title: "Конфиденциальность",
      description: "Все данные надёжно защищены",
    },
  ]

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-4 md:p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-lg bg-muted flex items-center justify-center mb-3 text-secondary group-hover:scale-110 transition-transform">
                <feature.icon size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
