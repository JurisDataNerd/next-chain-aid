import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Calendar } from "lucide-react"
import type { Campaign } from "@/lib/types"

interface CampaignCardProps {
  campaign: Campaign & {
    collected_amount?: number
    donor_count?: number
    target_amount_eth?: number
  }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  // Calculate percentage - use ETH amount if available, otherwise use IDR
  const collected = campaign.collected_amount || 0
  const target = campaign.target_amount_eth || campaign.target_amount || 1
  const percentage = Math.min(100, Math.round((collected / target) * 100))

  // Calculate days remaining
  const daysRemaining = campaign.end_date 
    ? Math.max(0, Math.ceil((new Date(campaign.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  const categoryColorMap: Record<string, string> = {
    bencana_alam: "bg-red-100 text-red-800",
    pendidikan: "bg-blue-100 text-blue-800",
    kesehatan: "bg-green-100 text-green-800",
    lingkungan: "bg-emerald-100 text-emerald-800",
    sosial: "bg-purple-100 text-purple-800",
    ekonomi: "bg-yellow-100 text-yellow-800",
    lainnya: "bg-gray-100 text-gray-800",
  }

  const categoryLabelMap: Record<string, string> = {
    bencana_alam: "Bencana Alam",
    pendidikan: "Pendidikan",
    kesehatan: "Kesehatan",
    lingkungan: "Lingkungan",
    sosial: "Sosial",
    ekonomi: "Ekonomi",
    lainnya: "Lainnya",
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <Image 
          src={campaign.image_url || "/placeholder.svg"} 
          alt={campaign.title} 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className={`${categoryColorMap[campaign.category] || categoryColorMap.lainnya} border-0`}>
            {categoryLabelMap[campaign.category] || campaign.category}
          </Badge>
          {campaign.status === "active" && <Badge className="bg-green-500 text-white">Aktif</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="space-y-2 mb-4 flex-1">
          <h3 className="font-bold text-lg text-blue-950 line-clamp-2">{campaign.title}</h3>
          <p className="text-sm text-slate-600">{campaign.organization?.name || 'Organisasi'}</p>
        </div>

        {/* Progress */}
        <div className="space-y-3 mb-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Terkumpul</span>
              <span className="font-semibold text-blue-600">{percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
            </div>
          </div>

          <div className="flex justify-between text-sm">
            {campaign.contract_address ? (
              <>
                <span className="text-slate-600">{collected.toFixed(4)} ETH</span>
                <span className="font-semibold text-slate-900">dari {target.toFixed(4)} ETH</span>
              </>
            ) : (
              <>
                <span className="text-slate-600">{formatCurrency(collected)}</span>
                <span className="font-semibold text-slate-900">dari {formatCurrency(campaign.target_amount)}</span>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-slate-600 mb-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{daysRemaining} hari lagi</span>
          </div>
          <span>{(campaign.donor_count || 0).toLocaleString("id-ID")} donatur</span>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 font-semibold">
          Lihat Detail
        </Button>
      </div>
    </Card>
  )
}
