"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Campaign } from "@/lib/types"
import { CheckCircle2, Share2, ExternalLink } from "lucide-react"

interface SuccessScreenProps {
  campaign: Campaign
  donationData: {
    amount: number
    isAnonymous: boolean
    message: string
  }
  receiptNumber: string
  txHash: string
  onDone: () => void
}

export function SuccessScreen({ campaign, donationData, receiptNumber, txHash, onDone }: SuccessScreenProps) {
  const handleShare = () => {
    const text = `Saya baru saja berdonasi untuk kampanye "${campaign.title}" melalui ChainAid. Mari bergabung dalam kebaikan ini! 🙏`
    if (navigator.share) {
      navigator.share({
        title: "ChainAid",
        text,
      })
    } else {
      // Fallback untuk copy to clipboard
      navigator.clipboard.writeText(text)
      alert("Teks donasi telah disalin ke clipboard")
    }
  }

  const etherscanUrl = `https://etherscan.io/tx/${txHash}`

  return (
    <div className="space-y-4">
      {/* Success Icon */}
      <Card className="p-8 bg-white flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-blue-950 text-center">Donasi Berhasil!</h1>
        <p className="text-slate-600 text-center">Terima kasih atas kontribusi Anda untuk kampanye {campaign.title}</p>
      </Card>

      {/* Donation Details */}
      <Card className="p-6 bg-white space-y-4">
        <h2 className="font-semibold text-slate-900">Detail Donasi</h2>

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Nomor Resi</span>
            <span className="font-mono text-sm font-semibold text-slate-900">{receiptNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Jumlah</span>
            <span className="font-semibold text-slate-900">Rp {donationData.amount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-600">Tanggal</span>
            <span className="font-semibold text-slate-900">{new Date().toLocaleDateString("id-ID")}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Campaign</span>
            <span className="font-semibold text-slate-900 text-right max-w-xs line-clamp-2">{campaign.title}</span>
          </div>
        </div>
      </Card>

      {/* Blockchain Verification */}
      <Card className="p-6 bg-blue-50 border border-blue-200 space-y-3">
        <h3 className="font-semibold text-blue-950">Verifikasi Blockchain</h3>
        <p className="text-sm text-blue-900">
          Transaksi Anda telah dicatat di blockchain Ethereum dan dapat dipantau secara transparan.
        </p>
        <a
          href={etherscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <code className="text-xs bg-white px-2 py-1 rounded">{txHash.slice(0, 16)}...</code>
          <ExternalLink className="w-4 h-4" />
        </a>
      </Card>

      {/* Share Buttons */}
      <Button
        onClick={handleShare}
        variant="outline"
        className="w-full h-12 border-slate-200 text-slate-700 font-semibold flex items-center justify-center gap-2 bg-transparent"
      >
        <Share2 className="w-4 h-4" />
        Bagikan Kebaikan
      </Button>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onDone} className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          Kembali ke Campaign
        </Button>
        <Button
          variant="outline"
          className="h-12 border-slate-200 text-slate-700 font-semibold bg-transparent"
          onClick={() => {
            // Navigate to donation history
            window.location.href = "/riwayat-donasi"
          }}
        >
          Lihat Riwayat
        </Button>
      </div>
    </div>
  )
}
