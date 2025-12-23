"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

interface CreateCampaignFormProps {
  step: number
  setStep: (step: number) => void
}

export function CreateCampaignForm({ step, setStep }: CreateCampaignFormProps) {
  const [formData, setFormData] = useState({
    title: "Program Beasiswa Anak Kurang Mampu",
    category: "pendidikan",
    target: "200000000",
    deadline: "2025-03-23",
    description: "Program beasiswa penuh untuk anak-anak kurang mampu yang berprestasi di sekolah...",
    image: "/diverse-students-learning.png",
  })

  const categories = [
    { value: "disaster", label: "Disaster" },
    { value: "pendidikan", label: "Pendidikan" },
    { value: "kesehatan", label: "Kesehatan" },
    { value: "lingkungan", label: "Lingkungan" },
    { value: "sosial", label: "Sosial" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  return (
    <div className="space-y-6">
      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Judul Campaign</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul campaign"
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Kategori</label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Target Donasi (Rp)</label>
              <Input
                name="target"
                value={formData.target}
                onChange={handleChange}
                placeholder="200000000"
                type="number"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Deadline</label>
            <Input name="deadline" value={formData.deadline} onChange={handleChange} type="date" className="mt-2" />
          </div>
        </div>
      )}

      {/* Step 2: Description */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Deskripsi Campaign</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Jelaskan secara detail tentang campaign Anda..."
              rows={6}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Upload Gambar Campaign</label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-muted/50 transition">
              <div className="space-y-2">
                <p className="font-medium text-sm">Klik untuk upload atau drag & drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF (max 5MB)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-4">
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={formData.image || "/placeholder.svg"}
                  alt={formData.title}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Judul</p>
                  <p className="font-semibold">{formData.title}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Kategori</p>
                    <p className="font-semibold capitalize">{formData.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Target Donasi</p>
                    <p className="font-semibold">Rp {Number.parseInt(formData.target).toLocaleString("id-ID")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="font-semibold">{formData.deadline}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Deskripsi</p>
                  <p className="text-sm line-clamp-3">{formData.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
            <p className="font-medium">Campaign siap dipublikasikan!</p>
            <p className="text-xs mt-1">Setelah dipublikasikan, campaign akan segera menerima donasi dari pengguna.</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
          Kembali
        </Button>

        <div className="flex gap-2">
          {step === 3 && <Button variant="outline">Simpan Draft</Button>}
          <Button
            onClick={() => {
              if (step < 3) {
                setStep(step + 1)
              }
            }}
          >
            {step === 3 ? "Publikasikan" : "Lanjut"}
          </Button>
        </div>
      </div>
    </div>
  )
}
