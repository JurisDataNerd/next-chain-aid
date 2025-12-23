"use client"

import { useState } from "react"
import { ExternalLink, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockTransactions } from "@/lib/mock-transparency-data"
import Link from "next/link"

export function DonationFeed() {
  const [searchCampaign, setSearchCampaign] = useState("")

  const filteredTransactions = mockTransactions.filter((tx) =>
    tx.campaignName.toLowerCase().includes(searchCampaign.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <Input
          placeholder="Cari berdasarkan campaign..."
          value={searchCampaign}
          onChange={(e) => setSearchCampaign(e.target.value)}
          className="bg-white border-slate-200"
        />
      </div>

      {/* Transaction Feed */}
      <div className="space-y-4">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {tx.isAnonymous ? (
                        <Badge variant="outline" className="bg-slate-50">
                          Anonim
                        </Badge>
                      ) : (
                        tx.donorName
                      )}
                    </p>
                    <p className="text-sm text-slate-500">{tx.timestamp}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">Rp {(tx.amount / 1000000).toFixed(1)}M</p>
              </div>

              {/* Campaign and Message */}
              <div className="space-y-3 border-t border-b border-slate-200 py-4">
                <Link href={`/campaigns/${tx.campaignId}`}>
                  <p className="text-blue-600 hover:text-blue-700 font-medium">{tx.campaignName}</p>
                </Link>

                {tx.message && (
                  <div className="bg-slate-50 border-l-4 border-blue-600 pl-4 py-3">
                    <div className="flex items-start gap-2">
                      <MessageCircle className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-700 italic">{tx.message}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Blockchain Link */}
              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-600">Hash: </p>
                <code className="text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700">
                  {tx.txHash.substring(0, 12)}...{tx.txHash.substring(-8)}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1 text-blue-600 hover:text-blue-700 h-8"
                  onClick={() => window.open(`https://sepolia.etherscan.io/tx/${tx.txHash}`, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  Verifikasi
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-600">Tidak ada transaksi yang sesuai dengan pencarian Anda</p>
        </div>
      )}
    </div>
  )
}
