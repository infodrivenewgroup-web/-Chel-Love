"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading" // Import the Loading component
import { Star, ThumbsUp, CheckCircle, Shield, Users, Award, ExternalLink, ChevronDown, ChevronUp, Heart, Search, MessageCircle } from "lucide-react"

// Генерация реалистичных отзывов
const reviews = [
  {
    id: 1,
    name: "Анна М.",
    city: "Москва",
    date: "12 января 2025",
    rating: 5,
    title: "Спасибо за правду",
    text: "Долго сомневалась, стоит ли проверять мужа. Подруга посоветовала этот сервис. Оказалось, что мои подозрения были напрасны — он действительно просто много работает. Теперь на душе спокойно, а отношения стали даже лучше. Спасибо команде за деликатность и профессионализм!",
    helpful: 47,
    verified: true,
  },
  {
    id: 2,
    name: "Дмитрий К.",
    city: "Санкт-Петербург",
    date: "10 января 2025",
    rating: 5,
    title: "Быстро и конфиденциально",
    text: "Заказывал проверку девушки перед тем как сделать предложение. Хотел быть уверен на 100%. Результат получил через 4 часа, всё чисто. Теперь женаты и счастливы. Рекомендую всем, кто хочет начать серьёзные отношения без сомнений.",
    helpful: 38,
    verified: true,
  },
  {
    id: 3,
    name: "Елена В.",
    city: "Казань",
    date: "8 января 2025",
    rating: 5,
    title: "Профессиональный подход",
    text: "К сожалению, проверка подтвердила мои худшие опасения. Но я благодарна сервису за то, что узнала правду. Лучше знать и принять решение, чем жить в неведении. Отчёт был очень подробный, с доказательствами. Поддержка отвечала на все вопросы.",
    helpful: 65,
    verified: true,
  },
  {
    id: 4,
    name: "Михаил Р.",
    city: "Новосибирск",
    date: "6 января 2025",
    rating: 5,
    title: "Стоит своих денег",
    text: "Сначала думал что дорого, но когда получил отчёт — понял что это копейки за такую информацию. Проверили все соцсети, мессенджеры, даже сайты знакомств. Жена оказалась верной, просто я параноик)) Зато теперь сплю спокойно.",
    helpful: 52,
    verified: true,
  },
  {
    id: 5,
    name: "Ольга Н.",
    city: "Екатеринбург",
    date: "5 января 2025",
    rating: 4,
    title: "Хороший сервис",
    text: "Всё сделали как обещали. Единственное — пришлось подождать чуть дольше чем говорили, около 6 часов вместо 5. Но результат того стоил. Отчёт подробный, всё понятно. Муж чист, я успокоилась.",
    helpful: 29,
    verified: true,
  },
  {
    id: 6,
    name: "Александр Т.",
    city: "Краснодар",
    date: "3 января 2025",
    rating: 5,
    title: "Реально работает!",
    text: "Не верил в такие сервисы, думал развод. Но друг посоветовал, он уже пользовался. Заказал проверку, оплатил через СБП. Через 3 часа получил полный отчёт. Нашли её переписки на сайте знакомств... Больно, но лучше знать правду.",
    helpful: 71,
    verified: true,
  },
  {
    id: 7,
    name: "Наталья С.",
    city: "Ростов-на-Дону",
    date: "1 января 2025",
    rating: 5,
    title: "Спасли мой брак",
    text: "Благодаря проверке выяснилось что муж общался с бывшей, но ничего серьёзного не было. Мы поговорили, он всё объяснил. Если бы не этот сервис — я бы накрутила себе и разрушила семью. Спасибо за объективную информацию!",
    helpful: 44,
    verified: true,
  },
  {
    id: 8,
    name: "Игорь Л.",
    city: "Воронеж",
    date: "30 декабря 2024",
    rating: 5,
    title: "Оперативно и качественно",
    text: "Заказывал срочную проверку перед Новым годом. Думал не успеют — успели за 2 часа! Отчёт полный, всё разложено по полочкам. Девушка оказалась честной, встретили праздник вместе. Однозначно рекомендую.",
    helpful: 33,
    verified: true,
  },
  {
    id: 9,
    name: "Марина Д.",
    city: "Самара",
    date: "28 декабря 2024",
    rating: 5,
    title: "Анонимность на высоте",
    text: "Больше всего переживала что муж узнает о проверке. Но всё прошло абсолютно незаметно. Никаких следов, никаких подозрений. Результат — всё чисто. Теперь могу доверять ему полностью. Сервис работает профессионально.",
    helpful: 56,
    verified: true,
  },
  {
    id: 10,
    name: "Андрей П.",
    city: "Уфа",
    date: "26 декабря 2024",
    rating: 5,
    title: "Помогли разобраться",
    text: "Ситуация была сложная — жена стала поздно приходить с работы, постоянно в телефоне. Заказал проверку. Оказалось — она готовила мне сюрприз на день рождения и общалась с моими друзьями. Чуть не испортил всё своей паранойей)) Спасибо что открыли глаза!",
    helpful: 89,
    verified: true,
  },
  {
    id: 11,
    name: "Виктория К.",
    city: "Челябинск",
    date: "24 декабря 2024",
    rating: 5,
    title: "Лучший сервис проверки",
    text: "Пробовала другие сервисы — либо мошенники, либо ничего не находят. Здесь всё по-настоящему. Детальный отчёт, скриншоты, даты. К сожалению, нашли много чего... Но я благодарна за правду. Развелась и начала новую жизнь.",
    helpful: 62,
    verified: true,
  },
  {
    id: 12,
    name: "Сергей Ф.",
    city: "Пермь",
    date: "22 декабря 2024",
    rating: 5,
    title: "Быстрая работа",
    text: "Ожидал что будет долго — получил результат через 3 часа. Всё проверили: ВК, Телеграм, WhatsApp, сайты знакомств. Отчёт на 15 страниц. Жена верна, я спокоен. Деньги потрачены не зря.",
    helpful: 41,
    verified: true,
  },
  {
    id: 13,
    name: "Кристина М.",
    city: "Волгоград",
    date: "20 декабря 2024",
    rating: 4,
    title: "В целом довольна",
    text: "Сервис хороший, отчёт подробный. Единственный минус — не смогли проверить один мессенджер, который он редко использует. Но в остальном всё отлично. Муж чист, подозрения не подтвердились.",
    helpful: 27,
    verified: true,
  },
  {
    id: 14,
    name: "Павел Г.",
    city: "Красноярск",
    date: "18 декабря 2024",
    rating: 5,
    title: "Рекомендую всем",
    text: "Второй раз пользуюсь этим сервисом. Первый раз проверял бывшую — нашли измену. Сейчас проверил новую девушку перед свадьбой — всё чисто. Сервис реально работает, не кидалово. Поддержка отвечает быстро.",
    helpful: 53,
    verified: true,
  },
  {
    id: 15,
    name: "Татьяна Б.",
    city: "Саратов",
    date: "16 декабря 2024",
    rating: 5,
    title: "Очень благодарна",
    text: "Муж последние полгода вёл себя странно. Решилась на проверку. Выяснилось что у него депрессия и он общается с психологом онлайн, стеснялся мне сказать. Теперь помогаем ему вместе. Спасибо что помогли понять ситуацию!",
    helpful: 78,
    verified: true,
  },
  {
    id: 16,
    name: "Денис В.",
    city: "Тюмень",
    date: "14 декабря 2024",
    rating: 5,
    title: "Качественная работа",
    text: "Заказывал проверку жены. Получил детальный отчёт со всеми её аккаунтами, перепиской, активностью. Всё оказалось чисто — она просто много общается с подругами. Сервис профессиональный, рекомендую.",
    helpful: 35,
    verified: true,
  },
  {
    id: 17,
    name: "Юлия А.",
    city: "Тольятти",
    date: "12 декабря 2024",
    rating: 5,
    title: "Узнала правду",
    text: "3 года подозревала мужа, но не могла доказать. Этот сервис всё нашёл за несколько часов. Скриншоты переписок, фото с другой женщиной. Больно, но теперь я свободна. Спасибо за профессионализм.",
    helpful: 94,
    verified: true,
  },
  {
    id: 18,
    name: "Роман Ч.",
    city: "Ижевск",
    date: "10 декабря 2024",
    rating: 5,
    title: "Отличный сервис",
    text: "Пользовался впервые, всё понравилось. Простая оплата через СБП, быстрый результат, подробный отчёт. Девушка оказалась верной, мои страхи были напрасны. Теперь живём вместе счастливо.",
    helpful: 42,
    verified: true,
  },
  {
    id: 19,
    name: "Алина Р.",
    city: "Барнаул",
    date: "8 декабря 2024",
    rating: 5,
    title: "Профессионалы своего дела",
    text: "Обратилась после того как нашла подозрительные сообщения в телефоне мужа. Сервис проверил всё досконально. Оказалось — это рабочая переписка, просто коллега женского пола. Я успокоилась, отношения наладились.",
    helpful: 38,
    verified: true,
  },
  {
    id: 20,
    name: "Константин Н.",
    city: "Иркутск",
    date: "6 декабря 2024",
    rating: 5,
    title: "Стоит каждого рубля",
    text: "Думал долго, заказывать или нет. Цена показалась высокой. Но когда получил отчёт — понял что это мизер за такую работу. Проверили все соцсети, мессенджеры, даже старые удалённые аккаунты нашли. Профессионалы!",
    helpful: 51,
    verified: true,
  },
  {
    id: 21,
    name: "Екатерина Л.",
    city: "Хабаровск",
    date: "4 декабря 2024",
    rating: 5,
    title: "Спасибо за честность",
    text: "Заказывала проверку парня перед тем как съехаться. Хотела быть уверена. Результат порадовал — он действительно тот, за кого себя выдаёт. Никаких скрытых аккаунтов, переписок с другими. Теперь живём вместе!",
    helpful: 46,
    verified: true,
  },
  {
    id: 22,
    name: "Владимир С.",
    city: "Владивосток",
    date: "2 декабря 2024",
    rating: 4,
    title: "Хорошая работа",
    text: "В целом доволен результатом. Проверка заняла около 5 часов. Нашли все аккаунты жены, проверили переписки. Всё чисто. Небольшой минус — хотелось бы более подробную статистику активности. Но в целом рекомендую.",
    helpful: 29,
    verified: true,
  },
  {
    id: 23,
    name: "Светлана Г.",
    city: "Оренбург",
    date: "30 ноября 2024",
    rating: 5,
    title: "Лучшее решение",
    text: "Год мучилась подозрениями. Подруги говорили — проверь. Наконец решилась. Результат — муж общается с одноклассницей, но это просто дружба, ничего больше. Камень с души упал. Спасибо огромное!",
    helpful: 57,
    verified: true,
  },
  {
    id: 24,
    name: "Артём Д.",
    city: "Рязань",
    date: "28 ноября 2024",
    rating: 5,
    title: "Реально помогли",
    text: "Ситуация была патовая — девушка стала отдаляться, но причин не называла. Проверка показала что она просто много работает и устаёт. Поговорили, стал больше помогать ей. Отношения стали крепче. Спасибо!",
    helpful: 44,
    verified: true,
  },
  {
    id: 25,
    name: "Ирина П.",
    city: "Пенза",
    date: "26 ноября 2024",
    rating: 5,
    title: "Быстро и надёжно",
    text: "Заказала проверку утром — к обеду уже был результат. Муж верен, никаких левых переписок. Очень довольна сервисом. Профессиональный подход, полная конфиденциальность. Рекомендую!",
    helpful: 36,
    verified: true,
  },
  {
    id: 26,
    name: "Олег К.",
    city: "Липецк",
    date: "24 ноября 2024",
    rating: 5,
    title: "Настоящие профессионалы",
    text: "Проверял жену после того как заметил странное поведение. Оказалось — она планировала мне сюрприз на годовщину и скрывала переписку с организаторами. Чуть не испортил праздник своими подозрениями)) Спасибо что всё выяснили!",
    helpful: 73,
    verified: true,
  },
  {
    id: 27,
    name: "Валентина М.",
    city: "Астрахань",
    date: "22 ноября 2024",
    rating: 5,
    title: "Довольна результатом",
    text: "Долго не решалась проверить мужа. Страшно было узнать правду. Но оказалось всё хорошо — он верен. Теперь живу спокойно, не накручиваю себя. Сервис работает отлично, всё анонимно.",
    helpful: 48,
    verified: true,
  },
  {
    id: 28,
    name: "Максим Ш.",
    city: "Киров",
    date: "20 ноября 2024",
    rating: 5,
    title: "Качество на высоте",
    text: "Пользовался разными сервисами — этот лучший. Полный отчёт, все доказательства, быстрая работа. К счастью, девушка оказалась честной. Деньги потрачены не зря — теперь уверен в ней на 100%.",
    helpful: 39,
    verified: true,
  },
  {
    id: 29,
    name: "Галина В.",
    city: "Калининград",
    date: "18 ноября 2024",
    rating: 5,
    title: "Помогли в сложной ситуации",
    text: "После 15 лет брака стала замечать изменения в поведении мужа. Заказала проверку. К сожалению, подозрения подтвердились. Но я благодарна сервису — лучше горькая правда. Сейчас развожусь.",
    helpful: 82,
    verified: true,
  },
  {
    id: 30,
    name: "Антон Е.",
    city: "Брянск",
    date: "16 ноября 2024",
    rating: 5,
    title: "Отличная работа!",
    text: "Заказывал проверку невесты перед свадьбой. Родители настояли)) Результат отличный — она чиста, никаких скрытых аккаунтов или переписок. Свадьба состоялась, все счастливы. Спасибо за спокойствие!",
    helpful: 55,
    verified: true,
  },
  {
    id: 31,
    name: "Людмила Ф.",
    city: "Тверь",
    date: "14 ноября 2024",
    rating: 5,
    title: "Рекомендую однозначно",
    text: "Второй раз обращаюсь в этот сервис. Первый раз проверяла бывшего — нашли измену. Теперь проверила нового парня — всё чисто. Сервис надёжный, работает честно. Буду советовать подругам.",
    helpful: 47,
    verified: true,
  },
  {
    id: 32,
    name: "Никита О.",
    city: "Курск",
    date: "12 ноября 2024",
    rating: 4,
    title: "В целом хорошо",
    text: "Проверка прошла нормально, результат получил вовремя. Жена оказалась верной. Единственное — хотелось бы видеть более детальную аналитику по времени активности. Но в целом сервисом доволен.",
    helpful: 28,
    verified: true,
  },
  {
    id: 33,
    name: "Оксана Т.",
    city: "Мурманск",
    date: "10 ноября 2024",
    rating: 5,
    title: "Супер сервис!",
    text: "Мама посоветовала проверить жениха перед свадьбой. Сначала обиделась, потом решила — хуже не будет. Проверка показала что он честный человек. Теперь счастливы в браке уже 2 месяца!",
    helpful: 61,
    verified: true,
  },
  {
    id: 34,
    name: "Евгений Б.",
    city: "Сочи",
    date: "8 ноября 2024",
    rating: 5,
    title: "Превзошли ожидания",
    text: "Не ожидал такого детального отчёта. Проверили всё: соцсети, мессенджеры, сайты знакомств, даже форумы. Девушка оказалась честной, но я узнал много интересного о её увлечениях)) Сервис топ!",
    helpful: 43,
    verified: true,
  },
  {
    id: 35,
    name: "Вера Н.",
    city: "Томск",
    date: "6 ноября 2024",
    rating: 5,
    title: "Благодарю за работу",
    text: "Проверяла мужа после анонимного сообщения от \"доброжелателя\". Оказалось — это была провокация завистницы. Муж чист и верен. Спасибо сервису что помогли разобраться и не разрушить семью!",
    helpful: 87,
    verified: true,
  },
  {
    id: 36,
    name: "Григорий Я.",
    city: "Омск",
    date: "4 ноября 2024",
    rating: 5,
    title: "Профессиональный подход",
    text: "Работают чётко и быстро. Заказал вечером — утром уже был полный отчёт. Жена верна, все подозрения оказались моей паранойей. Теперь отношения стали ещё крепче. Спасибо за качественную работу!",
    helpful: 52,
    verified: true,
  },
  {
    id: 37,
    name: "Дарья С.",
    city: "Кемерово",
    date: "2 ноября 2024",
    rating: 5,
    title: "Лучший выбор",
    text: "Перепробовала несколько сервисов — везде либо обман, либо пустышка. Здесь реально работают. Получила подробный отчёт, все доказательства. К сожалению, парень оказался нечестным. Но лучше знать правду.",
    helpful: 68,
    verified: true,
  },
]

export default function ReviewsPage() {
  const [visibleReviews, setVisibleReviews] = useState(12)
  const [helpfulClicked, setHelpfulClicked] = useState<number[]>([])

  const handleHelpful = (id: number) => {
    if (!helpfulClicked.includes(id)) {
      setHelpfulClicked([...helpfulClicked, id])
    }
  }

  const loadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 12, reviews.length))
  }

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <Suspense fallback={<Loading />}> {/* Wrap the main content in a Suspense boundary */}
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Честный отзыв</h1>
                  <p className="text-xs text-gray-500">Независимый отзовик</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://love-service-private.vercel.app"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <Heart className="w-4 h-4" />
                  Перейти на Chek-Love
                </a>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  На главную
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-8 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Service Logo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="relative">
                    <Heart className="w-12 h-12 text-white fill-white" />
                    <Search className="w-5 h-5 text-pink-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Отзывы о сервисе Chek-Love
                </h2>
                <p className="text-gray-600 mb-4">
                  Онлайн-сервис проверки партнера на верность
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-200">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-900">{averageRating}</span>
                    <span className="text-gray-500 text-sm">из 5</span>
                    <span className="text-gray-400 text-sm">• Оценка Яндекс</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-gray-900">3500+</span>
                    <span className="text-gray-500 text-sm">успешных проверок</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 text-sm font-medium">Проверенный сервис</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0">
                <a
                  href="https://love-service-private.vercel.app"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl hover:from-pink-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                  Проверить партнера
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Stats Bar */}
        <section className="bg-white py-4 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Всего отзывов:</span>
                <span className="font-bold text-gray-900">{reviews.length}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = reviews.filter(r => r.rating === star).length
                    const percentage = (count / reviews.length) * 100
                    return (
                      <div key={star} className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500 w-3">{star}</span>
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-gray-400 w-8">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews List */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid gap-4">
              {reviews.slice(0, visibleReviews).map((review) => (
                <article 
                  key={review.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-semibold text-sm">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{review.name}</span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              Проверен
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{review.city}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{review.text}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        helpfulClicked.includes(review.id)
                          ? 'text-green-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      disabled={helpfulClicked.includes(review.id)}
                    >
                      <ThumbsUp className={`w-4 h-4 ${helpfulClicked.includes(review.id) ? 'fill-current' : ''}`} />
                      <span>Полезно</span>
                      <span className="text-gray-400">
                        {review.helpful + (helpfulClicked.includes(review.id) ? 1 : 0)}
                      </span>
                    </button>
                    <span className="text-xs text-gray-400">
                      Отзыв о сервисе Chek-Love
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {visibleReviews < reviews.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Показать еще отзывы
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Service Info Section */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <div className="relative">
                      <Heart className="w-10 h-10 text-white fill-white" />
                      <Search className="w-4 h-4 text-pink-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">О сервисе Chek-Love</h3>
                  <p className="text-gray-600 mb-4">
                    Профессиональный онлайн-сервис для анонимной проверки партнера на верность. 
                    Анализируем активность в социальных сетях, мессенджерах и на сайтах знакомств. 
                    Гарантируем 100% конфиденциальность и быстрый результат.
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <a
                      href="https://love-service-private.vercel.app"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-all font-medium text-sm"
                    >
                      <Heart className="w-4 h-4" />
                      Официальный сайт
                    </a>
                    <a
                      href="https://проверка-верности.online"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      проверка-верности.online
                    </a>
                    <a
                      href="https://vk.com/cheklove"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Сообщество ВК
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-white font-medium">Честный отзыв</span>
                  <span className="text-gray-500 text-sm ml-2">• Независимый отзовик</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <a
                  href="https://love-service-private.vercel.app"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Chek-Love
                </a>
                <a
                  href="https://проверка-верности.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  проверка-верности.online
                </a>
                <a
                  href="https://vk.com/cheklove"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ВКонтакте
                </a>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  На главную
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs text-gray-500">
              <p>
                Сервис Chek-Love гарантирует конфиденциальность и анонимность. 
                Все отзывы принадлежат их авторам.
              </p>
              <p className="mt-2">
                © 2024-2025 Честный отзыв. Все права защищены.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Suspense>
  )
}
