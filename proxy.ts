import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://mc.yandex.com https://yastatic.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://mc.yandex.ru https://mc.yandex.com https://mc.webvisor.org https://audit-love.vercel.app; frame-src https://mc.yandex.ru; frame-ancestors 'none';",
  )
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
  response.headers.set("Pragma", "no-cache")
  response.headers.set("Expires", "0")

  // Server-side logging configuration
  const logData = {
    timestamp: new Date().toISOString(),
    path: request.nextUrl.pathname,
    method: request.method,
    userAgent: request.headers.get("user-agent") || "unknown",
    ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
    referer: request.headers.get("referer") || "direct",
    country: request.headers.get("x-vercel-ip-country") || "unknown",
  }

  // Log to console (Vercel captures these in its logging system)
  if (process.env.NODE_ENV === "production") {
    console.log(JSON.stringify({ type: "access_log", ...logData }))
  }

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes that don't need logging
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
