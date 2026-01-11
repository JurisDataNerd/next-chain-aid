"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { ShieldCheck, User, LogOut, History, LayoutDashboard } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    const supabase = createClient()
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single()
    setProfile(data)
    setLoading(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const getDashboardLink = () => {
    if (profile?.role === "admin") return "/admin"
    if (profile?.role === "org") return "/org"
    return "/profile" // User biasa ke profile, bukan dashboard
  }

  const getDashboardLabel = () => {
    if (profile?.role === "admin") return "Dashboard Admin"
    if (profile?.role === "org") return "Dashboard Organisasi"
    return "Profil Saya" // User biasa
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="border-b border-slate-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8 mx-auto max-w-7xl">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
            <div className="relative">
              <ShieldCheck className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md group-hover:blur-lg transition-all" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">ChainAid</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 ml-10 text-sm font-medium text-slate-600">
            <Link href="/campaigns" className="hover:text-blue-600 transition-colors relative group">
              Donasi
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/transparansi" className="hover:text-blue-600 transition-colors relative group">
              Transparansi
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors relative group">
              Tentang Kami
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ConnectButton
            chainStatus="icon"
            showBalance={false}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />

          {loading ? (
            <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
          ) : user && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name || "User"} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {getInitials(profile.full_name || user.email || "U")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile.full_name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    {profile.role && (
                      <p className="text-xs leading-none text-blue-600 font-medium capitalize mt-1">
                        {profile.role === "org" ? "Organisasi" : profile.role}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getDashboardLink()} className="cursor-pointer">
                    {profile?.role === "user" ? (
                      <User className="mr-2 h-4 w-4" />
                    ) : (
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                    )}
                    <span>{getDashboardLabel()}</span>
                  </Link>
                </DropdownMenuItem>
                {(profile?.role === "admin" || profile?.role === "org") && (
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/history" className="cursor-pointer">
                    <History className="mr-2 h-4 w-4" />
                    <span>Riwayat Donasi</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="hidden sm:inline-flex hover:bg-blue-50 hover:text-blue-700">
                <Link href="/login">Masuk</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300">
                <Link href="/register">Daftar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
