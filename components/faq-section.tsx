"use client"

import { useState } from "react"
import { ChevronDown, ArrowUp } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      id: "how-it-works",
      question: "Как проводится проверка?",
      answer:
        "Мы используем специализированные инструменты для анализа цифровой активности. Проверяем социальные сети, мессенджеры, сайты знакомств и другие онлайн-платформы. Процесс полностью автоматизирован и занимает несколько минут.",
      relatedIds: ["what-data", "how-long"],
    },
    {
      id: "is-anonymous",
      question: "Узнает ли проверяемый о проверке?",
      answer:
        "Нет, ни в коем случае. Мы гарантируем 100% анонимность. Проверка проводится скрытно, без каких-либо уведомлений или следов. Проверяемый никогда не узнает, что его проверяли.",
      relatedIds: ["confidentiality", "how-it-works"],
    },
    {
      id: "what-data",
      question: "Какие данные вы проверяете?",
      answer:
        "Услуга «Детектор верности онлайн» по номеру телефона или ссылке на профиль ВКонтакте предоставляет комплексный анализ цифровой активности вашего партнера и включает следующие возможности: Поиск скрытых друзей в социальных сетях и анализ их совместной активности. Выявление и цифровой анализ взаимодействия вашего партнера с другими пользователями в социальных сетях и мессенджерах (WhatsApp и Telegram). Подробный отчет обо всех существующих активных аккаунтах и профилях вашего партнера в социальных сетях, а так же на сайтах знакомств, включая удалённые или скрытые аккаунты. Анализ геолокации с отображением маршрутов перемещений и выявлением часто посещаемых мест за последние 30 дней. Подробный отчет с историей изменений всех найденных страниц ВКонтакте с момента их создания, в том числе и удаленных аккаунтов. Обнаружение скрытых фотографий и альбомов в соцсетях. Выявление скрытых интересов, таких как часто посещаемые сайты, активность в конкретных группах и каналах Telegram. Отчет о последних покупках вашего партнера в интернете, а также об оплатах в различных сервисах и приложениях. Детальная информация о том, как записана ваша вторая половинка в телефонах у других людей. Наша услуга построена на применении проверенных технологий, которые обеспечивают конфиденциальность и надёжность проверки.",
      relatedIds: ["how-it-works", "get-results"],
    },
    {
      id: "how-long",
      question: "Сколько времени занимает проверка?",
      answer:
        "Стандартная проверка занимает от 3 до 5 минут. В редких случаях, при большом объёме данных, процесс может занять до 10 минут. Вы получите уведомление сразу после готовности отчёта.",
      relatedIds: ["how-it-works", "get-results"],
    },
    {
      id: "get-results",
      question: "Как я получу результаты проверки?",
      answer:
        "После завершения проверки и оплаты вы получите доступ к полному отчёту в нашем Telegram-боте. Отчёт содержит всю найденную информацию с доказательствами и скриншотами.",
      relatedIds: ["what-data", "confidentiality"],
    },
    {
      id: "confidentiality",
      question: "Гарантируете ли вы конфиденциальность?",
      answer:
        "Да, мы гарантируем 100% конфиденциальность. Все данные шифруются, а отчёты автоматически удаляются после получения. Мы не храним персональную информацию и не передаём её третьим лицам.",
      relatedIds: ["is-anonymous", "get-results"],
    },
  ]

  // Schema.org FAQ microdata
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const scrollToFaq = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      const index = faqs.findIndex((f) => f.id === id)
      if (index !== -1) {
        setOpenIndex(index)
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section id="faq" className="py-16 px-4 bg-muted/30">
      {/* Schema.org microdata */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">Часто задаваемые вопросы</h2>
        <p className="text-muted-foreground text-center mb-12">Ответы на популярные вопросы о нашем сервисе</p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqs.map((faq) => (
            <button
              key={faq.id}
              onClick={() => scrollToFaq(faq.id)}
              className="text-xs px-3 py-1 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary transition-colors"
            >
              {faq.question.split(" ").slice(0, 3).join(" ")}...
            </button>
          ))}
        </div>

        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => (
            <div
              key={index}
              id={faq.id}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className={`border border-border rounded-xl overflow-hidden transition-all ${
                openIndex === index ? "border-primary/50 shadow-lg shadow-primary/10" : ""
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 md:p-5 flex items-center justify-between text-left bg-card hover:bg-card/80 transition-colors"
              >
                <span itemProp="name" className="font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-muted-foreground flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[800px]" : "max-h-0"
                }`}
              >
                <div className="p-4 md:p-5 pt-0 bg-card">
                  <div className={`border-l-2 border-primary pl-4 ${openIndex === index ? "border-primary" : ""}`}>
                    <p itemProp="text" className="text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.relatedIds.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">Связанные вопросы: </span>
                        {faq.relatedIds.map((relatedId, i) => {
                          const relatedFaq = faqs.find((f) => f.id === relatedId)
                          if (!relatedFaq) return null
                          return (
                            <span key={relatedId}>
                              <button
                                onClick={() => scrollToFaq(relatedId)}
                                className="text-xs text-primary hover:underline"
                              >
                                {relatedFaq.question.split(" ").slice(0, 4).join(" ")}...
                              </button>
                              {i < faq.relatedIds.length - 1 && <span className="text-muted-foreground">, </span>}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            Вернуться вверх
          </button>
        </div>
      </div>
    </section>
  )
}
