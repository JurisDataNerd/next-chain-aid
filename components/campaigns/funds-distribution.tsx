"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "lucide-react"
import { getCampaignWithdrawals, weiToEth, formatAddress } from "@/lib/blockchain"
import type { Withdrawal } from "@/lib/types"

interface FundsDistributionProps {
  campaignId: string
  contractAddress?: string | null
}

export function FundsDistribution({ campaignId, contractAddress }: FundsDistributionProps) {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (contractAddress) {
      loadWithdrawals()
    } else {
      setLoading(false)
    }
  }, [contractAddress])

  const loadWithdrawals = async () => {
    if (!contractAddress) return
    
    try {
      const data = await getCampaignWithdrawals(contractAddress)
      setWithdrawals(data)
    } catch (error) {
      console.error('Failed to load withdrawals:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!contractAddress) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">Campaign belum terhubung ke blockchain</p>
      </Card>
    )
  }

  if (withdrawals.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">Belum ada penyaluran dana untuk campaign ini</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {withdrawals.map((withdrawal, idx) => (
        <Card key={idx} className="overflow-hidden">
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                {new Date(withdrawal.timestamp * 1000).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
              <p className="font-bold text-red-600">-{weiToEth(withdrawal.amount)} ETH</p>
            </div>
            <div>
              <p className="text-slate-700 font-medium">{withdrawal.description}</p>
              <p className="text-xs text-slate-500 mt-1">
                Penerima: {formatAddress(withdrawal.recipient)}
              </p>
            </div>
            {withdrawal.completed && (
              <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                ✓ Selesai
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
