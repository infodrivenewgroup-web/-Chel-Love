import type React from "react"
import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { MetrikaTracker } from "@/components/metrika-tracker"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Проверка на верность онлайн. Узнай правду за 5 минут! | Анонимно",
  description:
    "Проверь на верность своего парня/девушку и узнай что скрывает твой партнер в ВК, ТГ и в переписках - Гарантированный результат!",
  keywords:
    "проверка на верность, проверить девушку, как проверить мужа, проверить любимого, как узнать с кем общается, проверка парня, проверка девушки, как узнать об измене, проверка парня на верность, проверить жену, проверить женщину, проверка партнера на измену, как узнать изменяет ли муж, узнать изменяет ли жена, как проверить мужа на верность, как проверить жену на верность, проверка на измену онлайн, анонимная проверка партнера",
  authors: [{ name: "Проверка на верность онлайн" }],
  creator: "Проверка на верность онлайн",
  publisher: "Проверка на верность онлайн",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://v0-check-love-online.vercel.app/",
    types: {
      "application/xhtml+xml": "https://v0-check-love-online.vercel.app/amp",
    },
  },
  openGraph: {
    title: "Проверка на верность онлайн | Узнай с кем общается ваша половинка за 5 минут!",
    description:
      "Проверь на верность своего парня/девушку и узнай что скрывает твой партнер в ВК, ТГ и в переписках - Гарантированный результат!",
    type: "website",
    locale: "ru_RU",
    siteName: "Проверка на верность онлайн",
    url: "https://v0-check-love-online.vercel.app/",
    images: [
      {
        url: "https://v0-check-love-online.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Проверка на верность онлайн — проверка партнера на измену онлайн",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Проверка на верность онлайн | Узнай с кем общается ваша половинка за 5 минут!",
    description:
      "Проверь на верность своего парня/девушку и узнай что скрывает твой партнер в ВК, ТГ и в переписках - Гарантированный результат!",
    images: ["https://v0-check-love-online.vercel.app/og-image.jpg"],
  },
  verification: {
    google: ["VFhf-C5n9OZWtR-nH06yOMaegMJeIE1aM0MUZ9-B_-Y", "_ba_dhDQoSVzVZosEtK8TTt06y3oKc55qRneeYG6_QA"],
    yandex: "b3650233647196ca",
  },
  other: {
    "yandex-verification": "b3650233647196ca",
    "google-site-verification": "_ba_dhDQoSVzVZosEtK8TTt06y3oKc55qRneeYG6_QA",
    "geo.region": "RU-MOW",
    "geo.placename": "Москва",
    "geo.position": "55.7558;37.6173",
    ICBM: "55.7558, 37.6173",
    // Яндекс-специфичные мета-теги для улучшения индексации
    "document-state": "Static",
    "revisit-after": "1 days",
    distribution: "global",
    rating: "general",
    "target": "all",
    "audience": "all",
    "doc-type": "Web Page",
    "doc-class": "Completed",
    "doc-rights": "Copywritten Work",
    // Дополнительные SEO параметры для Яндекс Директ
    "yandex-tableofcontents": "true",
    "yandex-fulltext": "true",
  },
  category: "technology",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "dark light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteUrl = "https://v0-check-love-online.vercel.app"

  return (
    <html lang="ru" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Language" content="ru" />
        <meta name="yandex-verification" content="b3650233647196ca" />
        <meta name="google-site-verification" content="VFhf-C5n9OZWtR-nH06yOMaegMJeIE1aM0MUZ9-B_-Y" />
        <meta name="google-site-verification" content="_ba_dhDQoSVzVZosEtK8TTt06y3oKc55qRneeYG6_QA" />
        <meta name="geo.region" content="RU-MOW" />
        <meta name="geo.placename" content="Москва" />
        <meta name="geo.position" content="55.7558;37.6173" />
        <meta name="ICBM" content="55.7558, 37.6173" />
        
        {/* Яндекс-специфичные мета-теги для сниппетов и CTR */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="yandex" content="index, follow, noyaca" />
        
        {/* Дополнительные мета-теги для улучшения сниппета */}
        <meta name="subject" content="Проверка партнера на верность онлайн - анонимная проверка по соцсетям и мессенджерам" />
        <meta name="abstract" content="Сервис анонимной проверки партнера на верность. Узнайте с кем общается ваша половинка в ВК, Телеграм, WhatsApp за 5 минут." />
        <meta name="topic" content="Проверка на верность онлайн, проверка парня, проверка девушки, как узнать об измене" />
        <meta name="summary" content="Проверка на верность онлайн - проверка партнера на верность за 5 минут. Анализ ВКонтакте, Telegram, сайтов знакомств. 100% анонимно." />
        <meta name="classification" content="Онлайн-сервис проверки верности партнера" />
        <meta name="designer" content="Проверка на верность онлайн" />
        <meta name="copyright" content="Проверка на верность онлайн 2024-2025" />
        <meta name="reply-to" content="support@love-detektor.ru" />
        <meta name="owner" content="Проверка на верность онлайн" />
        <meta name="url" content="https://v0-check-love-online.vercel.app" />
        <meta name="identifier-URL" content="https://v0-check-love-online.vercel.app" />
        <meta name="coverage" content="Worldwide" />

        {/* canonical задаётся через Metadata API в каждой странице (см. alternates.canonical),
            поэтому жёсткий тег здесь удалён — иначе все страницы ошибочно каноникалят на главную. */}
        <link rel="amphtml" href="https://v0-check-love-online.vercel.app/amp" />

        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon-512x512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect для оптимизации загрузки */}
        <link rel="preconnect" href="https://mc.yandex.ru" />
        {/* DNS Prefetch для ускорения загрузки Яндекс Метрики */}
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://yandex.ru" />
        <link rel="dns-prefetch" href="https://an.yandex.ru" />
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="anonymous" />
        {/* DNS Prefetch для редиректа на сайт оплаты (сайт Б) */}
        <link rel="dns-prefetch" href="https://audit-love.vercel.app" />
        <link rel="preconnect" href="https://audit-love.vercel.app" crossOrigin="anonymous" />
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Yandex.Metrika counter 109840176 (single global init, no defer) */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=109840176', 'ym');
            ym(109840176, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/109840176" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>

        {/* Top.Mail.Ru counter (VK ADS) */}
        <Script id="top-mail-ru" strategy="afterInteractive">
          {`
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3757350", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
              if (d.getElementById(id)) return;
              var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
              ts.src = "https://top-fwz1.mail.ru/js/code.js";
              var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
              if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "tmr-code");
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://top-fwz1.mail.ru/counter?id=3757350;js=na" style={{ position: "absolute", left: "-9999px" }} alt="Top.Mail.Ru" />
          </div>
        </noscript>

        {/* BreadcrumbList - навигационные цепочки */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Главная — Проверка партнера на верность",
                  item: siteUrl,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Проверить партнера",
                  item: `${siteUrl}/#check-form`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Примеры проверок",
                  item: `${siteUrl}/examples`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Статьи о верности",
                  item: `${siteUrl}/blog`,
                },
              ],
            }),
          }}
        />

        {/* WebSite с SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Проверка на верность онлайн — Проверка партнера на верность",
              alternateName: ["Проверка партнера на верность онлайн", "Анонимная проверка верности", "Проверка на верность"],
              url: siteUrl,
              description:
                "Проверка партнера на верность онлайн за 5 минут. Узнайте изменяет ли муж или жена через ВКонтакте, Telegram, Instagram. Анонимная проверка партнера. 3000+ успешных проверок.",
              inLanguage: "ru-RU",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Organization с контактами */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Проверка на верность онлайн",
              alternateName: ["Проверка на верность онлайн", "Проверка партнёра на верность", "Проверка верности"],
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/favicon-512x512.png`,
                width: 512,
                height: 512,
              },
              image: `${siteUrl}/og-image.jpg`,
              description:
                "Профессиональный онлайн-сервис проверки партнера на верность. Анонимная проверка по соцсетям ВКонтакте, Telegram, Instagram и мессенджерам. Работаем в Москве и по всей России.",
              foundingDate: "2023",
              areaServed: {
                "@type": "Country",
                name: "Россия",
              },
              sameAs: [
                "https://vk.com/lovedetektor",
                "https://��роверка-верности.online",
                "https://t.me/Vernost_Pro",
                "https://t.me/LoveDetektor_Bot",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+7-800-501-57-97",
                  contactType: "customer service",
                  availableLanguage: ["Russian"],
                  areaServed: "RU",
                },
                {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  availableLanguage: ["Russian"],
                  url: "https://t.me/LoveDetektor_Bot",
                  areaServed: "RU",
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Москва",
                addressCountry: "RU",
              },
            }),
          }}
        />

        {/* Service - основная услуга */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${siteUrl}/#service`,
              name: "Проверка партнера на верность",
              alternateName: [
                "Анонимная проверка партнера",
                "Проверка верности онлайн",
                "Проверить мужа на верность",
                "Проверить жену на верность",
              ],
              description:
                "Проверка партнера на верность за 5 минут. Анонимная проверка по соцсетям ВКонтакте, Telegram, WhatsApp, Instagram и сайтам знакомств. Узнайте изменяет ли муж или жена. 100% конфиденциальность. 3000+ успешных проверок.",
              url: siteUrl,
              provider: {
                "@type": "Organization",
                name: "Проверка на верность онлайн",
                url: siteUrl,
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Москва",
                },
                {
                  "@type": "Country",
                  name: "Россия",
                },
              ],
              serviceType: "Проверка верности партнера",
              category: "Онлайн-сервисы",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Услуги проверки партнера",
                itemListElement: [
                  {
                    "@type": "Offer",
                    name: "Полная проверка партнера на верность",
                    description: "Комплексный анализ ВКонтакте, Telegram, WhatsApp, Instagram и сайтов знакомств",
                    price: "1999",
                    priceCurrency: "RUB",
                    availability: "https://schema.org/InStock",
                    priceValidUntil: "2025-12-31",
                    url: `${siteUrl}/#check-form`,
                  },
                ],
              },
            }),
          }}
        />

        {/* FAQPage - часто задаваемые вопросы */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Как проверить партнера на верность онлайн?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Сервис «Проверка на верность онлайн» анализирует цифровой след партнера в социальных сетях ВКонтакте, Telegram, WhatsApp, Instagram, выявляя скрытые профили и активность на сайтах знакомств. Проверка полностью анонимна и занимает около 5 минут. Партнер никогда не узнает о проверке.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Как узнать изменяет ли муж или жена?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Вы можете проверить партнера по номеру телефона или по ссылке на профиль ВКонтакте. Система автоматически найдет связанные аккаунты и проанализирует активность во всех популярных соцсетях, мессенджерах и сайтах знакомств.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Сколько стоит проверка партнера на верность?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Стоимость полной проверки партнера на верность составляет 1999 рублей. В отчет входит анализ ВКонтакте, Telegram, WhatsApp, Instagram, сайтов знакомств, скрытых друзей и всей цифровой активности партнера.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Анонимная ли проверка партнера?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Да, проверка партнера полностью анонимна. Мы используем технологии анализа открытых данных без взаимодействия с проверяемым человеком. Партнер никогда не узнает о проведенной проверке. 100% конфиденциальность гарантирована.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Какие данные я получу в отчете о проверке партнера?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Вы получите детальный отчет: все найденные профили в ВКонтакте, Telegram, Instagram, скрытых друзей, активность в мессенджерах, регистрации на сайтах знакомств (Tinder, Badoo, Mamba), подозрительные контакты и статистику цифровой активности партнера.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Product с рейтингом и отзывами */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Проверка партнера на верность онлайн — Проверка на верность онлайн",
              description:
                "Комплексная проверка партнера по номеру телефона или профилю ВКонтакте. Анализ ВКонтакте, Telegram, WhatsApp, Instagram и сайтов знакомств за 5 минут.",
              image: `${siteUrl}/og-image.jpg`,
              brand: {
                "@type": "Brand",
                name: "Проверка на верность онлайн",
              },
              offers: {
                "@type": "Offer",
                url: `${siteUrl}/#check-form`,
                priceCurrency: "RUB",
                price: "1999",
                availability: "https://schema.org/InStock",
                priceValidUntil: "2025-12-31",
                seller: {
                  "@type": "Organization",
                  name: "Проверка на верность онлайн",
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "3847",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Анна М.",
                  },
                  reviewBody: "Отличный сервис! Проверила мужа за 5 минут. Все оказалось в порядке, теперь спокойна.",
                },
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Дмитрий К.",
                  },
                  reviewBody: "Быстро и анонимно. Нашли скрытый профиль жены на сайте знакомств. Спасибо за правду.",
                },
              ],
            }),
          }}
        />

        {/* LocalBusiness для региональности */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Проверка на верность онлайн — Проверка партнера Москва",
              image: `${siteUrl}/og-image.jpg`,
              "@id": `${siteUrl}/#localbusiness`,
              url: siteUrl,
              telephone: "+7-800-501-57-97",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Москва",
                addressRegion: "Москва",
                addressCountry: "RU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 55.7558,
                longitude: 37.6173,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              priceRange: "₽₽",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "3847",
              },
            }),
          }}
        />

        {/* SiteNavigationElement - быстрые ссылки */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              name: "Навигация «Проверка на верность онлайн»",
              url: siteUrl,
              hasPart: [
                {
                  "@type": "SiteNavigationElement",
                  name: "Проверить партнера на верность",
                  description: "Начать анонимную проверку по номеру телефона или ВК",
                  url: `${siteUrl}/#check-form`,
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Примеры проверок партнера",
                  description: "Демонстрация отчета анонимной проверки на верность",
                  url: `${siteUrl}/examples`,
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Статьи о верности партнера",
                  description: "Полезные статьи о верности и признаках измены",
                  url: `${siteUrl}/blog`,
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Часто задаваемые вопросы",
                  description: "Ответы на вопросы о проверке партнера на верность",
                  url: `${siteUrl}/#faq`,
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Suspense fallback={null}>
          <MetrikaTracker />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
