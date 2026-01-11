"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Update {
  id: string
  title: string
  content: string
  image_url?: string
  created_at: string
}

interface ProgressUpdatesProps {
  campaignId: string
}

export function ProgressUpdates({ campaignId }: ProgressUpdatesProps) {
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUpdates()
  }, [campaignId])

  const loadUpdates = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('campaign_updates')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setUpdates(data || [])
    } catch (error) {
      console.error('Failed to load updates:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex gap-4">
              <Skeleton className="w-32 h-32 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (updates.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">Belum ada update progress untuk campaign ini</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <Card key={update.id} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-4 p-6">
            {update.image_url && (
              <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                <Image
                  src={update.image_url}
                  alt={update.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                {new Date(update.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h3 className="font-semibold text-slate-900">{update.title}</h3>
              <p className="text-slate-700 whitespace-pre-line">{update.content}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
