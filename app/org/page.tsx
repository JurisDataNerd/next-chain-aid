import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OrgOverviewStats } from "@/components/org/overview-stats"
import { ActiveCampaigns } from "@/components/org/active-campaigns"
import { RecentDonations } from "@/components/org/recent-donations"
import { Plus, TrendingUp, Wallet } from "lucide-react"
import Link from "next/link"

export default function OrgOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-foreground">Selamat datang, Ahmad Yusuf</h1>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
            Terverifikasi
          </Badge>
        </div>
        <p className="text-muted-foreground">Kelola campaign dan donasi untuk organisasi Anda</p>
      </div>

      {/* Stats */}
      <OrgOverviewStats />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/org/campaigns/create">
          <Button className="w-full h-auto py-4 flex flex-col items-center gap-2" size="lg">
            <Plus className="w-5 h-5" />
            <span>Buat Campaign Baru</span>
          </Button>
        </Link>
        <Link href="/org/distributions">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
            size="lg"
          >
            <Wallet className="w-5 h-5" />
            <span>Salurkan Dana</span>
          </Button>
        </Link>
        <Button
          variant="outline"
          className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
          size="lg"
        >
          <TrendingUp className="w-5 h-5" />
          <span>Update Progress</span>
        </Button>
      </div>

      {/* Active Campaigns */}
      <ActiveCampaigns />

      {/* Recent Donations */}
      <RecentDonations />
    </div>
  )
}
