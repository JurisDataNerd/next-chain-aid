import { Card } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

interface Donor {
  name: string
  amount: number
  date: string
  message: string
}

interface DonorListProps {
  donors: Donor[]
}

export function DonorList({ donors }: DonorListProps) {
  if (donors.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">Belum ada donatur untuk campaign ini</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {donors.map((donor, idx) => (
        <Card key={idx} className="p-6 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">{donor.name}</h3>
              <p className="text-sm text-slate-600">
                {new Date(donor.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <p className="font-bold text-blue-600">Rp {(donor.amount / 1000000).toFixed(1)}M</p>
          </div>
          {donor.message && (
            <div className="flex gap-3 pt-3 border-t border-slate-200">
              <MessageCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 italic">"{donor.message}"</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
