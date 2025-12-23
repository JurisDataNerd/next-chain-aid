import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full opacity-20 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-blue-950 text-balance">
            Donasi Transparan Berbasis Blockchain
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Setiap donasi tercatat dengan aman di blockchain. Lihat alur dana Anda secara real-time dan pastikan dampak
            setiap kontribusi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-full text-lg font-semibold"
          >
            Mulai Berdonasi
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-14 px-8 rounded-full text-lg font-semibold flex items-center justify-center gap-2 bg-transparent"
          >
            Lihat Campaign
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
