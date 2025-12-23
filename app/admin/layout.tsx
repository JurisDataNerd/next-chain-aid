import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminTopBar } from "@/components/admin/top-bar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />
        <main className="flex-1 overflow-auto bg-muted/30">{children}</main>
      </div>
    </div>
  )
}
