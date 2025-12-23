"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink, Check } from "lucide-react"
import { mockDistributions } from "@/lib/mock-transparency-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function DistributionGrid() {
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDistributions.map((dist) => (
          <Card key={dist.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            {/* Campaign Image */}
            <div className="relative aspect-video overflow-hidden bg-slate-200">
              <Image
                src={dist.campaignLogo || "/placeholder.svg"}
                alt={dist.campaignName}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-blue-950 line-clamp-2">{dist.campaignName}</h3>
                <p className="text-sm text-slate-600">{dist.date}</p>
              </div>

              {/* Amount & Recipient */}
              <div className="space-y-3 border-y border-slate-200 py-4">
                <div>
                  <p className="text-sm text-slate-600">Jumlah Penyaluran</p>
                  <p className="text-2xl font-bold text-blue-600">Rp {(dist.amount / 1000000).toFixed(0)}M</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600">Penerima</p>
                  <p className="font-semibold text-slate-900">{dist.recipientName}</p>
                  <p className="text-sm text-slate-500">{dist.recipientInfo}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-700 leading-relaxed flex-1">{dist.description}</p>

              {/* Proof Images */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">Bukti Penyaluran ({dist.proofImages.length})</p>
                <div className="grid grid-cols-3 gap-2">
                  {dist.proofImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImages(dist.proofImages)
                        setCurrentImageIndex(idx)
                      }}
                      className="relative aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity bg-slate-200"
                    >
                      <Image src={img || "/placeholder.svg"} alt={`Bukti ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Blockchain Link */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                <Check className="w-4 h-4 text-green-600" />
                <code className="text-xs font-mono bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 flex-1 truncate">
                  {dist.txHash.substring(0, 12)}...{dist.txHash.substring(-8)}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1 text-blue-600 hover:text-blue-700 h-8"
                  onClick={() => window.open(`https://sepolia.etherscan.io/tx/${dist.txHash}`, "_blank")}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Image Lightbox */}
      {selectedImages && (
        <Dialog open={!!selectedImages} onOpenChange={() => setSelectedImages(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Bukti Penyaluran Dana</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
                <Image
                  src={selectedImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Bukti ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  {currentImageIndex + 1} dari {selectedImages.length}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                    disabled={currentImageIndex === 0}
                  >
                    Sebelumnya
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentImageIndex(Math.min(selectedImages.length - 1, currentImageIndex + 1))}
                    disabled={currentImageIndex === selectedImages.length - 1}
                  >
                    Selanjutnya
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
