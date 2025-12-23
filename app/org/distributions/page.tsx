import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DistributionForm } from "@/components/org/distribution-form"

export default function DistributionPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Penyaluran Dana</h1>
        <p className="text-muted-foreground mt-1">Salurkan dana untuk penerima manfaat</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Form Penyaluran Dana</CardTitle>
          </CardHeader>
          <CardContent>
            <DistributionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
