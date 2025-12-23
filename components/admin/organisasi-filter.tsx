"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreVertical, Eye, Ban, Edit } from "lucide-react"

interface Organization {
  id: number
  name: string
  logo: string
  admin: string
  campaigns: number
  donations: string
  status: "approved" | "pending" | "banned"
}

interface OrganisasiFilterProps {
  organizations: Organization[]
  statusBadgeConfig: Record<string, { label: string; className: string }>
}

export function OrganisasiFilter({ organizations, statusBadgeConfig }: OrganisasiFilterProps) {
  const [search, setSearch] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const filteredOrgs = organizations.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = selectedStatus ? org.status === selectedStatus : true
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari organisasi..."
            className="pl-10 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedStatus(null)}>
            Semua
          </TabsTrigger>
          <TabsTrigger value="approved" onClick={() => setSelectedStatus("approved")}>
            Disetujui
          </TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setSelectedStatus("pending")}>
            Pending
          </TabsTrigger>
          <TabsTrigger value="banned" onClick={() => setSelectedStatus("banned")}>
            Dilarang
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus || "all"} className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Organisasi</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Admin</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Campaign</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Total Donasi</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.map((org) => (
                  <tr key={org.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={org.logo || "/placeholder.svg"} />
                          <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{org.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{org.admin}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{org.campaigns}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-foreground">{org.donations}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusBadgeConfig[org.status].className}>
                        {statusBadgeConfig[org.status].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            <span>Lihat Detail</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          {org.status !== "banned" && (
                            <DropdownMenuItem className="text-destructive">
                              <Ban className="w-4 h-4 mr-2" />
                              <span>Larang Organisasi</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
