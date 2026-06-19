"use client"

import { useEffect, useState } from "react"
import { PartyPopper, AlertTriangle, Send, Heart, Search } from "lucide-react"

export function SuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
                backgroundColor: ["#dc143c", "#0080ff", "#ffd700", "#00c853"][Math.floor(Math.random() * 4)],
                animation: `confettiFall ${2 + Math.random() * 3}s linear forwards`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`blue-${i}`}
            className="absolute w-2 h-2 rounded-full bg-secondary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <main className="flex-1 px-4 flex items-center justify-center relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="fade-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/30 scale-in">
              <PartyPopper className="w-12 h-12 text-white" />
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 40px rgba(255, 215, 0, 0.5)" }}
            >
              ВАШ ОТЧЕТ ПО ПРОВЕРКЕ СФОРМИРОВАН И ГОТОВ К ОТПРАВКЕ!
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-4">Вся информация собрана и структурирована для вашего удобства.</p>
            <p className="text-lg md:text-xl text-white font-medium mb-8">Выберите удобный способ получения отчета:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-xl mx-auto">
              <a
                href="https://t.me/VernostProffiBot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl font-bold text-lg transition-all hover:scale-105"
                style={{ boxShadow: "0 0 20px rgba(0, 136, 204, 0.4)" }}
              >
                <Send size={24} strokeWidth={2.5} />
                <span>Получить через Telegram</span>
              </a>

              <a
                href="https://vk.com/app6013442_-229851022?form_id=16#form_id=16&form_id=16%23form_id=16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#4C75A3] hover:bg-[#3d6089] text-white rounded-xl font-bold text-lg transition-all hover:scale-105"
                style={{ boxShadow: "0 0 20px rgba(76, 117, 163, 0.4)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 16.615h-1.814c-.685 0-.896-.543-2.127-1.796-1.071-1.038-1.543-1.178-1.806-1.178-.366 0-.472.105-.472.612v1.638c0 .437-.138.701-1.292.701-1.907 0-4.025-1.157-5.516-3.309-2.237-3.146-2.85-5.501-2.85-5.982 0-.263.105-.508.612-.508h1.814c.456 0 .63.193.806.665.89 2.57 2.377 4.82 2.99 4.82.228 0 .333-.105.333-.682V8.843c-.07-1.223-.717-1.326-.717-1.762 0-.21.175-.42.455-.42h2.85c.385 0 .525.193.525.63v3.416c0 .386.175.525.28.525.228 0 .42-.14.84-.56 1.3-1.456 2.226-3.696 2.226-3.696.124-.263.332-.508.79-.508h1.814c.543 0 .665.28.543.665-.227 1.05-2.43 4.16-2.43 4.16-.193.315-.263.456 0 .806.193.263.824.806 1.248 1.296.788.893 1.385 1.646 1.545 2.16.175.508-.087.77-.613.77z"/>
                </svg>
                <span>Получить через ВК</span>
              </a>

              <a
                href="https://t.me/LoveDetektor_Bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl font-bold text-lg transition-all hover:scale-105"
                style={{ boxShadow: "0 0 20px rgba(220, 20, 60, 0.4)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Служба поддержки 24/7</span>
              </a>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6 max-w-lg mx-auto">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-yellow-500 font-semibold mb-2">Обратите внимание:</p>
                  <p className="text-yellow-200/80 text-sm">
                    Повторная подача заявки не требуется. Отчет уже сформирован.
                  </p>
                  <p className="text-yellow-200/80 text-sm mt-2">
                    В целях конфиденциальности мы удаляем отчет сразу после получения. Повторная отправка будет
                    недоступна.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="relative">
            <Heart className="w-7 h-7 text-primary fill-primary" />
            <Search className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xl font-bold text-white">Детектор верности онлайн</span>
        </div>
        <p className="text-gray-400 text-sm">
          Профессиональный онлайн-сервис. 100% анонимность и гарантированный результат.
        </p>
      </footer>

      <style jsx>{`
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
