"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, Heart, Building2 } from "lucide-react"
import { getPlatformStats } from "@/lib/api"
import type { PlatformStats } from "@/lib/types"

export function Stats() {
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await getPlatformStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const statsData = [
    {
      label: "Total Donasi",
      value: stats ? `Rp ${formatNumber(stats.total_raised)}` : "...",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
    },
    {
      label: "Campaign Aktif",
      value: stats?.active_campaigns.toString() || "...",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Organisasi Terdaftar",
      value: stats?.total_organizations.toString() || "...",
      icon: Building2,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Total Donatur",
      value: stats ? `${formatNumber(stats.total_donors)}+` : "...",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
  ]

  return (
    <section className="bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Dampak Nyata yang Terukur
          </h2>
          <p className="text-lg text-slate-600">
            Transparansi penuh melalui teknologi blockchain
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                </div>

                {/* Value */}
                <div className="space-y-1">
                  <p className={`text-3xl sm:text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent ${loading ? 'animate-pulse' : ''}`}>
                    {stat.value}
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
