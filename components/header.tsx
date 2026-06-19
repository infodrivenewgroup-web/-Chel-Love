"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle, FileText, BookOpen, Star } from "lucide-react"
import { Logo } from "./logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo size="md" />

          <Link
            href="/reviews"
            className="md:hidden flex items-center gap-1 px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg transition-all text-yellow-400 text-sm font-medium"
          >
            <Star size={14} fill="currentColor" />
            Отзывы
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/reviews"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg transition-all text-yellow-400 text-sm font-medium hover:shadow-lg hover:shadow-yellow-500/20"
            >
              <Star size={16} fill="currentColor" />
              Отзывы
            </Link>
            <Link
              href="/examples"
              className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 text-sm"
            >
              <FileText size={16} />
              Примеры проверок
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 text-sm text-white"
            >
              <BookOpen size={16} />
              Блог
            </Link>
            <a
              href="https://t.me/LoveDetektor_Bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-all hover:shadow-lg hover:shadow-secondary/30 text-sm text-white"
            >
              <MessageCircle size={16} />
              Консультация 24/7
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-3 fade-in">
            <Link
              href="/reviews"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg transition-all text-yellow-400 text-sm font-medium w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Star size={16} fill="currentColor" />
              Отзывы
            </Link>
            <Link
              href="/examples"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-all text-sm w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText size={16} />
              Примеры проверок
            </Link>
            <Link
              href="/blog"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-all text-sm text-white w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen size={16} />
              Блог
            </Link>
            <a
              href="https://t.me/LoveDetektor_Bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-all text-sm text-white w-full"
            >
              <MessageCircle size={16} />
              Консультация 24/7
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
