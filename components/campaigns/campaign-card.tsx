import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Calendar } from "lucide-react"
import type { Campaign } from "@/lib/mock-campaigns"

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const percentage = Math.round((campaign.collected / campaign.target) * 100)

  const categoryColorMap: Record<string, string> = {
    Disaster: "bg-red-100 text-red-800",
    Pendidikan: "bg-blue-100 text-blue-800",
    Kesehatan: "bg-green-100 text-green-800",
    Lingkungan: "bg-emerald-100 text-emerald-800",
    Sosial: "bg-purple-100 text-purple-800",
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className={`${categoryColorMap[campaign.category]} border-0`}>{campaign.category}</Badge>
          {campaign.status === "Aktif" && <Badge className="bg-green-500 text-white">Aktif</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="space-y-2 mb-4 flex-1">
          <h3 className="font-bold text-lg text-blue-950 line-clamp-2">{campaign.title}</h3>
          <p className="text-sm text-slate-600">{campaign.organization}</p>
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
            <span className="text-slate-600">Rp {(campaign.collected / 1000000).toFixed(0)}M</span>
            <span className="font-semibold text-slate-900">dari Rp {(campaign.target / 1000000).toFixed(0)}M</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-slate-600 mb-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{campaign.daysRemaining} hari lagi</span>
          </div>
          <span>{campaign.donorCount.toLocaleString("id-ID")} donatur</span>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 font-semibold">
          Lihat Detail
        </Button>
      </div>
    </Card>
  )
}
