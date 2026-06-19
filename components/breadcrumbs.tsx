"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

const pathNames: Record<string, string> = {
  "": "Главная",
  examples: "Примеры проверок",
  blog: "Блог",
  courses: "Премиум-Курсы",
  privacy: "Политика конфиденциальности",
  amp: "AMP версия",
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Отслеживание прокрутки для кнопки "Вернуться вверх"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (pathname === "/" || pathname === "") return null

  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbItems = [
    { name: "Главная", path: "/" },
    ...segments.map((segment, index) => ({
      name: pathNames[segment] || segment,
      path: "/" + segments.slice(0, index + 1).join("/"),
    })),
  ]

  return (
    <>
      {/* Навигационная цепочка */}
      <nav aria-label="Навигационная цепочка" className="bg-black/30 border-b border-white/10 px-4 py-2 mb-4">
        <ol
          className="flex items-center flex-wrap gap-1 text-sm max-w-7xl mx-auto"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbItems.map((item, index) => (
            <li
              key={item.path}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-500 mx-1" />}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-400" itemProp="name">
                  {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="text-red-400 hover:text-red-300 transition-colors" itemProp="item">
                  <span itemProp="name">
                    {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                    {item.name}
                  </span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </nav>

      {/* Кнопка "Вернуться вверх" */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110"
          aria-label="Вернуться вверх"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  )
}

// Экспорт для использования в обоих форматах
export { Breadcrumbs }
