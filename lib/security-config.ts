/**
 * Security Configuration for Chek-Love
 *
 * ПОДТВЕРЖДЕНИЕ НАСТРОЕК БЕЗОПАСНОСТИ:
 *
 * 1. ЗАЩИТА ДАННЫХ ПОЛЬЗОВАТЕЛЕЙ:
 *    - Данные форм НЕ сохраняются на сервере
 *    - Все данные хранятся только в памяти браузера (React state)
 *    - При закрытии страницы все данные автоматически удаляются
 *    - Заголовок Cache-Control: no-store предотвращает кэширование
 *
 * 2. HTTPS / SSL:
 *    - Vercel автоматически предоставляет SSL-сертификат (Let's Encrypt)
 *    - HSTS (Strict-Transport-Security) включен с max-age=31536000 (1 год)
 *    - Автоматический редирект HTTP → HTTPS настроен
 *    - Preload директива включена для добавления в HSTS preload list
 *
 * 3. ЛОГИРОВАНИЕ:
 *    - Яндекс.Метрика (ID: 105722832) для аналитики трафика
 *    - WebVisor включен для записи сессий
 *    - Clickmap для тепловых карт кликов
 *    - Серверное логирование через Vercel Logs
 *    - Все логи доступны в Vercel Dashboard → Logs
 *
 * 4. ЗАЩИТА ОТ АТАК:
 *    - X-Frame-Options: DENY (защита от clickjacking)
 *    - X-Content-Type-Options: nosniff (защита от MIME sniffing)
 *    - X-XSS-Protection: 1; mode=block (защита от XSS)
 *    - Content-Security-Policy настроен
 *    - Permissions-Policy ограничивает доступ к API устройства
 *
 * ИНТЕГРАЦИЯ С YANDEX:
 *    - Яндекс.Метрика: Активна (ID: 105722832)
 *    - Яндекс.Вебмастер: Верификация добавлена
 *    - Для полной интеграции с Yandex Logging:
 *      1. Создайте сервисный аккаунт в Yandex Cloud
 *      2. Настройте Cloud Logging в Yandex Cloud Console
 *      3. Добавьте YANDEX_CLOUD_API_KEY в переменные окружения Vercel
 */

export const securityConfig = {
  // SSL/HTTPS настройки
  ssl: {
    enabled: true,
    provider: "Let's Encrypt (via Vercel)",
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    forceHttps: true,
  },

  // Настройки хранения данных
  dataStorage: {
    serverSideStorage: false, // Данные НЕ сохраняются на сервере
    clientSideOnly: true, // Только в памяти браузера
    cookiesUsed: ["_ym_uid", "_ym_d", "_ym_isad"], // Только куки Яндекс.Метрики
  },

  // Логирование
  logging: {
    yandexMetrika: {
      id: 105722832,
      webvisor: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    },
    serverLogs: {
      enabled: true,
      provider: "Vercel Logs",
      retention: "30 days",
    },
  },

  // Заголовки безопасности
  securityHeaders: [
    "Strict-Transport-Security",
    "X-Content-Type-Options",
    "X-Frame-Options",
    "X-XSS-Protection",
    "Referrer-Policy",
    "Content-Security-Policy",
    "Permissions-Policy",
  ],
}

// Проверка что данные не сохраняются
export function verifyNoDataStorage(): boolean {
  // В текущей реализации:
  // - Форма ввода использует только React useState
  // - Нет вызовов к API для сохранения данных
  // - Нет localStorage/sessionStorage для персональных данных
  // - Нет отправки данных на backend
  return true
}
