"use client"

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-950 text-slate-300 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">ChainAid</h3>
            <p className="text-sm text-slate-400">
              Platform donasi transparan berbasis blockchain untuk dampak sosial yang lebih baik.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Campaign
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Organisasi
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Sumber Daya</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Panduan
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kebijakan Cookie
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-900" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© 2025 ChainAid. Semua hak dilindungi.</p>
          <p className="flex items-center gap-2">
            Powered by <span className="text-blue-400 font-semibold">Blockchain Ethereum</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
