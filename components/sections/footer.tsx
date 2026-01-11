"use client"

import { Facebook, Twitter, Instagram, Linkedin, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-slate-300 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">ChainAid</h3>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform donasi transparan berbasis blockchain untuk dampak sosial yang lebih baik. Setiap kontribusi Anda tercatat dan dapat diverifikasi.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="hover:text-blue-400 transition-colors">
                  Campaign
                </Link>
              </li>
              <li>
                <Link href="/transparansi" className="hover:text-blue-400 transition-colors">
                  Transparansi
                </Link>
              </li>
              <li>
                <Link href="/register-org" className="hover:text-blue-400 transition-colors">
                  Daftar Organisasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Sumber Daya</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Panduan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Kebijakan Cookie
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/50" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© 2025 ChainAid. Semua hak dilindungi.</p>
          <p className="flex items-center gap-2">
            Powered by{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Blockchain Ethereum
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
