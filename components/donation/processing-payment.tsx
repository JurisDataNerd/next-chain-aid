"use client"

import { Card } from "@/components/ui/card"

export function ProcessingPayment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Card className="p-8 bg-white w-full max-w-sm text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">Memverifikasi Pembayaran</h2>
          <p className="text-slate-600">Mohon tunggu, kami sedang memproses donasi Anda...</p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.1s" }} />
          <div className="w-2 h-2 rounded-full bg-blue-200 animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
      </Card>
    </div>
  )
}
