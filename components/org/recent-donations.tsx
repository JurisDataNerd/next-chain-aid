import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const donations = [
  {
    id: 1,
    donor: "Budi Santoso",
    amount: "Rp 500.000",
    campaign: "Program Beasiswa",
    date: "2024-12-23",
  },
  {
    id: 2,
    donor: "Anonymous",
    amount: "Rp 1.000.000",
    campaign: "Program Beasiswa",
    date: "2024-12-22",
  },
  {
    id: 3,
    donor: "Siti Nurhaliza",
    amount: "Rp 250.000",
    campaign: "Bantuan Pendidikan Desa",
    date: "2024-12-21",
  },
  {
    id: 4,
    donor: "Dr. Bambang",
    amount: "Rp 2.000.000",
    campaign: "Program Beasiswa",
    date: "2024-12-20",
  },
  {
    id: 5,
    donor: "Anonymous",
    amount: "Rp 750.000",
    campaign: "Pelatihan Keterampilan",
    date: "2024-12-19",
  },
]

export function RecentDonations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donasi Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Donatur</th>
                <th className="text-left py-3 px-4 font-semibold">Jumlah</th>
                <th className="text-left py-3 px-4 font-semibold">Campaign</th>
                <th className="text-left py-3 px-4 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4">{donation.donor}</td>
                  <td className="py-3 px-4 font-semibold text-green-600">{donation.amount}</td>
                  <td className="py-3 px-4 text-muted-foreground">{donation.campaign}</td>
                  <td className="py-3 px-4 text-muted-foreground">{donation.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
