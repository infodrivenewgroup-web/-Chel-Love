"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { womenCourses, menCourses } from "@/lib/courses-data"
import { Star, Shield, Clock, Users, CheckCircle2, Heart, Sparkles } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumbs"

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<"women" | "men">("women")
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  const currentCourses = activeTab === "women" ? womenCourses : menCourses
  const selectedCourseData = [...womenCourses, ...menCourses].find((c) => c.id === selectedCourse)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs />
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Премиум-Курсы «Детектор верности онлайн»</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Профессиональные курсы для построения идеальных отношений
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs sm:text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>3000+ проверок</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs sm:text-sm">
                <Shield className="w-4 h-4 text-green-500" />
                <span>100% конфиденциально</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>21-30 дней</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs sm:text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span>Поддержка 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Buttons */}
      <section className="px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Women Tab Button */}
            <button
              onClick={() => {
                setActiveTab("women")
                setSelectedCourse(null)
              }}
              className={`flex-1 relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                activeTab === "women"
                  ? "bg-gradient-to-br from-pink-600 to-rose-700 shadow-xl shadow-pink-500/30 scale-[1.02]"
                  : "bg-card border border-pink-500/30 hover:border-pink-500/60 hover:shadow-lg hover:shadow-pink-500/20"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Heart className={`w-8 h-8 ${activeTab === "women" ? "text-white" : "text-pink-400"}`} />
                <div className="text-left">
                  <h3 className={`text-xl font-bold ${activeTab === "women" ? "text-white" : "text-pink-400"}`}>
                    Курсы для женщин
                  </h3>
                  <p className={`text-sm ${activeTab === "women" ? "text-pink-100" : "text-muted-foreground"}`}>
                    {womenCourses.length} курсов
                  </p>
                </div>
              </div>
              {activeTab === "women" && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
              )}
            </button>

            {/* Men Tab Button */}
            <button
              onClick={() => {
                setActiveTab("men")
                setSelectedCourse(null)
              }}
              className={`flex-1 relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                activeTab === "men"
                  ? "bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-500/30 scale-[1.02]"
                  : "bg-card border border-blue-500/30 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Shield className={`w-8 h-8 ${activeTab === "men" ? "text-white" : "text-blue-400"}`} />
                <div className="text-left">
                  <h3 className={`text-xl font-bold ${activeTab === "men" ? "text-white" : "text-blue-400"}`}>
                    Курсы для мужчин
                  </h3>
                  <p className={`text-sm ${activeTab === "men" ? "text-blue-100" : "text-muted-foreground"}`}>
                    {menCourses.length} курсов
                  </p>
                </div>
              </div>
              {activeTab === "men" && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course.id)}
                className={`group relative bg-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                  activeTab === "women"
                    ? "border border-pink-500/20 hover:shadow-xl hover:shadow-pink-500/20"
                    : "border border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/20"
                }`}
              >
                {/* Discount badge */}
                <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                  -{course.discountPercent}%
                </div>

                <div className="p-5">
                  <h3
                    className={`text-base font-bold mb-2 transition-colors line-clamp-2 min-h-[3rem] ${
                      activeTab === "women"
                        ? "text-white group-hover:text-pink-400"
                        : "text-white group-hover:text-blue-400"
                    }`}
                  >
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 min-h-[4rem]">
                    {course.shortDescription.slice(0, 120)}...
                  </p>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-muted-foreground line-through text-sm">{course.originalPrice}₽</span>
                      <span className="text-xl font-bold text-primary">{course.discountPrice}₽</span>
                    </div>

                    <button
                      className={`w-full py-2.5 text-white rounded-xl font-bold transition-all text-sm ${
                        activeTab === "women" ? "bg-pink-600 hover:bg-pink-700" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourse && selectedCourseData && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`p-6 border-b border-border ${
                selectedCourseData.category === "women"
                  ? "bg-gradient-to-r from-pink-600/20 to-rose-600/20"
                  : "bg-gradient-to-r from-blue-600/20 to-indigo-600/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{selectedCourseData.discountPercent}% СКИДКА
                    </span>
                    <Sparkles
                      className={`w-5 h-5 ${
                        selectedCourseData.category === "women" ? "text-pink-400" : "text-blue-400"
                      }`}
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{selectedCourseData.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-muted-foreground hover:text-white transition-colors text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                {selectedCourseData.fullDescription}
              </p>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Что вы получите:</h3>
                <ul className="space-y-2">
                  {selectedCourseData.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & CTA */}
              <div
                className={`p-5 rounded-xl ${
                  selectedCourseData.category === "women"
                    ? "bg-gradient-to-r from-pink-600/20 to-rose-600/20 border border-pink-500/30"
                    : "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground line-through text-lg">
                        {selectedCourseData.originalPrice}₽
                      </span>
                      <span className="text-3xl font-bold text-primary">{selectedCourseData.discountPrice}₽</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Единоразовая оплата</p>
                  </div>
                  <Link
                    href={`/courses/${selectedCourseData.id}`}
                    className={`px-8 py-3 text-white rounded-xl font-bold transition-all hover:scale-105 ${
                      selectedCourseData.category === "women"
                        ? "bg-pink-600 hover:bg-pink-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Купить курс
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary/20 to-red-600/20 rounded-2xl p-8 border border-primary/30">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Хотите проверить своего партнёра?</h2>
            <p className="text-muted-foreground mb-6">
              Воспользуйтесь нашим профессиональным сервисом проверки верности
            </p>
            <Link
              href="/#check-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 animate-pulse"
            >
              <Heart className="w-5 h-5" />
              Проверить своего партнера
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Почему выбирают наши курсы?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-card p-5 rounded-2xl border border-border">
              <CheckCircle2 className="w-9 h-9 text-green-500 mb-3" />
              <h3 className="font-bold text-base mb-2">Создано экспертами</h3>
              <p className="text-muted-foreground text-sm">
                Сервис, который проверил 3000+ отношений и видел всю реальность
              </p>
            </div>
            <div className="bg-card p-5 rounded-2xl border border-border">
              <CheckCircle2 className="w-9 h-9 text-green-500 mb-3" />
              <h3 className="font-bold text-base mb-2">Реальные данные</h3>
              <p className="text-muted-foreground text-sm">Основано на анализе того, как устроены верность и измена</p>
            </div>
            <div className="bg-card p-5 rounded-2xl border border-border">
              <CheckCircle2 className="w-9 h-9 text-green-500 mb-3" />
              <h3 className="font-bold text-base mb-2">Гарантированный результат</h3>
              <p className="text-muted-foreground text-sm">От проверок — к доверию и близости за 21-30 дней</p>
            </div>
            <div className="bg-card p-5 rounded-2xl border border-border">
              <CheckCircle2 className="w-9 h-9 text-green-500 mb-3" />
              <h3 className="font-bold text-base mb-2">100% конфиденциально</h3>
              <p className="text-muted-foreground text-sm">Как и наши проверки — полная анонимность</p>
            </div>
            <div className="bg-card p-5 rounded-2xl border border-border">
              <CheckCircle2 className="w-9 h-9 text-green-500 mb-3" />
              <h3 className="font-bold text-base mb-2">��о��держка 24/7</h3>
              <p className="text-muted-foreground text-sm">Наши эксперты помогут разобраться в любом вопросе</p>
            </div>
            <div className="bg-card p-5 rounded-2xl border border-border">
              <CheckCircle2 className="w-9 h-9 text-green-500 mb-3" />
              <h3 className="font-bold text-base mb-2">Интенсивная работа</h3>
              <p className="text-muted-foreground text-sm">От 21 до 30 дней практических заданий</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
