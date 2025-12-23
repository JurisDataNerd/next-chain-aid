"use client"

import { useState, useMemo } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import { CampaignCard } from "@/components/campaigns/campaign-card"
import { FilterSidebar } from "@/components/campaigns/filter-sidebar"
import { campaignsData } from "@/lib/mock-campaigns"
import Link from "next/link"

const ITEMS_PER_PAGE = 6

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("terbaru")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredCampaigns = useMemo(() => {
    const filtered = campaignsData.filter((campaign) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.organization.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !selectedCategory || campaign.category === selectedCategory
      const matchesStatus = !selectedStatus || campaign.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort
    switch (sortBy) {
      case "terbaru":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "populer":
        filtered.sort((a, b) => b.donorCount - a.donorCount)
        break
      case "deadline":
        filtered.sort((a, b) => a.daysRemaining - b.daysRemaining)
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedStatus, sortBy])

  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedCampaigns = filteredCampaigns.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-950 mb-2">Jelajahi Campaign</h1>
          <p className="text-lg text-slate-600">
            Temukan campaign yang ingin Anda dukung dan lihat dampak kontribusi Anda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategory}
              onStatusChange={setSelectedStatus}
              onSortChange={setSortBy}
              isOpen={isFilterOpen}
              onToggle={setIsFilterOpen}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Cari campaign atau organisasi..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-12 h-12 bg-white border-slate-200 rounded-lg"
                />
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-slate-600">
                Menampilkan <span className="font-semibold text-slate-900">{paginatedCampaigns.length}</span> dari{" "}
                <span className="font-semibold text-slate-900">{filteredCampaigns.length}</span> campaign
              </p>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden gap-2 bg-transparent"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Campaign Grid */}
            {paginatedCampaigns.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {paginatedCampaigns.map((campaign) => (
                    <div key={campaign.id} className="relative">
                      <Link href={`/campaigns/${campaign.id}`}>
                        <CampaignCard campaign={campaign} />
                      </Link>
                      {/* CTA Button */}
                      <Link href={`/donate/${campaign.id}`} className="w-full absolute bottom-0 left-0">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 font-semibold rounded-lg">
                          Donasi Sekarang
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600 mb-4">Tidak ada campaign yang sesuai dengan pencarian Anda</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                    setSelectedStatus(null)
                  }}
                >
                  Hapus Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
