import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chek-Love — Проверка на верность онлайн | AMP",
  description:
    "Профессиональный онлайн-сервис проверки партнера на верность. Анализ ВКонтакте, Telegram, WhatsApp, Instagram. 100% анонимно.",
  keywords:
    "проверка верности онлайн, проверить партнера по номеру телефона, скрытая проверка в ВК, найти скрытый аккаунт, сервис проверки на верность, анализ соцсетей партнера",
}

export default function AMPPage() {
  const ampStyles = `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a1a 100%);
      color: #ffffff;
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #ef4444;
    }
    .hero {
      text-align: center;
      padding: 60px 20px;
    }
    .hero h1 {
      font-size: 36px;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #ef4444, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero p {
      font-size: 18px;
      color: #9ca3af;
      margin-bottom: 30px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      color: white;
      padding: 16px 40px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;
      box-shadow: 0 0 30px rgba(220,38,38,0.5);
    }
    .features {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      padding: 40px 0;
    }
    .feature {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 24px;
      width: 300px;
      text-align: center;
    }
    .feature h3 {
      color: #ef4444;
      margin-bottom: 10px;
    }
    .feature p {
      color: #9ca3af;
      font-size: 14px;
    }
    .services {
      text-align: center;
      padding: 40px 0;
    }
    .services h2 {
      font-size: 28px;
      margin-bottom: 30px;
    }
    .service-list {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
    }
    .service-item {
      background: rgba(59,130,246,0.1);
      border: 1px solid rgba(59,130,246,0.3);
      padding: 12px 24px;
      border-radius: 8px;
      color: #60a5fa;
    }
    .footer {
      text-align: center;
      padding: 40px 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: #6b7280;
    }
    @media (max-width: 768px) {
      .hero h1 { font-size: 28px; }
      .feature { width: 100%; }
    }
  `

  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style
          dangerouslySetInnerHTML={{
            __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`,
          }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`,
            }}
          />
        </noscript>
        <style dangerouslySetInnerHTML={{ __html: ampStyles }} />
        <link rel="canonical" href="https://v0-vernost-pro-servis.vercel.app/" />
      </head>
      <body>
        <div className="container">
          <header className="header">
            <div className="logo">Chek-Love</div>
            <a href="/" style={{ color: "#60a5fa", textDecoration: "none" }}>
              Полная версия сайта
            </a>
          </header>

          <section className="hero">
            <h1>Проверка партнера на верность онлайн</h1>
            <p>
              Профессиональный анализ социальных сетей и мессенджеров. Узнайте правду о своём партнёре анонимно и
              безопасно.
            </p>
            <a href="/#check-form" className="cta-button">
              Начать проверку
            </a>
          </section>

          <section className="features">
            <div className="feature">
              <h3>100% Анонимно</h3>
              <p>Партнёр никогда не узнает о проверке. Полная конфиденциальность гарантирована.</p>
            </div>
            <div className="feature">
              <h3>Быстрый результат</h3>
              <p>Получите детальный отчёт о цифровой активности вашего партнёра.</p>
            </div>
            <div className="feature">
              <h3>Глубокий анализ</h3>
              <p>Проверка 8+ социальных сетей, мессенджеров и сайтов знакомств.</p>
            </div>
          </section>

          <section className="services">
            <h2>Какие сервисы мы проверяем</h2>
            <div className="service-list">
              <span className="service-item">ВКонтакте</span>
              <span className="service-item">Telegram</span>
              <span className="service-item">WhatsApp</span>
              <span className="service-item">Instagram</span>
              <span className="service-item">Одноклассники</span>
              <span className="service-item">TikTok</span>
              <span className="service-item">Сайты знакомств</span>
              <span className="service-item">Геолокация</span>
            </div>
          </section>

          <section className="features">
            <div className="feature">
              <h3>Скрытые друзья ВК</h3>
              <p>Раскрываем закрытые списки друзей и подписчиков.</p>
            </div>
            <div className="feature">
              <h3>Удалённые аккаунты</h3>
              <p>Находим удалённые профили на сайтах знакомств.</p>
            </div>
            <div className="feature">
              <h3>Цифровая активность</h3>
              <p>Анализ переписок, лайков, комментариев и взаимодействий.</p>
            </div>
          </section>

          <footer className="footer">
            <p>Chek-Love — Профессиональный онлайн-сервис проверки на верность</p>
            <p>100% анонимность и гарантированный результат</p>
            <p style={{ marginTop: "20px" }}>
              <a href="/" style={{ color: "#ef4444", textDecoration: "none", fontWeight: "bold" }}>
                Перейти к полной версии сайта для проверки
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  )
}
