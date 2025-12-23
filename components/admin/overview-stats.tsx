import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, BookOpen, TrendingUp, Users } from "lucide-react"

const stats = [
  {
    title: "Total Organisasi",
    value: "248",
    icon: Building2,
    trend: "+12%",
    positive: true,
  },
  {
    title: "Total Campaign",
    value: "1,543",
    icon: BookOpen,
    trend: "+8%",
    positive: true,
  },
  {
    title: "Total Donasi",
    value: "Rp 5.2M",
    icon: TrendingUp,
    trend: "+25%",
    positive: true,
  },
  {
    title: "Total Penyaluran",
    value: "Rp 3.8M",
    icon: Users,
    trend: "+15%",
    positive: true,
  },
]

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs mt-1 ${stat.positive ? "text-green-600" : "text-red-600"}`}>
              {stat.trend} dari bulan lalu
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
