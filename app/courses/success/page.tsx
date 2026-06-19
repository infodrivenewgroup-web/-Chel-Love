"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { Course } from "@/lib/courses-data"
import { CheckCircle2, Send, Star, MessageCircle, BookOpen, Heart, Search } from "lucide-react"

export default function CourseSuccessPage() {
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedCourse")
    if (stored) {
      setCourse(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative">
                <Heart className="w-8 h-8 text-primary fill-primary" />
                <Search className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">Детектор верности онлайн</span>
                <span className="text-muted-foreground text-[10px] hidden sm:block">
                  Профессиональный Онлайн-сервис
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/VernostOnlineSupportBot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-all text-sm text-white"
              >
                <MessageCircle size={16} />
                <span className="hidden sm:inline">Поддержка 24/7</span>
              </a>
              <Link
                href="/blog"
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-all text-sm text-white"
              >
                <BookOpen size={16} />
                <span className="hidden sm:inline">Блог</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success block */}
          <div className="bg-card border border-green-500/30 rounded-2xl p-6 md:p-10 text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center scale-in">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">СПАСИБО ЗА ПОКУПКУ!</h1>

            <p className="text-muted-foreground mb-6">Ваш платёж успешно обработан</p>

            <div className="bg-muted rounded-xl p-4 text-left space-y-2 mb-8">
              {course && (
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Курс:</span>
                  <span className="text-white font-medium text-right max-w-[300px]">
                    {course.title.length > 60 ? course.title.slice(0, 60) + "..." : course.title}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Сумма:</span>
                <span className="text-green-500 font-bold">{course?.discountPrice || 999}₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Статус:</span>
                <span className="text-green-500 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Оплачено
                </span>
              </div>
            </div>

            {/* Get course CTA */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">ПОЛУЧИТЕ ВАШ КУРС ПРЯМО СЕЙЧАС</h2>
              <a
                href="https://t.me/VernostProffiBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl font-black text-2xl transition-all hover:scale-105"
              >
                <Send className="w-8 h-8" />
                Получить курс
              </a>
            </div>
          </div>

          {/* Special offer - verification discount */}
          <div className="bg-card border border-primary/30 rounded-2xl p-6 md:p-8 mb-10">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                Специальное предложение
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">Пройдите проверку партнёра со скидкой 500₽</h2>
              <p className="text-muted-foreground">
                Используйте полученные знания на практике — проверьте верность вашего партнёра
              </p>
            </div>

            <Link
              href="/#check-form"
              className="block w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg text-center transition-all hover:scale-105"
            >
              Начать проверку
            </Link>
          </div>

          {/* Social proof */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-10">
            <h3 className="text-lg font-bold mb-4 text-center">Примеры наших проверок</h3>
            <div className="space-y-4">
              {[
                { name: "Анна К.", text: "Благодаря проверке узнала правду. Теперь с мужем всё отлично!", rating: 5 },
                { name: "Михаил С.", text: "Быстро, анонимно, профессионально. Рекомендую!", rating: 5 },
                { name: "Елена В.", text: "Сервис помог сохранить отношения. Спасибо команде!", rating: 5 },
              ].map((review, idx) => (
                <div key={idx} className="bg-muted rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Link to main site */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-muted hover:bg-muted/80 text-white rounded-xl font-bold transition-all"
            >
              ВЕРНУТЬСЯ НА САЙТ
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <Heart className="w-7 h-7 text-primary fill-primary" />
              <Search className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-white font-bold text-lg">Детектор верности онлайн</span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">© All Rights Reserved. «Детектор верности онлайн» 2023-2025.</p>
          <p className="text-muted-foreground text-xs max-w-2xl mx-auto">
            Внимание: Информация, размещённая на сайте, носит исключительно информационный характер и ни при каких
            условиях не является публичной офертой. Мы используем файлы cookie для улучшения качества обслуживания и
            индивидуализации сервисов. Если вы не согласны с их использованием, вы можете изменить настройки браузера.
          </p>
        </div>
      </footer>
    </div>
  )
}
