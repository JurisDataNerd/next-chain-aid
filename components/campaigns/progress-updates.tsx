import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Calendar } from "lucide-react"

interface Update {
  date: string
  title: string
  description: string
  image: string
}

interface ProgressUpdatesProps {
  updates: Update[]
}

export function ProgressUpdates({ updates }: ProgressUpdatesProps) {
  if (updates.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">Belum ada update progress untuk campaign ini</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {updates.map((update, idx) => (
        <Card key={idx} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-4 p-6">
            <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
              <Image
                src={update.image || "/placeholder.svg"}
                alt={update.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                {new Date(update.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h3 className="font-semibold text-slate-900">{update.title}</h3>
              <p className="text-slate-700">{update.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
