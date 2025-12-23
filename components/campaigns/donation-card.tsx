import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Campaign } from "@/lib/mock-campaigns"
import { Users, Calendar, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface DonationCardProps {
  campaign: Campaign
  percentage: number
}

export function DonationCard({ campaign, percentage }: DonationCardProps) {
  return (
    <Card className="p-6 space-y-6">
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-600">Terkumpul</span>
          <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${percentage}%` }} />
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-2 py-4 border-y border-slate-200">
        <div className="flex justify-between">
          <span className="text-slate-600">Terkumpul</span>
          <span className="font-semibold text-slate-900">Rp {(campaign.collected / 1000000).toFixed(0)}M</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Target</span>
          <span className="font-semibold text-slate-900">Rp {(campaign.target / 1000000).toFixed(0)}M</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">Donatur</span>
          </div>
          <p className="text-xl font-bold text-slate-900">{campaign.donorCount.toLocaleString("id-ID")}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Tersisa</span>
          </div>
          <p className="text-xl font-bold text-slate-900">{campaign.daysRemaining} hari</p>
        </div>
      </div>

      {/* CTA Button */}
      <Link href={`/donate/${campaign.id}`}>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold rounded-lg">
          Donasi Sekarang
        </Button>
      </Link>

      {/* Organization Info */}
      <Card className="p-4 bg-slate-50 space-y-3">
        <h3 className="font-semibold text-slate-900">Organisasi Pengelola</h3>
        <div className="space-y-2">
          <p className="text-slate-700 font-medium">{campaign.organization}</p>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">{campaign.organizationBadge}</span>
          </div>
        </div>
      </Card>
    </Card>
  )
}
