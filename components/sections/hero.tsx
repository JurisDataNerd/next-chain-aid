import { Button } from "@/components/ui/button"
import { ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full opacity-40 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full opacity-40 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Platform Donasi Blockchain Terpercaya</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-blue-900 via-blue-700 to-purple-700 bg-clip-text text-transparent text-balance leading-tight">
            Donasi Transparan Berbasis Blockchain
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Setiap donasi tercatat dengan aman di blockchain. Lihat alur dana Anda secara real-time dan pastikan dampak
            setiap kontribusi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link href="/campaigns">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 px-8 rounded-full text-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
            >
              Mulai Berdonasi
            </Button>
          </Link>
          <Link href="/campaigns">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-600/50 text-blue-700 hover:bg-blue-50/80 hover:border-blue-600 h-14 px-8 rounded-full text-lg font-semibold flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm transition-all duration-300"
            >
              Lihat Campaign
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
