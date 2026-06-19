"use client"

import type React from "react"

import Link from "next/link"
import {
  Search,
  Home,
  FileText,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Gift,
  ArrowRight,
  Heart,
  Shield,
  BookOpen,
} from "lucide-react"
import { useState } from "react"

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const popularArticles = [
    { title: "Как узнать, изменяет ли партнёр?", href: "/blog" },
    { title: "5 признаков измены в соцсетях", href: "/blog" },
    { title: "Скрытые друзья ВКонтакте", href: "/blog" },
  ]

  const siteMap = [
    { title: "Главная", href: "/", icon: Home },
    { title: "Начать проверку", href: "/#check-form", icon: Shield },
    { title: "Примеры проверок", href: "/examples", icon: FileText },
    { title: "Блог", href: "/blog", icon: BookOpen },
    { title: "Часто задаваемые вопросы", href: "/#faq", icon: HelpCircle },
    { title: "Политика конфиденциальности", href: "/privacy", icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="py-4 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Heart className="w-7 h-7 text-primary fill-primary" />
              <Search className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-white font-bold text-lg">Детектор верности онлайн</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-white transition-colors">
            На главную
          </Link>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Error Message */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <span className="text-[120px] sm:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 leading-none">
                404
              </span>
              <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 text-red-500 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Страница не найдена</h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              К сожалению, запрашиваемая вами страница не существует или была перемещена. Возможно, вы перешли по
              устаревшей ссылке или допустили опечатку в адресе.
            </p>
          </div>

          {/* Discount Banner */}
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-red-900/40 to-blue-900/40 border border-red-500/30 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Gift className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</span>
            </div>
            <p className="text-white text-xl sm:text-2xl font-bold mb-2">Скидка 500 рублей на первую проверку!</p>
            <p className="text-muted-foreground text-sm mb-4">
              Воспользуйтесь промокодом{" "}
              <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">VERNOST500</span> при оплате
            </p>
            <Link
              href="/#check-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/30"
            >
              <Shield className="w-5 h-5" />
              Начать проверку со скидкой
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Search */}
          <div className="mb-10 p-6 rounded-2xl bg-card border border-border">
            <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-400" />
              Поиск по сайту
            </h2>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введите запрос..."
                className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
              >
                Найти
              </button>
            </form>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {siteMap.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-red-500/50 hover:bg-card/80 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-red-500/30 group-hover:to-blue-500/30 transition-all">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium group-hover:text-red-400 transition-colors">{item.title}</span>
              </Link>
            ))}
          </div>

          {/* Popular Articles */}
          <div className="mb-10 p-6 rounded-2xl bg-card border border-border">
            <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              Популярные статьи из блога
            </h2>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <Link
                  key={index}
                  href={article.href}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground group-hover:text-white transition-colors">
                    {article.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-red-400 ml-auto transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30">
            <h2 className="text-white font-semibold text-lg mb-2">Нужна помощь?</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Наша служба поддержки работает круглосуточно и готова помочь вам с любым вопросом.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="https://t.me/VernostOnlineSupportBot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 transition-all"
              >
                <MessageCircle className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-white font-medium text-sm">Онлайн-чат</div>
                  <div className="text-blue-400 text-xs">Поддержка 24/7</div>
                </div>
              </a>
              <a
                href="mailto:support@love-detektor.ru"
                className="flex items-center gap-3 p-4 rounded-xl bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 transition-all"
              >
                <Mail className="w-6 h-6 text-green-400" />
                <div>
                  <div className="text-white font-medium text-sm">Email</div>
                  <div className="text-green-400 text-xs">support@love-detektor.ru</div>
                </div>
              </a>
              <a
                href="tel:88005015797"
                className="flex items-center gap-3 p-4 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 transition-all"
              >
                <Phone className="w-6 h-6 text-purple-400" />
                <div>
                  <div className="text-white font-medium text-sm">Телефон</div>
                  <div className="text-purple-400 text-xs">8 800 501 57 97</div>
                </div>
              </a>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold rounded-xl transition-all"
            >
              <Home className="w-5 h-5" />
              Вернуться на главную страницу
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 border-t border-border mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="relative">
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <Search className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-white font-bold">Детектор верности онлайн</span>
          </div>
          <p className="text-muted-foreground text-xs">© All Rights Reserved. «Детектор верности онлайн» 2023-2025.</p>
        </div>
      </footer>
    </div>
  )
}
