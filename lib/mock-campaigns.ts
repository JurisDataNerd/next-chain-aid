// Mock campaign data for demonstration
export interface Campaign {
  id: string
  title: string
  organization: string
  category: "Disaster" | "Pendidikan" | "Kesehatan" | "Lingkungan" | "Sosial"
  image: string
  description: string
  fullDescription: string
  collected: number
  target: number
  daysRemaining: number
  donorCount: number
  status: "Aktif" | "Selesai"
  createdAt: string
  organizationBadge: string
  updates: Array<{
    date: string
    title: string
    description: string
    image: string
  }>
  distributions: Array<{
    date: string
    amount: number
    description: string
    image: string
  }>
  donors: Array<{
    name: string
    amount: number
    date: string
    message: string
  }>
}

export const campaignsData: Campaign[] = [
  {
    id: "1",
    title: "Beasiswa Pendidikan Anak Kurang Mampu",
    organization: "Yayasan Peduli Pendidikan",
    organizationBadge: "✓ Terverifikasi",
    category: "Pendidikan",
    image: "/student-learning-education.jpg",
    description: "Program beasiswa untuk anak-anak kurang mampu yang ingin melanjutkan pendidikan",
    fullDescription:
      "Yayasan Peduli Pendidikan berkomitmen memberikan kesempatan pendidikan yang sama untuk semua anak, tanpa memandang latar belakang ekonomi. Program beasiswa ini dirancang untuk membantu anak-anak berbakat dari keluarga kurang mampu agar dapat melanjutkan pendidikan ke jenjang yang lebih tinggi. Setiap kontribusi Anda akan langsung tercatat di blockchain dan dapat dipantau penggunaannya secara real-time.",
    collected: 125000000,
    target: 250000000,
    daysRemaining: 45,
    donorCount: 2847,
    status: "Aktif",
    createdAt: "2024-12-01",
    updates: [
      {
        date: "2024-12-20",
        title: "100 Anak Telah Menerima Beasiswa",
        description: "Berkat dukungan Anda, 100 anak telah menerima beasiswa penuh untuk tahun akademik 2024-2025.",
        image: "/student-learning-education.jpg",
      },
      {
        date: "2024-12-10",
        title: "Pendaftaran Beasiswa Dibuka",
        description: "Kami telah menerima 500+ aplikasi dari calon penerima beasiswa di seluruh Indonesia.",
        image: "/student-learning-education.jpg",
      },
    ],
    distributions: [
      {
        date: "2024-12-15",
        amount: 50000000,
        description: "Penyaluran ke sekolah di Jakarta untuk 50 siswa",
        image: "/student-learning-education.jpg",
      },
      {
        date: "2024-12-01",
        amount: 75000000,
        description: "Penyaluran ke sekolah di Surabaya dan Bandung",
        image: "/student-learning-education.jpg",
      },
    ],
    donors: [
      {
        name: "Anonymous",
        amount: 10000000,
        date: "2024-12-22",
        message: "Semoga anak-anak ini bisa meraih impiannya",
      },
      { name: "Budi Santoso", amount: 5000000, date: "2024-12-21", message: "Pendidikan adalah investasi terbaik" },
      { name: "Anonymous", amount: 2500000, date: "2024-12-20", message: "" },
      { name: "Siti Nurhaliza", amount: 1000000, date: "2024-12-19", message: "Terus menyemangati!" },
      { name: "Anonymous", amount: 500000, date: "2024-12-18", message: "" },
    ],
  },
  {
    id: "2",
    title: "Program Kesehatan Desa Terpencil",
    organization: "Klinik Kasih Sayang",
    organizationBadge: "✓ Terverifikasi",
    category: "Kesehatan",
    image: "/healthcare-medical-clinic.jpg",
    description: "Layanan kesehatan gratis untuk masyarakat desa terpencil di pedalaman",
    fullDescription:
      "Klinik Kasih Sayang menghadirkan program kesehatan untuk menjangkau masyarakat di daerah terpencil yang sulit mendapat akses layanan kesehatan. Program ini mencakup pemeriksaan kesehatan gratis, pengobatan, dan edukasi kesehatan. Dengan dukungan Anda, kami dapat memperluas jangkauan ke lebih banyak desa.",
    collected: 87500000,
    target: 150000000,
    daysRemaining: 60,
    donorCount: 1523,
    status: "Aktif",
    createdAt: "2024-11-15",
    updates: [
      {
        date: "2024-12-18",
        title: "Kunjungan Medis ke 5 Desa",
        description:
          "Tim medis kami telah mengunjungi 5 desa dan memberikan pemeriksaan kesehatan kepada 1500+ penduduk.",
        image: "/healthcare-medical-clinic.jpg",
      },
    ],
    distributions: [
      {
        date: "2024-12-10",
        amount: 45000000,
        description: "Pembelian peralatan medis dan obat-obatan",
        image: "/healthcare-medical-clinic.jpg",
      },
    ],
    donors: [
      { name: "Dr. Hadiyat", amount: 20000000, date: "2024-12-22", message: "Kesehatan adalah hak semua orang" },
      { name: "Anonymous", amount: 3000000, date: "2024-12-20", message: "" },
    ],
  },
  {
    id: "3",
    title: "Rehabilitasi Lingkungan Terumbu Karang",
    organization: "Green Ocean Indonesia",
    organizationBadge: "✓ Terverifikasi",
    category: "Lingkungan",
    image: "/coral-reef-ocean-marine.jpg",
    description: "Program pelestarian dan rehabilitasi terumbu karang di perairan Indonesia",
    fullDescription:
      "Terumbu karang adalah ekosistem laut yang sangat penting namun terus terancam. Green Ocean Indonesia memulai program rehabilitasi yang bertujuan untuk mengembalikan kesehatan terumbu karang dan melindungi biota laut. Setiap donasi Anda akan digunakan untuk penanaman karang, pembersihan sampah laut, dan penelitian.",
    collected: 198750000,
    target: 400000000,
    daysRemaining: 75,
    donorCount: 3456,
    status: "Aktif",
    createdAt: "2024-11-01",
    updates: [
      {
        date: "2024-12-19",
        title: "10,000 Bibit Karang Ditanam",
        description: "Milestone penting tercapai! 10,000 bibit karang telah ditanam di berbagai lokasi.",
        image: "/coral-reef-ocean-marine.jpg",
      },
    ],
    distributions: [
      {
        date: "2024-12-12",
        amount: 100000000,
        description: "Pembelian dan penanaman bibit karang berkualitas tinggi",
        image: "/coral-reef-ocean-marine.jpg",
      },
    ],
    donors: [{ name: "Anonymous", amount: 25000000, date: "2024-12-22", message: "Untuk generasi mendatang" }],
  },
  {
    id: "4",
    title: "Bantuan Pangan Korban Bencana Alam",
    organization: "Lembaga Sosial Indonesia",
    organizationBadge: "✓ Terverifikasi",
    category: "Disaster",
    image: "/student-learning-education.jpg",
    description: "Bantuan pangan untuk korban bencana alam yang membutuhkan pertolongan darurat",
    fullDescription:
      "Lembaga Sosial Indonesia siap memberikan bantuan pangan untuk masyarakat yang terkena bencana alam. Program ini fokus pada distribusi pangan berkualitas, air bersih, dan kebutuhan pokok lainnya.",
    collected: 45000000,
    target: 100000000,
    daysRemaining: 30,
    donorCount: 892,
    status: "Aktif",
    createdAt: "2024-12-15",
    updates: [],
    distributions: [],
    donors: [],
  },
  {
    id: "5",
    title: "Program Pemberdayaan Ekonomi Perempuan",
    organization: "Komunitas Wanita Mandiri",
    organizationBadge: "✓ Terverifikasi",
    category: "Sosial",
    image: "/healthcare-medical-clinic.jpg",
    description: "Pelatihan keterampilan dan modal usaha untuk pemberdayaan ekonomi perempuan",
    fullDescription:
      "Program ini memberikan pelatihan keterampilan dan modal usaha untuk memberdayakan perempuan agar mandiri secara ekonomi. Kami percaya bahwa pemberdayaan perempuan adalah kunci pembangunan berkelanjutan.",
    collected: 32500000,
    target: 75000000,
    daysRemaining: 50,
    donorCount: 654,
    status: "Aktif",
    createdAt: "2024-12-08",
    updates: [],
    distributions: [],
    donors: [],
  },
  {
    id: "6",
    title: "Pembangunan Sekolah di Daerah Terpencil",
    organization: "Yayasan Peduli Pendidikan",
    organizationBadge: "✓ Terverifikasi",
    category: "Pendidikan",
    image: "/student-learning-education.jpg",
    description: "Pembangunan sarana pendidikan di daerah terpencil yang belum memiliki sekolah layak",
    fullDescription:
      "Banyak anak di daerah terpencil yang tidak memiliki akses ke pendidikan berkualitas karena tidak adanya sarana sekolah yang layak. Yayasan Peduli Pendidikan berkomitmen membangun sekolah-sekolah di lokasi-lokasi strategis.",
    collected: 156000000,
    target: 350000000,
    daysRemaining: 90,
    donorCount: 2234,
    status: "Aktif",
    createdAt: "2024-10-20",
    updates: [],
    distributions: [],
    donors: [],
  },
]
