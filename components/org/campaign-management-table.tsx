"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { MoreVertical, TrendingUp, Eye, Edit, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const campaigns = [
  {
    id: 1,
    title: "Program Beasiswa Anak Kurang Mampu",
    image: "/diverse-students-learning.png",
    progress: 90,
    collected: "Rp 180.2M",
    target: "Rp 200M",
    status: "active",
  },
  {
    id: 2,
    title: "Bantuan Pendidikan Desa Terpencil",
    image: "/student-learning-education.jpg",
    progress: 65,
    collected: "Rp 65.8M",
    target: "Rp 100M",
    status: "active",
  },
  {
    id: 3,
    title: "Pelatihan Keterampilan Pemuda",
    image: "/diverse-students-learning.png",
    progress: 100,
    collected: "Rp 50M",
    target: "Rp 50M",
    status: "completed",
  },
]

const statusConfig = {
  active: { label: "Aktif", className: "bg-green-100 text-green-800" },
  completed: { label: "Selesai", className: "bg-blue-100 text-blue-800" },
  draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
}

export function CampaignManagementTable() {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Campaign</th>
              <th className="text-left py-3 px-4 font-semibold">Progress</th>
              <th className="text-left py-3 px-4 font-semibold">Terkumpul / Target</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="text-left py-3 px-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      width={40}
                      height={40}
                      className="rounded w-10 h-10 object-cover"
                    />
                    <span className="font-medium">{campaign.title}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Progress value={campaign.progress} className="w-20 h-2" />
                    <span className="text-xs font-semibold">{campaign.progress}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className="font-semibold">{campaign.collected}</div>
                    <div className="text-xs text-muted-foreground">dari {campaign.target}</div>
                  </div>
                </td>
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
                      <DropdownMenuItem asChild>
                        <Link href={`/org/campaigns/${campaign.id}`}>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          <span>Update Progress</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/org/campaigns/${campaign.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          <span>Lihat Detail</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/org/campaigns/${campaign.id}/edit`}>
                          <Edit className="w-4 h-4 mr-2" />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/org/campaigns/${campaign.id}/report`}>
                          <FileText className="w-4 h-4 mr-2" />
                          <span>Laporan</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
