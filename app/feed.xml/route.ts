import { NextResponse } from "next/server"

// Турбо-страницы Яндекса с горячими ключами
const turboPages = [
  {
    title: "Проверка партнера на измену онлайн",
    url: "https://v0-check-love-online.vercel.app/",
    content:
      "Анонимная проверка партнера на измену за 5 минут. Узнайте правду о верности мужа или жены через ВКонтакте, Telegram, Instagram и сайты знакомств. 3000+ успешных проверок. 100% конфиденциальность.",
  },
  {
    title: "Как узнать изменяет ли муж — признаки и проверка",
    url: "https://v0-check-love-online.vercel.app/blog",
    content:
      "Подозреваете мужа в измене? Проверьте его анонимно через наш сервис. Анализ соцсетей ВКонтакте, Telegram, WhatsApp, Instagram и сайтов знакомств. Результат за 5 минут.",
  },
  {
    title: "Как проверить жену на верность онлайн",
    url: "https://v0-check-love-online.vercel.app/blog",
    content:
      "Проверка жены на измену без её ведома. Полный анализ цифровой активности: социальные сети, мессенджеры, сайты знакомств. Анонимно и конфиденциально.",
  },
]

export async function GET() {
  const siteUrl = "https://v0-check-love-online.vercel.app"

  const turboRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:yandex="http://news.yandex.ru" xmlns:media="http://search.yahoo.com/mrss/" xmlns:turbo="http://turbo.yandex.ru">
  <channel>
    <title>Проверка на верность онлайн — Проверка партнера на измену</title>
    <link>${siteUrl}</link>
    <description>Сервис анонимной проверки партнера на измену онлайн</description>
    <language>ru</language>
    <turbo:analytics type="Yandex" id="109840176"></turbo:analytics>
    ${turboPages
      .map(
        (page) => `
    <item turbo="true">
      <title>${escapeXml(page.title)}</title>
      <link>${page.url}</link>
      <turbo:content><![CDATA[
        <header>
          <h1>${page.title}</h1>
        </header>
        <p>${page.content}</p>
        <button formaction="${siteUrl}/#check-form" data-background-color="#dc143c" data-color="white" data-primary="true">Начать проверку</button>
      ]]></turbo:content>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`

  return new NextResponse(turboRss, {
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
