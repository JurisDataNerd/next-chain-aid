import type React from "react"
import { OrgSidebar } from "@/components/org/sidebar"
import { OrgTopBar } from "@/components/org/top-bar"

export default function OrgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <OrgSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrgTopBar />
        <main className="flex-1 overflow-auto bg-muted/30">{children}</main>
      </div>
    </div>
  )
}
