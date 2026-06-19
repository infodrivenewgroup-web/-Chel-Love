"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCourseById } from "@/lib/courses-data"
import { CheckCircle2, Star, Shield, Clock, Users, ArrowLeft, Flame } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params?.courseId as string
  const course = getCourseById(courseId)

  const [hoursLeft, setHoursLeft] = useState(23)
  const [minutesLeft, setMinutesLeft] = useState(59)

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutesLeft((prev) => {
        if (prev <= 0) {
          setHoursLeft((h) => Math.max(0, h - 1))
          return 59
        }
        return prev - 1
      })
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Курс не найден</h1>
          <Link href="/courses" className="text-primary hover:underline">
            Вернуться к каталогу курсов
          </Link>
        </div>
      </div>
    )
  }

  const handleBuy = () => {
    // Store course info in sessionStorage for checkout
    sessionStorage.setItem("selectedCourse", JSON.stringify(course))
    router.push("/courses/checkout")
  }

  const accentColor = course.category === "women" ? "pink" : "blue"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к курсам
          </Link>

          {/* Course header */}
          <div className="mb-10">
            <div
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
                course.category === "women" ? "bg-pink-500/20 text-pink-400" : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {course.category === "women" ? "Для женщин" : "Для мужчин"}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">{course.title}</h1>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>5.0 рейтинг</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span>3000+ отзывов</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Гарантия результата</span>
            </div>
          </div>

          {/* Full description */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-10">
            <h2 className="text-xl font-bold mb-6">О курсе</h2>
            <div className="prose prose-invert max-w-none">
              {course.fullDescription.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-muted-foreground mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-10">
            <h2 className="text-xl font-bold mb-6">Преимущества курса</h2>
            <div className="space-y-4">
              {course.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Block */}
          <div
            className={`bg-gradient-to-br ${
              course.category === "women"
                ? "from-pink-500/20 to-primary/20 border-pink-500/30"
                : "from-blue-500/20 to-secondary/20 border-blue-500/30"
            } border rounded-2xl p-6 md:p-10 text-center`}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Получите курс прямо сейчас!</h2>

            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-2xl text-muted-foreground line-through">{course.originalPrice}₽</span>
              <span className="text-4xl md:text-5xl font-bold text-primary">{course.discountPrice}₽</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-yellow-500 mb-6">
              <Clock className="w-5 h-5" />
              <span className="font-medium">
                Скидка действует ещё: {hoursLeft}ч {minutesLeft}мин
              </span>
            </div>

            <button
              onClick={handleBuy}
              className={`inline-flex items-center justify-center gap-2 px-10 py-5 ${
                course.category === "women" ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"
              } text-white rounded-xl font-bold text-xl transition-all hover:scale-105 shadow-lg`}
            >
              <Flame className="w-6 h-6" />
              КУПИТЬ СО СКИДКОЙ
            </button>

            <p className="text-muted-foreground text-sm mt-6">Гарантия возврата результата · Поддержка 24/7</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
