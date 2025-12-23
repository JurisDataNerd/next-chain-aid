"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Campaign } from "@/lib/mock-campaigns"
import { DonationCard } from "./donation-card"
import { ProgressUpdates } from "./progress-updates"
import { FundsDistribution } from "./funds-distribution"
import { DonorList } from "./donor-list"
import { BlockchainVerification } from "./blockchain-verification"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const categoryColorMap: Record<string, string> = {
  Disaster: "bg-red-100 text-red-800",
  Pendidikan: "bg-blue-100 text-blue-800",
  Kesehatan: "bg-green-100 text-green-800",
  Lingkungan: "bg-emerald-100 text-emerald-800",
  Sosial: "bg-purple-100 text-purple-800",
}

interface CampaignDetailContentProps {
  campaign: Campaign
}

export function CampaignDetailContent({ campaign }: CampaignDetailContentProps) {
  const percentage = Math.round((campaign.collected / campaign.target) * 100)

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/campaigns" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          <ChevronLeft className="w-4 h-4" />
          Kembali ke Campaign
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-slate-900">
        <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
          <div className="max-w-4xl">
            <Badge className={`${categoryColorMap[campaign.category]} border-0 mb-4 w-fit`}>{campaign.category}</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white text-balance mb-2">{campaign.title}</h1>
            <p className="text-lg text-slate-200">{campaign.organization}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-950 mb-4">Tentang Campaign</h2>
              <p className="text-slate-700 leading-relaxed">{campaign.fullDescription}</p>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="updates" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="updates">Update Progress</TabsTrigger>
                <TabsTrigger value="distribution">Penyaluran Dana</TabsTrigger>
                <TabsTrigger value="donors">Daftar Donatur</TabsTrigger>
              </TabsList>

              <TabsContent value="updates" className="space-y-6">
                <ProgressUpdates updates={campaign.updates} />
              </TabsContent>

              <TabsContent value="distribution" className="space-y-6">
                <FundsDistribution distributions={campaign.distributions} />
              </TabsContent>

              <TabsContent value="donors" className="space-y-6">
                <DonorList donors={campaign.donors} />
              </TabsContent>
            </Tabs>

            {/* Blockchain Verification */}
            <BlockchainVerification campaignId={campaign.id} />
          </div>

          {/* Right Column - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <DonationCard campaign={campaign} percentage={percentage} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
