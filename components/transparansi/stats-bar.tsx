import { transparencyStats } from "@/lib/mock-transparency-data"

export function TransparencyStatsBar() {
  const stats = [
    {
      label: "Total Donasi",
      value: `Rp ${(transparencyStats.totalDonasi / 1000000000).toFixed(1)}M`,
    },
    {
      label: "Campaign Aktif",
      value: transparencyStats.totalCampaign.toString(),
    },
    {
      label: "Total Distribusi",
      value: `Rp ${(transparencyStats.totalDistribusi / 1000000).toFixed(0)}M`,
    },
    {
      label: "Transaksi Blockchain",
      value: transparencyStats.blockchainTransactions.toLocaleString("id-ID"),
    },
  ]

  return (
    <section className="bg-white border-y border-slate-200 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center sm:items-start space-y-2">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-sm sm:text-base text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
