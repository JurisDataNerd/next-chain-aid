import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profil Organisasi</h1>
        <p className="text-muted-foreground mt-1">Kelola informasi organisasi Anda</p>
      </div>

      {/* Organization Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Organisasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo & Verification */}
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://api.dicebear.com/7.x/shapes/svg?seed=org" />
              <AvatarFallback>YPI</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Yayasan Pendidikan Indonesia</h3>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">Terverifikasi</Badge>
              <p className="text-sm text-muted-foreground">Organisasi yang telah diverifikasi oleh ChainAid</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nama Organisasi</label>
              <Input value="Yayasan Pendidikan Indonesia" readOnly className="mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email Admin</label>
                <Input value="ahmad@ypi.org" readOnly className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Nomor Telepon</label>
                <Input value="+62 812-3456-7890" className="mt-2" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Deskripsi Organisasi</label>
              <Textarea
                value="Yayasan Pendidikan Indonesia berkomitmen untuk meningkatkan akses pendidikan berkualitas bagi anak-anak kurang mampu di seluruh Indonesia..."
                rows={4}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Alamat</label>
                <Input value="Jl. Pendidikan No. 123, Jakarta" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Nomor Organisasi</label>
                <Input value="SK Kemenkumham No. 123/2020" readOnly className="mt-2" />
              </div>
            </div>
          </div>

          <Button>Simpan Perubahan</Button>
        </CardContent>
      </Card>

      {/* Wallet Address */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Ethereum Wallet Address</label>
            <div className="mt-2 p-3 bg-muted rounded-lg font-mono text-sm break-all">
              0x1234567890123456789012345678901234567890
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Wallet ini digunakan untuk menerima donasi dan penyaluran dana
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
