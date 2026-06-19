import type { Metadata } from "next"
import ClientPage from "./client-page"

// Данные проверяемого человека
const profileData = {
  phone: "+7 (9XX) XXX-XX-47",
  checkDate: "12.12.2025",
  checkTime: "14:32",
  reportId: "VER-2025-48291",
}

// Секции отчёта с данными
const reportSections = [
  {
    id: "vk",
    title: "ВКонтакте",
    icon: "Users",
    color: "blue",
    delay: 0,
    content: {
      status: "Обнаружен основной профиль",
      findings: [
        { label: "ID профиля", value: "id2847XXXXX", note: "(В полном отчёте — прямая ссылка)" },
        { label: "Имя профиля", value: "Александр М.", note: "" },
        { label: "Статус профиля", value: "Активен, последний визит: сегодня в 11:24", note: "", highlight: true },
        {
          label: "Скрытые друзья",
          value: "47 человек",
          note: "(В полном отчёте — полный список с профилями)",
          highlight: true,
        },
        {
          label: "Подозрительные контакты",
          value: "12 женских профилей с частой перепиской",
          note: "(В полном отчёте — детальная информация)",
          highlight: true,
        },
      ],
      chart: {
        title: "Активность переписки за последние 7 дней",
        data: [45, 62, 38, 91, 78, 55, 84],
        labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      },
    },
  },
  {
    id: "telegram",
    title: "Telegram",
    icon: "MessageCircle",
    color: "sky",
    delay: 200,
    content: {
      status: "Обнаружен аккаунт",
      findings: [
        { label: "Username", value: "@alex_mXXX", note: "(В полном отчёте — прямая ссылка)" },
        { label: "Статус", value: "Онлайн был: 2 часа назад", note: "" },
        { label: "Группы и каналы", value: "Состоит в 34 группах/каналах", note: "" },
        {
          label: "Каналы 18+",
          value: "Обнаружена подписка на 3 канала для взрослых",
          note: "(В полном отчёте — названия каналов)",
          highlight: true,
        },
        {
          label: "Группы знакомств",
          value: "Активность в 2 группах знакомств вашего города",
          note: "(В полном отчёте — названия и активность)",
          highlight: true,
        },
      ],
      alert: "Замечена повышенная активность в ночное время (00:00-03:00)",
    },
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    icon: "Smartphone",
    color: "green",
    delay: 400,
    content: {
      status: "Обнаружен дополнительный аккаунт",
      findings: [
        { label: "Основной номер", value: "+7 (9XX) XXX-XX-47", note: "" },
        {
          label: "Дополнительный номер",
          value: "+7 (9XX) XXX-XX-83",
          note: "(В полном отчёте — полный номер)",
          highlight: true,
        },
        { label: "Статус доп. аккаунта", value: "Активно используется", note: "", highlight: true },
        {
          label: "Частые контакты",
          value: "5 неизвестных вам номеров с регулярной перепиской",
          note: "(В полном отчёте — номера и частота общения)",
          highlight: true,
        },
      ],
      alert: "Дополнительный аккаунт WhatsApp зарегистрирован на другой номер телефона",
    },
  },
  {
    id: "instagram",
    title: "Instagram",
    icon: "Camera",
    color: "pink",
    delay: 600,
    content: {
      status: "Обнаружено 2 профиля",
      findings: [
        { label: "Основной профиль", value: "@alex.mXXX (открытый)", note: "(В полном отчёте — прямая ссылка)" },
        {
          label: "Скрытый профиль",
          value: "@night_aXXX (закрытый)",
          note: "(В полном отчёте — прямая ссылка)",
          highlight: true,
        },
        { label: "Подписки скрытого", value: "89% — женские аккаунты", note: "", highlight: true },
        {
          label: "Активность лайков",
          value: "127 лайков женским фото за неделю",
          note: "(В полном отчёте — список профилей)",
          highlight: true,
        },
      ],
    },
  },
  {
    id: "ok",
    title: "Одноклассники",
    icon: "Users",
    color: "orange",
    delay: 800,
    content: {
      status: "Профиль обнаружен",
      findings: [
        { label: "Профиль", value: "Александр, 32 года", note: "(В полном отчёте — прямая ссылка)" },
        { label: "Последний визит", value: "Вчера в 23:47", note: "" },
        { label: "Скрытые гости", value: "Включен режим невидимки", note: "", highlight: true },
        {
          label: "Активность",
          value: "Регулярные посещения женских страниц",
          note: "(В полном отчёте — детали)",
          highlight: true,
        },
      ],
    },
  },
  {
    id: "dating",
    title: "Сайты знакомств",
    icon: "Heart",
    color: "red",
    delay: 1000,
    content: {
      status: "ОБНАРУЖЕНЫ АКТИВНЫЕ ПРОФИЛИ",
      statusHighlight: true,
      findings: [
        {
          label: "Tinder",
          value: "Активный профиль, последняя активность: вчера",
          note: "(В полном отчёте — скриншот профиля)",
          highlight: true,
        },
        {
          label: "Badoo",
          value: "Профиль удалён, но данные восстановлены",
          note: "(В полном отчёте — архивные данные)",
          highlight: true,
        },
        {
          label: "Mamba",
          value: "Скрытый профиль обнаружен",
          note: "(В полном отчёте — прямая ссылка)",
          highlight: true,
        },
        { label: "Совпадения Tinder", value: "23 совпадения за последний месяц", note: "", highlight: true },
      ],
      alert: "Профиль на Tinder содержит фото, которых нет в основных соцсетях",
    },
  },
  {
    id: "tiktok",
    title: "TikTok",
    icon: "Activity",
    color: "purple",
    delay: 1200,
    content: {
      status: "Аккаунт обнаружен",
      findings: [
        { label: "Профиль", value: "@alex_mXXXX", note: "(В полном отчёте — прямая ссылка)" },
        { label: "Подписки", value: "312 аккаунтов (78% — девушки)", note: "", highlight: true },
        {
          label: "Комментарии",
          value: "Активно комментирует женский контент",
          note: "(В полном отчёте — примеры)",
          highlight: true,
        },
      ],
    },
  },
  {
    id: "location",
    title: "Геолокация и цифровой след",
    icon: "MapPin",
    color: "emerald",
    delay: 1400,
    content: {
      status: "Данные получены",
      findings: [
        {
          label: "Частые локации",
          value: "3 адреса помимо дома и работы",
          note: "(В полном отчёте — точные адреса)",
          highlight: true,
        },
        {
          label: "Подозрительные визиты",
          value: "Регулярные посещения одного адреса по вечерам",
          note: "(В полном отчёте — даты и время)",
          highlight: true,
        },
        {
          label: "История браузера",
          value: "Посещение сайтов знакомств и отелей",
          note: "(В полном отчёте — список сайтов)",
          highlight: true,
        },
      ],
      alert: "Обнаружены регулярные посещения адреса, не связанного с работой или домом",
    },
  },
]

// Итоговая статистика
const summaryStats = [
  { label: "Найдено профилей", value: 14, color: "red" },
  { label: "Соцсетей проверено", value: 8, color: "blue" },
  { label: "Сайтов знакомств", value: 3, color: "pink" },
  { label: "Скрытых контактов", value: 47, color: "purple" },
  { label: "Подозрительных действий", value: 28, color: "orange" },
  { label: "Уровень риска", value: "89%", color: "red", isRisk: true },
]

export const metadata: Metadata = {
  title: "Примеры проверок партнера | Chek-Love",
  description: "Демонстрация отчета проверки партнера на измену. Посмотрите пример анализа соцсетей и мессенджеров.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
}

export default function ExamplesPage() {
  return <ClientPage profileData={profileData} reportSections={reportSections} summaryStats={summaryStats} />
}
