"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, Plus, TrendingUp, History, User, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  { label: "Ringkasan", href: "/org", icon: LayoutDashboard },
  {
    label: "Campaign Saya",
    href: "/org/campaigns",
    icon: BookOpen,
  },
  { label: "Buat Campaign", href: "/org/campaigns/create", icon: Plus },
  { label: "Penyaluran Dana", href: "/org/distributions", icon: TrendingUp },
  { label: "Riwayat Transaksi", href: "/org/transactions", icon: History },
  { label: "Profil Organisasi", href: "/org/profile", icon: User },
]

export function OrgSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-card border-r border-border transition-all duration-300 flex flex-col",
          "fixed lg:relative h-screen z-40 lg:z-0",
          !isOpen && "lg:flex -translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/org" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">ChainAid Org</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
