"use client"

import Link from "next/link"
import { ArrowRight, Eye, Clock } from "lucide-react"
import { getTopArticlesForHomepage } from "@/lib/blog-generator"

export function TopArticles() {
  const topArticles = getTopArticlesForHomepage()

  return (
    <section className="py-12 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">ТОП-3 популярных статей о проверке на верность</h2>
          <p className="text-gray-400 text-sm md:text-base">Самые читаемые материалы о проверке верности партнёра</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {topArticles.map((article, index) => (
            <Link
              key={article.id}
              href={`/blog#article-${article.id}`}
              className="group block p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
            >
              {/* Номер в топе */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl font-bold text-red-500/30 group-hover:text-red-500/50 transition-colors">
                  #{index + 1}
                </span>
                <span className="text-xs px-2 py-1 bg-red-600/20 text-red-400 rounded">{article.categoryName}</span>
              </div>

              {/* Заголовок */}
              <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors mb-2 line-clamp-2">
                {article.title}
              </h3>

              {/* Описание */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.description}</p>

              {/* Метаданные */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views.toLocaleString("ru-RU")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              {/* Стрелка */}
              <div className="mt-4 flex items-center text-red-400 text-sm font-medium group-hover:text-red-300">
                <span>Читать статью</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Ссылка на весь блог */}
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Все статьи блога
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
