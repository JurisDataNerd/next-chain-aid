"use client"

const stats = [
  {
    label: "Total Donasi",
    value: "Rp 12.5M",
  },
  {
    label: "Campaign Aktif",
    value: "48",
  },
  {
    label: "Organisasi Terdaftar",
    value: "32",
  },
  {
    label: "Penerima Manfaat",
    value: "5,200+",
  },
]

export function Stats() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center sm:items-start space-y-2">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-sm sm:text-base text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
