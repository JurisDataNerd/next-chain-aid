"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { getActiveCampaigns } from "@/lib/api"
import { getCampaignSummary, weiToEth } from "@/lib/blockchain"
import type { Campaign } from "@/lib/types"
import { ArrowRight, TrendingUp } from "lucide-react"

export function FeaturedCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCampaigns()
  }, [])

  const loadCampaigns = async () => {
    try {
      console.log('Fetching active campaigns...')
      const data = await getActiveCampaigns(3)
      console.log('Active campaigns fetched:', data.length, data)
      
      // Fetch blockchain data for campaigns with contract addresses
      const campaignsWithBlockchain = await Promise.all(
        data.map(async (campaign) => {
          if (campaign.contract_address) {
            try {
              console.log(`Fetching blockchain data for campaign ${campaign.id}...`)
              const summary = await getCampaignSummary(campaign.contract_address)
              console.log(`Blockchain data for ${campaign.id}:`, summary)
              return {
                ...campaign,
                collected_amount: summary.collectedAmount ? parseFloat(weiToEth(summary.collectedAmount)) : 0,
                donor_count: summary.donorCount || 0,
              }
            } catch (error) {
              console.error(`Failed to fetch blockchain data for ${campaign.id}:`, error)
              return campaign
            }
          }
          return campaign
        })
      )

      console.log('Campaigns with blockchain data:', campaignsWithBlockchain)
      setCampaigns(campaignsWithBlockchain)
    } catch (error) {
      console.error('Failed to load campaigns:', error)
      // Set empty array on error so we can show "no campaigns" message
      setCampaigns([])
    } finally {
      setLoading(false)
    }
  }

  const calculateProgress = (collected: number, target: number) => {
    if (!target || target === 0) return 0
    return Math.min((collected / target) * 100, 100)
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(1)}M`
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}Jt`
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`
    return amount.toFixed(0)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      kesehatan: "bg-rose-500",
      pendidikan: "bg-blue-500",
      bencana_alam: "bg-orange-500",
      lingkungan: "bg-green-500",
      sosial: "bg-purple-500",
      ekonomi: "bg-yellow-500",
      lainnya: "bg-slate-500",
    }
    return colors[category] || colors.lainnya
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      kesehatan: "Kesehatan",
      pendidikan: "Pendidikan",
      bencana_alam: "Bencana Alam",
      lingkungan: "Lingkungan",
      sosial: "Sosial",
      ekonomi: "Ekonomi",
      lainnya: "Lainnya",
    }
    return labels[category] || "Lainnya"
  }

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3 text-center">
            <Skeleton className="h-12 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-5 space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Campaign Pilihan</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Campaign Unggulan
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dukung campaign yang membuat perbedaan nyata di komunitas
          </p>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600">Belum ada campaign aktif saat ini</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => {
                const progress = calculateProgress(
                  campaign.collected_amount || 0,
                  campaign.target_amount
                )

                return (
                  <Card
                    key={campaign.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-200 bg-white"
                  >
                    <Link href={`/campaigns/${campaign.id}`}>
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                        {campaign.image_url ? (
                          <Image
                            src={campaign.image_url}
                            alt={campaign.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-slate-400 text-sm">No Image</span>
                          </div>
                        )}
                        <span
                          className={`absolute top-3 right-3 ${getCategoryColor(campaign.category)} text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm`}
                        >
                          {getCategoryLabel(campaign.category)}
                        </span>
                      </div>
                    </Link>

                    <div className="p-5 space-y-4">
                      <Link href={`/campaigns/${campaign.id}`}>
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {campaign.title}
                          </h3>
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <span className="font-medium">
                              {campaign.organization?.name || "Organisasi"}
                            </span>
                          </p>
                        </div>
                      </Link>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Terkumpul</span>
                            <span className="font-semibold text-blue-600">
                              {progress.toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            Rp {formatCurrency(campaign.collected_amount || 0)}
                          </span>
                          <span className="font-semibold text-slate-900">
                            dari Rp {formatCurrency(campaign.target_amount)}
                          </span>
                        </div>
                      </div>

                      <Link href={`/donate/${campaign.id}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl h-11 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                          Donasi Sekarang
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="text-center pt-6">
              <Link href="/campaigns">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600/50 text-blue-700 hover:bg-blue-50 hover:border-blue-600 px-8 rounded-full font-semibold gap-2 bg-white transition-all duration-300"
                >
                  Lihat Semua Campaign
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
