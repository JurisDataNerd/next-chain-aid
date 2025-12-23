"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { Campaign } from "@/lib/mock-campaigns"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

const PRESET_AMOUNTS = [
  { label: "Rp 50.000", value: 50000 },
  { label: "Rp 100.000", value: 100000 },
  { label: "Rp 250.000", value: 250000 },
  { label: "Rp 500.000", value: 500000 },
  { label: "Rp 1.000.000", value: 1000000 },
]

interface AmountSelectionProps {
  campaign: Campaign
  onSubmit: (data: { amount: number; isAnonymous: boolean; message: string }) => void
  onBack: () => void
}

export function AmountSelection({ campaign, onSubmit, onBack }: AmountSelectionProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [message, setMessage] = useState("")

  const finalAmount = selectedAmount || Number.parseInt(customAmount.replace(/\D/g, "") || "0")

  const handleSubmit = () => {
    if (finalAmount <= 0) {
      alert("Silakan pilih atau masukkan jumlah donasi")
      return
    }

    onSubmit({
      amount: finalAmount,
      isAnonymous,
      message,
    })
  }

  const formatCustomAmount = (value: string) => {
    const numValue = value.replace(/\D/g, "")
    if (numValue === "") {
      setCustomAmount("")
      return
    }
    setCustomAmount(numValue)
    setSelectedAmount(null)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-600 hover:text-slate-900 p-2 -ml-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-blue-950">Pilih Jumlah Donasi</h1>
        <div className="w-5" />
      </div>

      {/* Campaign Summary Card */}
      <Card className="p-4 bg-white space-y-3">
        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={campaign.image || "/placeholder.svg"}
              alt={campaign.title}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Badge className="bg-blue-100 text-blue-800 border-0 mb-2 w-fit">{campaign.category}</Badge>
            <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">{campaign.title}</h3>
            <p className="text-xs text-slate-600 mt-1">{campaign.organization}</p>
          </div>
        </div>
      </Card>

      {/* Amount Selection */}
      <Card className="p-6 bg-white space-y-4">
        <h2 className="font-semibold text-slate-900">Pilih Jumlah</h2>

        <div className="grid grid-cols-2 gap-2">
          {PRESET_AMOUNTS.map((preset) => (
            <Button
              key={preset.value}
              onClick={() => {
                setSelectedAmount(preset.value)
                setCustomAmount("")
              }}
              variant={selectedAmount === preset.value ? "default" : "outline"}
              className={`h-12 ${selectedAmount === preset.value ? "bg-blue-600 hover:bg-blue-700" : "border-slate-200"}`}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="space-y-2">
          <Label className="text-sm text-slate-600">Atau masukkan jumlah custom</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">Rp</span>
            <Input
              type="text"
              placeholder="Masukkan jumlah..."
              value={customAmount}
              onChange={(e) => formatCustomAmount(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        {/* Display Selected Amount */}
        {finalAmount > 0 && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-slate-600">Jumlah donasi Anda</p>
            <p className="text-2xl font-bold text-blue-600">Rp {finalAmount.toLocaleString("id-ID")}</p>
          </div>
        )}
      </Card>

      {/* Optional Donation Settings */}
      <Card className="p-6 bg-white space-y-4">
        <div className="space-y-4">
          {/* Anonymous Checkbox */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <Label htmlFor="anonymous" className="text-sm text-slate-700 cursor-pointer">
              Sembunyikan nama saya (donasi anonim)
            </Label>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm text-slate-700">
              Pesan untuk kampanye (opsional)
            </Label>
            <Textarea
              id="message"
              placeholder="Tulis pesan dukungan Anda..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* CTA Button */}
      <Button
        onClick={handleSubmit}
        disabled={finalAmount <= 0}
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
      >
        Lanjut ke Pembayaran
      </Button>
    </div>
  )
}
