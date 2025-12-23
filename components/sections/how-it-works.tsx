"use client"

import { CheckCircle, Gift, Lock, Eye } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Pilih Campaign",
    description: "Jelajahi dan pilih campaign yang ingin Anda dukung",
    icon: Gift,
  },
  {
    number: 2,
    title: "Donasi via QRIS",
    description: "Proses pembayaran mudah dan aman dengan QRIS",
    icon: CheckCircle,
  },
  {
    number: 3,
    title: "Tercatat di Blockchain",
    description: "Transaksi Anda tersimpan permanen di blockchain",
    icon: Lock,
  },
  {
    number: 4,
    title: "Pantau Transparansi",
    description: "Lihat bagaimana dana Anda digunakan secara real-time",
    icon: Eye,
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-950">Cara Kerja</h2>
          <p className="text-lg text-slate-600">Empat langkah sederhana menuju donasi yang transparan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {/* Connection line - hidden on mobile */}
                {step.number < 4 && <div className="hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-blue-200" />}

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-bold text-slate-400">0{step.number}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-blue-950">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
