"use client"

import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      text: "Долго сомневалась, но решилась. Оказалось, что мой муж активно переписывался с коллегой. Спасибо за правду, теперь я знаю как действовать.",
      name: "Анна М.",
      rating: 5,
    },
    {
      text: "Проверил девушку перед предложением руки и сердца. К счастью, всё чисто! Теперь женюсь со спокойной душой. Сервис работает быстро и точно.",
      name: "Дмитрий К.",
      rating: 5,
    },
    {
      text: "Подозрения подтвердились — нашли скрытый аккаунт мужа на сайте знакомств. Больно, но лучше знать правду. Спасибо за профессионализм.",
      name: "Елена В.",
      rating: 5,
    },
    {
      text: "Отличный сервис! Всё анонимно, быстро и понятно. Получила полный отчёт за 5 минут. Рекомендую всем, кто хочет узнать правду.",
      name: "Мария С.",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">Отзывы наших клиентов</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Более 3000 человек уже узнали правду о своих партнёрах
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 relative">
                <span className="text-4xl text-primary/20 absolute -top-2 -left-2">"</span>
                {testimonial.text}
              </p>
              <p className="text-sm font-semibold text-white">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
