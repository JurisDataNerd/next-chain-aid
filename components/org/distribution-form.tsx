"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export function DistributionForm() {
  const [campaign, setCampaign] = useState("")
  const [amount, setAmount] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [description, setDescription] = useState("")
  const [proofImages, setProofImages] = useState<string[]>([])

  const campaigns = [
    { id: 1, name: "Program Beasiswa Anak Kurang Mampu", available: "Rp 45.3M" },
    { id: 2, name: "Bantuan Pendidikan Desa Terpencil", available: "Rp 15.8M" },
    { id: 3, name: "Pelatihan Keterampilan Pemuda", available: "Rp 0" },
  ]

  const selectedCampaignData = campaigns.find((c) => c.id === Number.parseInt(campaign))

  return (
    <div className="space-y-6">
      {/* Available Balance */}
      {selectedCampaignData && (
        <Card className="bg-blue-50 border-blue-200 p-4">
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs text-blue-600">Dana Tersedia</p>
              <p className="font-semibold text-blue-800">{selectedCampaignData.available}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Pilih Campaign</label>
          <Select value={campaign} onValueChange={setCampaign}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Pilih campaign..." />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.name} • {c.available}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Jumlah yang Disalurkan (Rp)</label>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10000000"
            type="number"
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Informasi Penerima</label>
          <Input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Nama dan detail penerima..."
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Deskripsi Penyaluran</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan tujuan penyaluran dana..."
            rows={4}
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Upload Bukti Foto (Multiple)</label>
          <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-muted/50 transition">
            <div className="space-y-2">
              <p className="font-medium text-sm">Klik untuk upload bukti foto</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF (max 5MB per file)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1 bg-transparent">
          Batal
        </Button>
        <Button className="flex-1 gap-2">
          <Wallet className="w-4 h-4" />
          Salurkan Dana
        </Button>
      </div>
    </div>
  )
}
