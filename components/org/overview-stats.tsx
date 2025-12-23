import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Wallet, TrendingUp, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Campaign",
    value: "8",
    icon: BookOpen,
    color: "text-blue-600",
  },
  {
    title: "Total Donasi Diterima",
    value: "Rp 125.5M",
    icon: Wallet,
    color: "text-green-600",
  },
  {
    title: "Dana Tersedia",
    value: "Rp 45.3M",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Total Penyaluran",
    value: "Rp 80.2M",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export function OrgOverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
