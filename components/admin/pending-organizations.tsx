import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X } from "lucide-react"

const pendingOrgs = [
  {
    id: 1,
    name: "Yayasan Pendidikan Indonesia",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=org1",
    email: "admin@ypi.org",
    registeredDate: "2024-12-20",
    walletAddress: "0x1234...5678",
  },
  {
    id: 2,
    name: "Gerakan Lingkungan Hijau",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=org2",
    email: "contact@glh.org",
    registeredDate: "2024-12-19",
    walletAddress: "0x8765...4321",
  },
  {
    id: 3,
    name: "Klinik Kesehatan Masyarakat",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=org3",
    email: "admin@kkm.org",
    registeredDate: "2024-12-18",
    walletAddress: "0x5555...6666",
  },
]

export function PendingOrganizations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organisasi Menunggu Persetujuan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingOrgs.map((org) => (
            <div
              key={org.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={org.logo || "/placeholder.svg"} />
                  <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{org.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{org.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">Wallet: {org.walletAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                  <X className="w-4 h-4 mr-1" />
                  Tolak
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <Check className="w-4 h-4 mr-1" />
                  Setujui
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
