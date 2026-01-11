"use client"

import { CheckCircle, Gift, Lock, Eye } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Pilih Campaign",
    description: "Jelajahi dan pilih campaign yang ingin Anda dukung",
    icon: Gift,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    number: 2,
    title: "Donasi via Wallet",
    description: "Proses pembayaran mudah dan aman dengan crypto wallet",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    number: 3,
    title: "Tercatat di Blockchain",
    description: "Transaksi Anda tersimpan permanen di blockchain",
    icon: Lock,
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
  },
  {
    number: 4,
    title: "Pantau Transparansi",
    description: "Lihat bagaimana dana Anda digunakan secara real-time",
    icon: Eye,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
  },
]

export function HowItWorks() {
  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/30 to-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-sm font-medium text-blue-900">✨ Proses Mudah</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Cara Kerja
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Empat langkah sederhana menuju donasi yang transparan dan terverifikasi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative group">
                {/* Connection line - hidden on mobile */}
                {step.number < 4 && (
                  <div className="hidden lg:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent" />
                )}

                <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 h-full">
                  {/* Number badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-md">
                    <span className="text-lg font-bold text-slate-700">0{step.number}</span>
                  </div>

                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${step.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 bg-gradient-to-br ${step.color} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent' }} />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Decorative gradient */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
