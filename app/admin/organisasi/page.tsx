import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrganisasiFilter } from "@/components/admin/organisasi-filter"

const allOrganizations = [
  {
    id: 1,
    name: "Yayasan Pendidikan Indonesia",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=org1",
    admin: "Ahmad Yusuf",
    campaigns: 8,
    donations: "Rp 125.5M",
    status: "approved",
  },
  {
    id: 2,
    name: "Gerakan Lingkungan Hijau",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=org2",
    admin: "Siti Nurhaliza",
    campaigns: 5,
    donations: "Rp 85.2M",
    status: "approved",
  },
  {
    id: 3,
    name: "Klinik Kesehatan Masyarakat",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=org3",
    admin: "Dr. Bambang Sutrisno",
    campaigns: 12,
    donations: "Rp 250.8M",
    status: "approved",
  },
  {
    id: 4,
    name: "Rumah Harapan Anak",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=org4",
    admin: "Dewi Lestari",
    campaigns: 3,
    donations: "Rp 42.3M",
    status: "banned",
  },
]

const statusBadgeConfig = {
  approved: { label: "Disetujui", className: "bg-green-100 text-green-800" },
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
  banned: { label: "Dilarang", className: "bg-red-100 text-red-800" },
}

export default function OrganisasiPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Organisasi</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Organisasi</CardTitle>
        </CardHeader>
        <CardContent>
          <OrganisasiFilter organizations={allOrganizations} statusBadgeConfig={statusBadgeConfig} />
        </CardContent>
      </Card>
    </div>
  )
}
