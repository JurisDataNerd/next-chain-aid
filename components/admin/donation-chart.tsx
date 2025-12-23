"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", donasi: 2500000 },
  { month: "Feb", donasi: 3200000 },
  { month: "Mar", donasi: 2800000 },
  { month: "Apr", donasi: 4100000 },
  { month: "May", donasi: 3900000 },
  { month: "Jun", donasi: 5200000 },
]

export function DonationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donasi per Bulan</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `Rp ${(value / 1000000).toFixed(1)}M`} />
            <Line
              type="monotone"
              dataKey="donasi"
              stroke="hsl(var(--color-primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--color-primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
