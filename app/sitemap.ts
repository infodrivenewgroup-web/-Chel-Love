import type { MetadataRoute } from "next"
import { LANDING_PAGES } from "@/lib/landing-pages"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://v0-check-love-online.vercel.app"
  const currentDate = new Date()

  // Посадочные страницы под объявления Яндекс Директ — высокий приоритет,
  // так как именно на них ведётся платный рекламный трафик.
  const landingRoutes: MetadataRoute.Sitemap = LANDING_PAGES.map((page) => ({
    url: `${baseUrl}/lp/${page.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.95,
  }))

  return [
    ...landingRoutes,
    // Главная страница - максимальный приоритет
    // Ключевые слова: проверка на верность, проверить девушку, как проверить мужа
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Отзывы - социальное доказательство, высокий приоритет для SEO
    // Ключевые слова: отзывы проверка на верность, chek-love отзывы
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Блог - SEO статьи с ключевыми словами
    // Ключевые слова: как узнать об измене, признаки измены, проверка парня на верность
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    // AMP версия для быстрой загрузки на мобильных (Яндекс любит AMP)
    {
      url: `${baseUrl}/amp`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    // RSS фид для агрегаторов
    {
      url: `${baseUrl}/feed`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.6,
    },
    // Турбо-страницы Яндекса
    {
      url: `${baseUrl}/feed.xml`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.6,
    },
    // YML фид для Яндекс.Директ
    {
      url: `${baseUrl}/yandex-feed`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.6,
    },
    // Политика конфиденциальности
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]
}
