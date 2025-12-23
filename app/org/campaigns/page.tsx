import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CampaignManagementTable } from "@/components/org/campaign-management-table"

export default function OrgCampaignsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Campaign Saya</h1>
        <p className="text-muted-foreground mt-1">Kelola semua campaign organisasi Anda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignManagementTable />
        </CardContent>
      </Card>
    </div>
  )
}
