import { NextResponse } from "next/server"

// Горячие ключевые слова для фидов
const hotKeywords = [
  {
    keyword: "проверка партнера на измену",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Проверка партнера на измену онлайн — Chek-Love",
    description: "Анонимная проверка партнера на измену за 5 минут. Узнайте правду о верности мужа или жены через ВКонтакте, Telegram, Instagram.",
  },
  {
    keyword: "как узнать изменяет ли муж",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Как узнать изменяет ли муж — проверка онлайн",
    description: "Проверьте мужа на измену анонимно. Анализ соцсетей, мессенджеров и сайтов знакомств за 5 минут.",
  },
  {
    keyword: "как узнать изменяет ли жена",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Как узнать изменяет ли жена — анонимная проверка",
    description: "Проверьте жену на измену онлайн. Полный анализ ВКонтакте, Telegram, WhatsApp и сайтов знакомств.",
  },
  {
    keyword: "проверить партнера по номеру телефона",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Проверить партнера по номеру телефона — Chek-Love",
    description: "Введите номер телефона и получите полный отчет о цифровой активности партнера за 5 минут.",
  },
  {
    keyword: "проверка верности онлайн",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Проверка верности онлайн — быстро и анонимно",
    description: "Сервис проверки верности партнера. 3000+ успешных проверок. 100% конфиденциальность.",
  },
  {
    keyword: "проверить мужа на измену",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Проверить мужа на измену — результат за 5 минут",
    description: "Анонимная проверка мужа на измену через соцсети и мессенджеры. Узнайте правду сегодня.",
  },
  {
    keyword: "проверить жену на измену",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Проверить жену на измену онлайн — Chek-Love",
    description: "Проверьте жену на верность анонимно. Полный анализ соцсетей и сайтов знакомств.",
  },
  {
    keyword: "проверка партнера Москва",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Проверка партнера в Москве — онлайн сервис",
    description: "Проверка партнера на измену в Москве. Быстрый результат за 5 минут. Работаем 24/7.",
  },
  {
    keyword: "анонимная проверка партнера",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Анонимная проверка партнера на измену",
    description: "100% анонимная проверка партнера. Он никогда не узнает. Гарантия конфиденциальности.",
  },
  {
    keyword: "проверка партнера по ВК",
    url: "https://v0-love-chek.vercel.app/#check-form",
    title: "Проверка партнера по ВКонтакте — Chek-Love",
    description: "Проверьте партнера по профилю ВКонтакте. Анализ друзей, сообщений, скрытых профилей.",
  },
]

export async function GET() {
  const siteUrl = "https://v0-love-chek.vercel.app"
  const currentDate = new Date().toISOString()

  // Генерируем RSS фид
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:yandex="http://news.yandex.ru">
  <channel>
    <title>Chek-Love — Проверка партнера на измену</title>
    <link>${siteUrl}</link>
    <description>Анонимная проверка партнера на измену онлайн за 5 минут. Узнайте изменяет ли муж или жена через ВКонтакте, Telegram, Instagram. 3000+ успешных проверок.</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed" rel="self" type="application/rss+xml"/>
    <yandex:logo>${siteUrl}/favicon-512x512.png</yandex:logo>
    <yandex:logo type="square">${siteUrl}/favicon-192x192.png</yandex:logo>
    ${hotKeywords
      .map(
        (item, index) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(Date.now() - index * 86400000).toUTCString()}</pubDate>
      <guid isPermaLink="false">${siteUrl}/keyword/${encodeURIComponent(item.keyword)}</guid>
      <category>${escapeXml(item.keyword)}</category>
    </item>`
      )
      .join("")}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
