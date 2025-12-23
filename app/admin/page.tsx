import { OverviewStats } from "@/components/admin/overview-stats"
import { PendingOrganizations } from "@/components/admin/pending-organizations"
import { DonationChart } from "@/components/admin/donation-chart"
import { CategoryChart } from "@/components/admin/category-chart"
import { ActivityTimeline } from "@/components/admin/activity-timeline"

export default function AdminOverview() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-1">Dashboard ringkasan ChainAid</p>
      </div>

      <OverviewStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PendingOrganizations />
        </div>
        <div className="space-y-6">
          <CategoryChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonationChart />
        <ActivityTimeline />
      </div>
    </div>
  )
}
