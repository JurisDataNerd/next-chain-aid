"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageCircle } from "lucide-react"
import { getCampaignDonations, weiToEth, formatAddress } from "@/lib/blockchain"
import type { Donation } from "@/lib/types"

interface DonorListProps {
  campaignId: string
  contractAddress?: string | null
  blockchainDonations?: Donation[]
}

export function DonorList({ campaignId, contractAddress, blockchainDonations }: DonorListProps) {
  const [donations, setDonations] = useState<Donation[]>(blockchainDonations || [])
  const [loading, setLoading] = useState(!blockchainDonations)

  useEffect(() => {
    if (!blockchainDonations && contractAddress) {
      loadDonations()
    }
  }, [contractAddress, blockchainDonations])

  const loadDonations = async () => {
    if (!contractAddress) {
      setLoading(false)
      return
    }
    
    try {
      const data = await getCampaignDonations(contractAddress)
      setDonations(data)
    } catch (error) {
      console.error('Failed to load donations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
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

  if (donations.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">Belum ada donatur untuk campaign ini</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {donations.map((donation, idx) => (
        <Card key={idx} className="p-6 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 font-mono text-sm">
                {formatAddress(donation.donor)}
              </h3>
              <p className="text-sm text-slate-600">
                {new Date(donation.timestamp * 1000).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
            <p className="font-bold text-blue-600">{weiToEth(donation.amount)} ETH</p>
          </div>
          {donation.message && (
            <div className="flex gap-3 pt-3 border-t border-slate-200">
              <MessageCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 italic">"{donation.message}"</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
