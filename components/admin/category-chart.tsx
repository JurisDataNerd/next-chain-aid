"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Disaster", value: 35, color: "hsl(var(--color-chart-1))" },
  { name: "Pendidikan", value: 25, color: "hsl(var(--color-chart-2))" },
  { name: "Kesehatan", value: 20, color: "hsl(var(--color-chart-3))" },
  { name: "Lingkungan", value: 12, color: "hsl(var(--color-chart-4))" },
  { name: "Sosial", value: 8, color: "hsl(var(--color-chart-5))" },
]

export function CategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign per Kategori</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
