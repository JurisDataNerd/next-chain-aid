import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, Wallet } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "donation",
    title: "Donasi Baru dari Anonymous",
    description: "Campaign: Gempa Lombok",
    amount: "Rp 500.000",
    timestamp: "2 jam lalu",
    icon: Wallet,
  },
  {
    id: 2,
    type: "organization",
    title: "Organisasi Baru Terdaftar",
    description: "Yayasan Pendidikan Indonesia",
    timestamp: "4 jam lalu",
    icon: Building2,
  },
  {
    id: 3,
    type: "distribution",
    title: "Penyaluran Dana",
    description: "Rp 10.000.000 untuk Flood Relief",
    timestamp: "1 hari lalu",
    icon: Users,
  },
  {
    id: 4,
    type: "campaign",
    title: "Campaign Baru Dibuat",
    description: "Bantuan Kesehatan Anak",
    timestamp: "2 hari lalu",
    icon: Users,
  },
]

export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <div key={activity.id} className="flex gap-4">
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-primary" />
                </div>
                {idx !== activities.length - 1 && <div className="w-0.5 h-16 bg-border mt-2" />}
              </div>
              <div className="pt-1 flex-1">
                <h4 className="font-semibold text-sm text-foreground">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                {activity.amount && <p className="text-sm font-semibold text-green-600 mt-1">{activity.amount}</p>}
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
