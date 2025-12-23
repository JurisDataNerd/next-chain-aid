"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Fence as Freeze, Eye } from "lucide-react"
import Image from "next/image"

const campaigns = [
  {
    id: 1,
    title: "Gempa Bumi Lombok - Bantuan Darurat",
    organization: "Gerakan Disaster Relief",
    image: "/disaster-relief.jpg",
    target: "Rp 500M",
    collected: "Rp 312.5M",
    donors: 1250,
    status: "active",
  },
  {
    id: 2,
    title: "Program Beasiswa Anak Kurang Mampu",
    organization: "Yayasan Pendidikan Indonesia",
    image: "/diverse-students-learning.png",
    target: "Rp 200M",
    collected: "Rp 180.2M",
    donors: 2410,
    status: "active",
  },
  {
    id: 3,
    title: "Kesehatan Ibu dan Anak di Desa Terpencil",
    organization: "Klinik Kesehatan Masyarakat",
    image: "/healthcare-abstract.png",
    target: "Rp 100M",
    collected: "Rp 65.8M",
    donors: 892,
    status: "review",
  },
  {
    id: 4,
    title: "Penanaman Hutan Mangrove",
    organization: "Gerakan Lingkungan Hijau",
    image: "/lush-rainforest.png",
    target: "Rp 150M",
    collected: "Rp 142.3M",
    donors: 1503,
    status: "completed",
  },
]

const statusConfig = {
  active: { label: "Aktif", className: "bg-green-100 text-green-800" },
  review: { label: "Perlu Review", className: "bg-yellow-100 text-yellow-800" },
  completed: { label: "Selesai", className: "bg-blue-100 text-blue-800" },
}

export default function CampaignManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Campaign</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Campaign</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Organisasi</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Target/Terkumpul</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Donatur</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={campaign.image || "/placeholder.svg"}
                          alt={campaign.title}
                          width={40}
                          height={40}
                          className="rounded w-10 h-10 object-cover"
                        />
                        <span className="font-medium text-sm">{campaign.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{campaign.organization}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="font-semibold text-foreground">{campaign.collected}</div>
                        <div className="text-xs text-muted-foreground">dari {campaign.target}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{campaign.donors}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusConfig[campaign.status as keyof typeof statusConfig].className}>
                        {statusConfig[campaign.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            <span>Lihat Detail</span>
                          </DropdownMenuItem>
                          {campaign.status === "review" && (
                            <DropdownMenuItem className="text-destructive">
                              <Freeze className="w-4 h-4 mr-2" />
                              <span>Freeze Campaign</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
