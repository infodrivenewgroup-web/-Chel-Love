/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Редирект всех страниц /courses/* на главную
      {
        source: "/courses",
        destination: "/",
        permanent: true,
      },
      {
        source: "/courses/:path*",
        destination: "/",
        permanent: true,
      },
      // HTTPS редирект для продакшена
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/:path*",
              has: [
                {
                  type: "header",
                  key: "x-forwarded-proto",
                  value: "http",
                },
              ],
              destination: "https://v0-check-love-online.vercel.app/:path*",
              permanent: true,
            },
          ]
        : []),
    ]
  },
}

export default nextConfig
