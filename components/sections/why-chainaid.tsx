"use client"

import { Shield, Zap, Lock, TrendingUp } from "lucide-react"

const features = [
  {
    title: "Transparansi Penuh",
    description: "Setiap transaksi dapat diverifikasi dan dilacak di blockchain",
    icon: TrendingUp,
  },
  {
    title: "Berbasis Blockchain",
    description: "Teknologi terdesentralisasi yang aman dan tidak dapat diubah",
    icon: Lock,
  },
  {
    title: "Mudah & Aman",
    description: "Interface intuitif dengan enkripsi tingkat enterprise",
    icon: Shield,
  },
  {
    title: "Lacak Real-time",
    description: "Monitor penggunaan dana secara langsung dan real-time",
    icon: Zap,
  },
]

export function WhyChainAid() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-950">Kenapa ChainAid?</h2>
          <p className="text-lg text-slate-600">
            Platform donasi yang menggabungkan kepercayaan, teknologi, dan dampak sosial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="space-y-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-blue-950">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
