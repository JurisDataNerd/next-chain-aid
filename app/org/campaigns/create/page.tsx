"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateCampaignForm } from "@/components/org/create-campaign-form"

export default function CreateCampaignPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Buat Campaign Baru</h1>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                s === step
                  ? "bg-primary text-primary-foreground"
                  : s < step
                    ? "bg-green-600 text-white"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className="w-12 h-1 bg-muted" />}
          </div>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Informasi Dasar"}
            {step === 2 && "Deskripsi Campaign"}
            {step === 3 && "Review Campaign"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreateCampaignForm step={step} setStep={setStep} />
        </CardContent>
      </Card>
    </div>
  )
}
