"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"

const campaigns = [
  {
    id: 1,
    title: "Program Beasiswa Anak Kurang Mampu",
    image: "/diverse-students-learning.png",
    progress: 90,
    donors: 2410,
    daysLeft: 15,
    collected: "Rp 180.2M",
    target: "Rp 200M",
  },
  {
    id: 2,
    title: "Bantuan Pendidikan Desa Terpencil",
    image: "/student-learning-education.jpg",
    progress: 65,
    donors: 1250,
    daysLeft: 30,
    collected: "Rp 65.8M",
    target: "Rp 100M",
  },
  {
    id: 3,
    title: "Pelatihan Keterampilan Pemuda",
    image: "/diverse-students-learning.png",
    progress: 45,
    donors: 680,
    daysLeft: 45,
    collected: "Rp 22.5M",
    target: "Rp 50M",
  },
]

export function ActiveCampaigns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Aktif</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex flex-col gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-40">
                <Image
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-sm line-clamp-2">{campaign.title}</h3>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{campaign.progress}% Terkumpul</span>
                    <span className="text-muted-foreground">{campaign.daysLeft} hari</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Donatur</p>
                    <p className="font-semibold">{campaign.donors}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Terkumpul</p>
                    <p className="font-semibold">{campaign.collected}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-semibold">{campaign.target}</p>
                  </div>
                </div>

                <Link href={`/org/campaigns/${campaign.id}`}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Kelola
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
