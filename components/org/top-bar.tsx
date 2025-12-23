"use client"

import { Bell, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function OrgTopBar() {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://api.dicebear.com/7.x/shapes/svg?seed=org" />
          <AvatarFallback>YPI</AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="font-semibold text-sm">Yayasan Pendidikan Indonesia</p>
          <p className="text-xs text-muted-foreground">Organisasi Verified</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-10">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col space-y-1">
              <span>Ahmad Yusuf</span>
              <span className="text-xs font-normal text-muted-foreground">ahmad@ypi.org</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              <span>Profil Saya</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
