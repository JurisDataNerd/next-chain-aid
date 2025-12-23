export interface Transaction {
  id: string
  timestamp: string
  donorName: string
  isAnonymous: boolean
  amount: number
  campaignName: string
  campaignId: string
  txHash: string
  message?: string
}

export interface Distribution {
  id: string
  campaignName: string
  campaignLogo: string
  amount: number
  date: string
  recipientName: string
  recipientInfo: string
  description: string
  proofImages: string[]
  txHash: string
}

const getRelativeTime = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "Baru saja"
  if (minutes < 60) return `${minutes} menit yang lalu`
  if (hours < 24) return `${hours} jam yang lalu`
  if (days < 7) return `${days} hari yang lalu`
  return date.toLocaleDateString("id-ID")
}

export const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    timestamp: getRelativeTime(new Date(Date.now() - 2 * 60000)),
    donorName: "Ahmad Wijaya",
    isAnonymous: false,
    amount: 500000,
    campaignName: "Beasiswa Pendidikan Anak Kurang Mampu",
    campaignId: "1",
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    message: "Semoga ilmu yang diterima bisa membawa berkah",
  },
  {
    id: "tx-2",
    timestamp: getRelativeTime(new Date(Date.now() - 15 * 60000)),
    donorName: "",
    isAnonymous: true,
    amount: 1000000,
    campaignName: "Program Kesehatan Desa Terpencil",
    campaignId: "2",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
  },
  {
    id: "tx-3",
    timestamp: getRelativeTime(new Date(Date.now() - 45 * 60000)),
    donorName: "Siti Nurhaliza",
    isAnonymous: false,
    amount: 250000,
    campaignName: "Rehabilitasi Lingkungan Terumbu Karang",
    campaignId: "3",
    txHash: "0x9876543210fedcba9876543210fedcba98765432",
    message: "Jaga kelestarian alam kita bersama-sama",
  },
  {
    id: "tx-4",
    timestamp: getRelativeTime(new Date(Date.now() - 2 * 3600000)),
    donorName: "Budi Santoso",
    isAnonymous: false,
    amount: 750000,
    campaignName: "Beasiswa Pendidikan Anak Kurang Mampu",
    campaignId: "1",
    txHash: "0x5432109876fedcba5432109876fedcba54321098",
  },
  {
    id: "tx-5",
    timestamp: getRelativeTime(new Date(Date.now() - 5 * 3600000)),
    donorName: "",
    isAnonymous: true,
    amount: 2000000,
    campaignName: "Program Kesehatan Desa Terpencil",
    campaignId: "2",
    txHash: "0xfedcba9876543210fedcba9876543210fedcba98",
    message: "Kesehatan adalah investasi terbaik",
  },
  {
    id: "tx-6",
    timestamp: getRelativeTime(new Date(Date.now() - 1 * 86400000)),
    donorName: "Rina Putri",
    isAnonymous: false,
    amount: 300000,
    campaignName: "Rehabilitasi Lingkungan Terumbu Karang",
    campaignId: "3",
    txHash: "0x3210fedcba9876543210fedcba9876543210fedc",
  },
]

export const mockDistributions: Distribution[] = [
  {
    id: "dist-1",
    campaignName: "Beasiswa Pendidikan Anak Kurang Mampu",
    campaignLogo: "/student-learning-education.jpg",
    amount: 50000000,
    date: "2024-12-15",
    recipientName: "Sekolah Dasar Negeri 01 Desa Maju",
    recipientInfo: "Jakarta, Jawa Barat",
    description:
      "Pemberian beasiswa kepada 200 siswa berprestasi dari keluarga kurang mampu untuk tahun akademik 2024-2025",
    proofImages: ["/student-learning-education.jpg", "/healthcare-medical-clinic.jpg", "/coral-reef-ocean-marine.jpg"],
    txHash: "0xbeef1234567890abcdef1234567890abcdef1234",
  },
  {
    id: "dist-2",
    campaignName: "Program Kesehatan Desa Terpencil",
    campaignLogo: "/healthcare-medical-clinic.jpg",
    amount: 35000000,
    date: "2024-12-10",
    recipientName: "Puskesmas Desa Terpencil",
    recipientInfo: "Kalimantan, Indonesia",
    description:
      "Pengadaan alat kesehatan, obat-obatan, dan pelatihan tenaga medis lokal untuk meningkatkan akses kesehatan dasar",
    proofImages: ["/healthcare-medical-clinic.jpg", "/student-learning-education.jpg"],
    txHash: "0xcafe5678901234567890abcdef1234567890abcd",
  },
  {
    id: "dist-3",
    campaignName: "Rehabilitasi Lingkungan Terumbu Karang",
    campaignLogo: "/coral-reef-ocean-marine.jpg",
    amount: 75000000,
    date: "2024-12-05",
    recipientName: "Green Ocean Indonesia Foundation",
    recipientInfo: "Sulawesi Tenggara, Indonesia",
    description:
      "Proyek restorasi terumbu karang seluas 50 hektar, penanaman karang, dan monitoring ekosistem laut jangka panjang",
    proofImages: [
      "/coral-reef-ocean-marine.jpg",
      "/healthcare-medical-clinic.jpg",
      "/student-learning-education.jpg",
      "/coral-reef-ocean-marine.jpg",
    ],
    txHash: "0xdead9012345678901234567890abcdef12345678",
  },
]

export const transparencyStats = {
  totalDonasi: 25500000000,
  totalCampaign: 48,
  totalDistribusi: 160000000,
  blockchainTransactions: 5234,
}
