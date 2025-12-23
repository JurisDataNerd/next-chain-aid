import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Calendar } from "lucide-react"

interface Distribution {
  date: string
  amount: number
  description: string
  image: string
}

interface FundsDistributionProps {
  distributions: Distribution[]
}

export function FundsDistribution({ distributions }: FundsDistributionProps) {
  if (distributions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">Belum ada penyaluran dana untuk campaign ini</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {distributions.map((dist, idx) => (
        <Card key={idx} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-4 p-6">
            <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
              <Image
                src={dist.image || "/placeholder.svg"}
                alt={dist.description}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  {new Date(dist.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <p className="font-bold text-green-600">Rp {(dist.amount / 1000000).toFixed(0)}M</p>
              </div>
              <p className="text-slate-700">{dist.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
