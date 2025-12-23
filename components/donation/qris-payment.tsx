"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Campaign } from "@/lib/mock-campaigns"
import { ChevronLeft, Clock } from "lucide-react"

interface QrisPaymentProps {
  campaign: Campaign
  donationData: {
    amount: number
    isAnonymous: boolean
    message: string
  }
  onSubmit: () => void
  onBack: () => void
}

export function QrisPayment({ campaign, donationData, onSubmit, onBack }: QrisPaymentProps) {
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-600 hover:text-slate-900 p-2 -ml-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-blue-950">QRIS Payment</h1>
        <div className="w-5" />
      </div>

      {/* Order Summary */}
      <Card className="p-6 bg-white space-y-4">
        <h2 className="font-semibold text-slate-900">Ringkasan Donasi</h2>

        <div className="space-y-3 py-3 border-y border-slate-200">
          <div className="flex justify-between">
            <span className="text-slate-600">Campaign</span>
            <span className="font-medium text-slate-900">{campaign.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Jumlah Donasi</span>
            <span className="font-medium text-slate-900">Rp {donationData.amount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Biaya Admin</span>
            <span className="font-medium text-slate-900">Gratis</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold text-slate-900">Total</span>
          <span className="text-2xl font-bold text-blue-600">Rp {donationData.amount.toLocaleString("id-ID")}</span>
        </div>
      </Card>

      {/* QRIS Code */}
      <Card className="p-8 bg-white flex flex-col items-center gap-4">
        <div className="w-56 h-56 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
          {/* QRIS Code Placeholder */}
          <div className="w-48 h-48 bg-white rounded-md flex items-center justify-center">
            <svg className="w-40 h-40 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h2v2h-2v-2zm2 2h2v2h-2v-2zm2 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2z" />
            </svg>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-slate-600">Scan dengan aplikasi</p>
          <p className="font-semibold text-slate-900">mobile banking Anda</p>
        </div>
      </Card>

      {/* Timer */}
      <Card className="p-4 bg-amber-50 border border-amber-200 flex items-center gap-3">
        <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-amber-800">
            Pembayaran akan berakhir dalam <span className="font-semibold">{formatTime(timeRemaining)}</span>
          </p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button onClick={onSubmit} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          Saya Sudah Membayar
        </Button>

        <Button
          onClick={onBack}
          variant="outline"
          className="w-full h-12 border-slate-200 text-slate-700 font-semibold bg-transparent"
        >
          Batalkan
        </Button>
      </div>
    </div>
  )
}
