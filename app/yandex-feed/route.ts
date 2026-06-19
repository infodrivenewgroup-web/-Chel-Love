import { NextResponse } from "next/server"

// YML фид для Яндекс.Директ и Яндекс.Бизнес
export async function GET() {
  const siteUrl = "https://v0-check-love-online.vercel.app"
  const currentDate = new Date().toISOString().split("T")[0]

  const yml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${currentDate}">
  <shop>
    <name>Проверка на верность онлайн</name>
    <company>Проверка на верность онлайн — Проверка партнера на измену</company>
    <url>${siteUrl}</url>
    <currencies>
      <currency id="RUB" rate="1"/>
    </currencies>
    <categories>
      <category id="1">Проверка партнера</category>
      <category id="2" parentId="1">Проверка на измену</category>
      <category id="3" parentId="1">Анализ соцсетей</category>
    </categories>
    <offers>
      <offer id="1" available="true">
        <url>${siteUrl}/#check-form</url>
        <price>1999</price>
        <currencyId>RUB</currencyId>
        <categoryId>2</categoryId>
        <picture>${siteUrl}/og-image.jpg</picture>
        <name>Проверка партнера на измену онлайн</name>
        <description>Полная проверка партнера по номеру телефона или профилю ВКонтакте. Анализ ВКонтакте, Telegram, WhatsApp, Instagram и сайтов знакомств за 5 минут. 100% анонимно.</description>
        <sales_notes>Результат за 5 минут</sales_notes>
        <param name="Время проверки">5 минут</param>
        <param name="Анонимность">100%</param>
        <param name="Соцсети">VK, Telegram, WhatsApp, Instagram</param>
      </offer>
      <offer id="2" available="true">
        <url>${siteUrl}/#check-form</url>
        <price>1999</price>
        <currencyId>RUB</currencyId>
        <categoryId>2</categoryId>
        <picture>${siteUrl}/og-image.jpg</picture>
        <name>Проверить мужа на измену</name>
        <description>Анонимная проверка мужа на измену через соцсети и мессенджеры. Узнайте правду о его цифровой активности. Он никогда не узнает о проверке.</description>
        <sales_notes>Гарантия конфиденциальности</sales_notes>
        <param name="Тип проверки">Проверка мужа</param>
        <param name="Анонимность">Полная</param>
      </offer>
      <offer id="3" available="true">
        <url>${siteUrl}/#check-form</url>
        <price>1999</price>
        <currencyId>RUB</currencyId>
        <categoryId>2</categoryId>
        <picture>${siteUrl}/og-image.jpg</picture>
        <name>Проверить жену на измену</name>
        <description>Проверка жены на верность онлайн. Полный анализ соцсетей, мессенджеров и сайтов знакомств. Результат за 5 минут.</description>
        <sales_notes>Быстрый результат</sales_notes>
        <param name="Тип проверки">Проверка жены</param>
        <param name="Анонимность">Полная</param>
      </offer>
      <offer id="4" available="true">
        <url>${siteUrl}/#check-form</url>
        <price>1999</price>
        <currencyId>RUB</currencyId>
        <categoryId>3</categoryId>
        <picture>${siteUrl}/og-image.jpg</picture>
        <name>Проверка партнера по ВКонтакте</name>
        <description>Проверьте партнера по профилю ВКонтакте. Анализ друзей, скрытых профилей, активности и связанных аккаунтов.</description>
        <sales_notes>Глубокий анализ ВК</sales_notes>
        <param name="Платформа">ВКонтакте</param>
      </offer>
      <offer id="5" available="true">
        <url>${siteUrl}/#check-form</url>
        <price>1999</price>
        <currencyId>RUB</currencyId>
        <categoryId>3</categoryId>
        <picture>${siteUrl}/og-image.jpg</picture>
        <name>Проверка партнера по номеру телефона</name>
        <description>Введите номер телефона партнера и получите полный отчет о его цифровой активности во всех соцсетях и мессенджерах.</description>
        <sales_notes>Проверка по телефону</sales_notes>
        <param name="Способ проверки">По номеру телефона</param>
      </offer>
    </offers>
  </shop>
</yml_catalog>`

  return new NextResponse(yml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
