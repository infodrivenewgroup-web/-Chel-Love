import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LandingExperience } from "@/components/landing-experience"
import { LANDING_PAGES, getLandingPage, SITE_URL } from "@/lib/landing-pages"

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getLandingPage(slug)

  if (!page) {
    return { title: "Страница не найдена | Детектор верности онлайн" }
  }

  const url = `${SITE_URL}/lp/${page.slug}`

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      locale: "ru_RU",
      siteName: "Детектор верности онлайн",
      url,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: page.headline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  }
}

export default async function LandingPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getLandingPage(slug)

  if (!page) {
    notFound()
  }

  const url = `${SITE_URL}/lp/${page.slug}`

  // JSON-LD: Service + FAQ-friendly schema for richer Яндекс/Google snippets.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.headline,
    serviceType: "Онлайн проверка партнёра на верность",
    description: page.description,
    provider: {
      "@type": "Organization",
      name: "Детектор верности онлайн",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    url,
    offers: {
      "@type": "Offer",
      price: "499",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingExperience headline={page.headline} subheading={page.subheading} />
    </>
  )
}
