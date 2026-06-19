import Link from "next/link"
import { Heart, Search } from "lucide-react"

interface LogoProps {
  /** Render as a link to the homepage. Defaults to true. */
  asLink?: boolean
  /** Show the descriptor line under the brand name. */
  showTagline?: boolean
  /** Visual size of the lockup. */
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: { icon: "w-7 h-7", inner: "w-3 h-3", title: "text-base", tag: "text-[9px]" },
  md: { icon: "w-9 h-9", inner: "w-4 h-4", title: "text-lg", tag: "text-[10px]" },
  lg: { icon: "w-11 h-11", inner: "w-5 h-5", title: "text-xl", tag: "text-xs" },
}

/**
 * Brand logo for "Проверка на верность онлайн".
 * A heart with an embedded magnifier — symbolising the analysis of a relationship.
 */
export function Logo({ asLink = true, showTagline = true, size = "md", className = "" }: LogoProps) {
  const s = sizeMap[size]

  const content = (
    <span className={`flex items-center gap-2 ${className}`}>
      <span className="relative flex items-center justify-center" aria-hidden="true">
        <Heart className={`${s.icon} text-primary fill-primary`} />
        <Search className={`${s.inner} text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-white font-bold ${s.title} leading-tight`}>
          Проверка&nbsp;на <span className="text-primary">верность&nbsp;онлайн</span>
        </span>
        {showTagline && (
          <span className={`text-muted-foreground ${s.tag} tracking-wide`}>
            Анонимный онлайн-сервис проверки
          </span>
        )}
      </span>
    </span>
  )

  if (asLink) {
    return (
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Проверка на верность онлайн — на главную"
      >
        {content}
      </Link>
    )
  }

  return content
}
