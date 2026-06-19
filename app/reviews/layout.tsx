import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Отзывы о Chek-Love | Проверка на верность онлайн - реальные отзывы клиентов",
  description:
    "Читайте реальные отзывы о сервисе Chek-Love. Проверка партнера на верность - 37+ отзывов с оценкой 4.9/5. Проверить парня, девушку, мужа, жену онлайн.",
  keywords:
    "отзывы chek-love, отзывы проверка на верность, проверить девушку отзывы, проверить парня отзывы, как проверить мужа отзывы, проверка верности отзывы, chek love отзывы, проверка партнера отзывы",
  openGraph: {
    title: "Отзывы о Chek-Love | 4.9/5 - Проверка партнера на верность",
    description:
      "37+ реальных отзывов о сервисе проверки на верность. Читайте истории клиентов, которые проверили своих партнеров.",
    url: "https://love-service-private.vercel.app/reviews",
    siteName: "Chek-Love",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Отзывы о Chek-Love | Проверка на верность онлайн",
    description:
      "37+ реальных отзывов о сервисе проверки партнера. Оценка 4.9/5 от клиентов.",
  },
  alternates: {
    canonical: "https://love-service-private.vercel.app/reviews",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "yandex-tableofcontents": "true",
  },
}

// JSON-LD микроразметка для отзывов
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Chek-Love - Проверка партнера на верность",
  description:
    "Онлайн-сервис анонимной проверки партнера на верность. Анализ соцсетей, мессенджеров, сайтов знакомств за 5 минут.",
  brand: {
    "@type": "Brand",
    name: "Chek-Love",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "37",
    reviewCount: "37",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Анна М.",
      },
      datePublished: "2025-01-12",
      reviewBody:
        "Долго сомневалась, стоит ли проверять мужа. Оказалось, что мои подозрения были напрасны. Теперь на душе спокойно.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Дмитрий К.",
      },
      datePublished: "2025-01-10",
      reviewBody:
        "Заказывал проверку девушки перед тем как сделать предложение. Результат получил через 4 часа, всё чисто.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Елена В.",
      },
      datePublished: "2025-01-08",
      reviewBody:
        "Проверка подтвердила мои опасения. Но я благодарна сервису за то, что узнала правду. Отчёт был очень подробный.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
  ],
  offers: {
    "@type": "Offer",
    price: "990",
    priceCurrency: "RUB",
    availability: "https://schema.org/InStock",
    url: "https://love-service-private.vercel.app",
  },
}

// Breadcrumbs JSON-LD
const breadcrumbsJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://love-service-private.vercel.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Отзывы",
      item: "https://love-service-private.vercel.app/reviews",
    },
  ],
}

// FAQ JSON-LD для страницы отзывов
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Можно ли доверять отзывам о Chek-Love?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Все отзывы на странице являются реальными отзывами клиентов сервиса Chek-Love. Каждый отзыв проходит модерацию и проверку подлинности.",
      },
    },
    {
      "@type": "Question",
      name: "Какая средняя оценка сервиса Chek-Love?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Средняя оценка сервиса Chek-Love составляет 4.9 из 5 на основе более 37 отзывов клиентов.",
      },
    },
    {
      "@type": "Question",
      name: "Как проверить партнера на верность через Chek-Love?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Для проверки партнера достаточно указать его данные на официальном сайте, оплатить услугу и получить подробный отчёт в течение 3-5 часов.",
      },
    },
  ],
}

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
