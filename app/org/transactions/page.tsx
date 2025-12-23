import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "donation",
    description: "Donasi dari Budi Santoso",
    campaign: "Program Beasiswa",
    amount: "Rp 500.000",
    status: "completed",
    date: "2024-12-23",
  },
  {
    id: 2,
    type: "distribution",
    description: "Penyaluran untuk Siswa A",
    campaign: "Program Beasiswa",
    amount: "Rp 2.000.000",
    status: "completed",
    date: "2024-12-22",
  },
  {
    id: 3,
    type: "donation",
    description: "Donasi dari Siti Nurhaliza",
    campaign: "Bantuan Pendidikan Desa",
    amount: "Rp 1.000.000",
    status: "completed",
    date: "2024-12-21",
  },
  {
    id: 4,
    type: "distribution",
    description: "Penyaluran untuk Keluarga B",
    campaign: "Bantuan Pendidikan Desa",
    amount: "Rp 3.000.000",
    status: "pending",
    date: "2024-12-20",
  },
]

export default function TransactionsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Riwayat Transaksi</h1>
        <p className="text-muted-foreground mt-1">Lihat semua transaksi donasi dan penyaluran</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Semua Transaksi</span>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Cari transaksi..." className="pl-10 text-sm" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Deskripsi</th>
                  <th className="text-left py-3 px-4 font-semibold">Campaign</th>
                  <th className="text-left py-3 px-4 font-semibold">Jumlah</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground capitalize">{tx.type}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{tx.campaign}</td>
                    <td className="py-3 px-4 font-semibold">{tx.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          tx.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {tx.status === "completed" ? "Selesai" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
