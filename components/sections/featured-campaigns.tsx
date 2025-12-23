"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const campaigns = [
  {
    id: 1,
    title: "Beasiswa Pendidikan Anak Kurang Mampu",
    organization: "Yayasan Peduli Pendidikan",
    category: "Pendidikan",
    image: "/student-learning-education.jpg",
    collected: 125000000,
    target: 250000000,
    percentage: 50,
  },
  {
    id: 2,
    title: "Program Kesehatan Desa Terpencil",
    organization: "Klinik Kasih Sayang",
    category: "Kesehatan",
    image: "/healthcare-medical-clinic.jpg",
    collected: 87500000,
    target: 150000000,
    percentage: 58,
  },
  {
    id: 3,
    title: "Rehabilitasi Lingkungan Terumbu Karang",
    organization: "Green Ocean Indonesia",
    category: "Lingkungan",
    image: "/coral-reef-ocean-marine.jpg",
    collected: 198750000,
    target: 400000000,
    percentage: 50,
  },
]

export function FeaturedCampaigns() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-950">Campaign Unggulan</h2>
          <p className="text-lg text-slate-600">Dukung campaign yang membuat perbedaan nyata di komunitas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video overflow-hidden bg-slate-200">
                <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
                <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {campaign.category}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-blue-950 line-clamp-2">{campaign.title}</h3>
                  <p className="text-sm text-slate-600">{campaign.organization}</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Terkumpul</span>
                      <span className="font-semibold text-blue-600">{campaign.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${campaign.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Rp {(campaign.collected / 1000000).toFixed(0)}M</span>
                    <span className="font-semibold text-slate-900">
                      dari Rp {(campaign.target / 1000000).toFixed(0)}M
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 font-semibold">
                  Donasi Sekarang
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
