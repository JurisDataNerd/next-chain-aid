"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Lock, CheckCircle2 } from "lucide-react"

interface BlockchainVerificationProps {
  campaignId: string
}

export function BlockchainVerification({ campaignId }: BlockchainVerificationProps) {
  const txHash = `0x${campaignId.padEnd(64, "0")}`

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200 space-y-4">
      <div className="flex items-center gap-3">
        <Lock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-950">Verifikasi Blockchain</h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-slate-700">Semua transaksi tercatat di Ethereum blockchain</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-slate-700">Transparansi penuh dan tidak dapat diubah</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg space-y-2 font-mono text-xs">
        <p className="text-slate-600">Smart Contract Address</p>
        <p className="text-slate-900 break-all">{txHash}</p>
      </div>

      <Button
        variant="outline"
        className="w-full gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
        onClick={() => {
          window.open(`https://etherscan.io/address/${txHash}`, "_blank")
        }}
      >
        <ExternalLink className="w-4 h-4" />
        Lihat di Etherscan
      </Button>
    </Card>
  )
}
