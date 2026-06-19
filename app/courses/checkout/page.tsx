"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import type { Course } from "@/lib/courses-data"
import { CreditCard, Smartphone, X, AlertCircle } from "lucide-react"

export default function CourseCheckoutPage() {
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [showCardModal, setShowCardModal] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedCourse")
    if (stored) {
      setCourse(JSON.parse(stored))
    } else {
      router.push("/courses")
    }
  }, [router])

  const handleSBP = () => {
    router.push("/courses/payment")
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          {/* Order info */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h1 className="text-xl font-bold mb-4 text-center">ОФОРМЛЕНИЕ КУРСА</h1>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Курс:</span>
                <span className="text-white font-medium text-right max-w-[250px]">
                  {course.title.length > 50 ? course.title.slice(0, 50) + "..." : course.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Цена:</span>
                <span className="text-primary font-bold text-lg">{course.discountPrice}₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Скидка:</span>
                <span className="text-green-500 font-medium">-{course.originalPrice - course.discountPrice}₽</span>
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-6 text-center">ВЫБЕРИТЕ СПОСОБ ОПЛАТЫ</h2>

            <div className="space-y-4">
              {/* SBP Button */}
              <button
                onClick={handleSBP}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg transition-all"
              >
                <Smartphone className="w-6 h-6" />
                ОПЛАТИТЬ ПО СБП
              </button>
              <p className="text-center text-muted-foreground text-sm -mt-2">Система быстрых платежей</p>

              {/* Card Button (inactive) */}
              <button
                onClick={() => setShowCardModal(true)}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gray-600 hover:bg-gray-500 text-gray-300 rounded-xl font-bold text-lg transition-all"
              >
                <CreditCard className="w-6 h-6" />
                ОПЛАТИТЬ ПО КАРТЕ
              </button>
              <p className="text-center text-muted-foreground text-sm -mt-2">Временно недоступна</p>
            </div>
          </div>
        </div>
      </main>

      {/* Card unavailable modal */}
      {showCardModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-500" />
                <h3 className="text-lg font-bold">Способ недоступен</h3>
              </div>
              <button
                onClick={() => setShowCardModal(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-muted-foreground mb-6">
              Способ оплаты по карте временно недоступен. Используйте, пожалуйста, Систему Быстрых Платежей (СБП).
              Приносим извинения за неудобство.
            </p>
            <button
              onClick={() => setShowCardModal(false)}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all"
            >
              Хорошо
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
