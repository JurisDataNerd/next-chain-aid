"use client"

import { Shield, Zap, Lock, TrendingUp } from "lucide-react"

const features = [
  {
    title: "Transparansi Penuh",
    description: "Setiap transaksi dapat diverifikasi dan dilacak di blockchain",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Berbasis Blockchain",
    description: "Teknologi terdesentralisasi yang aman dan tidak dapat diubah",
    icon: Lock,
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Mudah & Aman",
    description: "Interface intuitif dengan enkripsi tingkat enterprise",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Lacak Real-time",
    description: "Monitor penggunaan dana secara langsung dan real-time",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
  },
]

export function WhyChainAid() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50/50 via-blue-50/30 to-slate-50/50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-sm font-medium text-blue-900">🚀 Keunggulan Kami</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Kenapa ChainAid?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Platform donasi yang menggabungkan kepercayaan, teknologi, dan dampak sosial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent' }} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>

                {/* Decorative gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
