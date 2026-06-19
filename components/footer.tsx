"use client"
import { Phone, Mail, MessageCircle, Heart, Search } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Heart className="w-7 h-7 text-primary fill-primary" />
                <Search className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-white font-bold text-lg">Проверка на верность онлайн</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Профессиональный онлайн-сервис проверки верности партнёра. 100% анонимность и гарантированный результат.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <a
                href="tel:88005015797"
                className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm"
              >
                <Phone size={16} />8 800 501 57 97 - Автоинформатор
              </a>
              <a
                href="mailto:support@love-detektor.ru"
                className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm"
              >
                <Mail size={16} />
                support@love-detektor.ru
              </a>
              <a
                href="https://wa.me/79856170242?text=%D0%94%D0%BE%D0%B1%D1%80%D0%BE%20%D0%BF%D0%BE%D0%B6%D0%B0%D0%BB%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%B2%20%D1%81%D0%BB%D1%83%D0%B6%D0%B1%D1%83%20%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B8%20%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B0%21%20%D0%97%D0%B0%D0%B4%D0%B0%D0%B9%D1%82%D0%B5%20%D1%81%D0%B2%D0%BE%D0%B9%20%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%20-%20%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D0%B8%D1%82%20%D0%B2%D0%B0%D0%BC%20%D0%B2%20%D1%82%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%B8%D1%85%20%D0%BC%D0%B8%D0%BD%D1%83%D1%82"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-all text-white text-sm w-fit"
              >
                <MessageCircle size={16} />
                Служба Поддержки
              </a>
            </div>
            <p className="text-muted-foreground text-xs mt-3">
              Все обращения принимаются только в электронном виде на почту support@love-detektor.ru или в онлайн-чат
              «Служба поддержки 24/7»
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Мы в социальных сетях</h3>
            <div className="space-y-3">
              <a
                href="https://vk.com/lovedetektor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-all text-white text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.673 4 8.222c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.422 2.182-3.61 2.182-3.61.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                </svg>
                Наше сообщество в VK
              </a>
              <a
                href="https://t.me/Vernost_Pro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-all text-white text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Наш Telegram канал
              </a>
              <a
                href="https://docs.google.com/document/d/1xVU_GzYzS1y7s6-byQN1K1qUxPSiMIRvtg7hZkL7B3I/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-all text-white font-bold text-sm"
              >
                Политика конфиденциальности
              </a>
              <a
                href="https://docs.google.com/document/d/14Qm9LJnL6ZAUuJrOyxQaXy55-Tt0BaTgDHPJ1iIEa7U/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-all text-white font-bold text-sm"
              >
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-muted-foreground text-xs text-center">© All Rights Reserved. «Проверка на верность онлайн» 2023-2025.</p>
          <p className="text-muted-foreground text-xs text-center mt-2">
            Внимание: Информация, размещённая на сайте, носит исключительно информационный характер и ни при каких
            условиях не является публичной офертой. Мы используем файлы cookie для улучшения качества обслуживания и
            индивидуализации сервисов. Если вы не согласны с их использованием, вы можете изменить настройки браузера.
          </p>
        </div>
      </div>
    </footer>
  )
}
