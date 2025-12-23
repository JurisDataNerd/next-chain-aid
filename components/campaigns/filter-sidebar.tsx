"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

const categories = ["Disaster", "Pendidikan", "Kesehatan", "Lingkungan", "Sosial"]
const statuses = ["Aktif", "Selesai"]
const sortOptions = [
  { value: "terbaru", label: "Terbaru" },
  { value: "populer", label: "Paling Populer" },
  { value: "deadline", label: "Deadline Terdekat" },
]

interface FilterSidebarProps {
  selectedCategory: string | null
  selectedStatus: string | null
  sortBy: string
  onCategoryChange: (category: string | null) => void
  onStatusChange: (status: string | null) => void
  onSortChange: (sort: string) => void
  isOpen?: boolean
  onToggle?: (open: boolean) => void
}

export function FilterSidebar({
  selectedCategory,
  selectedStatus,
  sortBy,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  isOpen = true,
  onToggle,
}: FilterSidebarProps) {
  const handleReset = () => {
    onCategoryChange(null)
    onStatusChange(null)
    onSortChange("terbaru")
  }

  const content = (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Urutkan</h3>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="bg-white border-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Kategori */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategory === category}
                onCheckedChange={(checked) => {
                  onCategoryChange(checked ? category : null)
                }}
              />
              <label htmlFor={`category-${category}`} className="text-sm text-slate-700 cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Status</h3>
        <div className="space-y-2">
          {statuses.map((status) => (
            <div key={status} className="flex items-center gap-2">
              <Checkbox
                id={`status-${status}`}
                checked={selectedStatus === status}
                onCheckedChange={(checked) => {
                  onStatusChange(checked ? status : null)
                }}
              />
              <label htmlFor={`status-${status}`} className="text-sm text-slate-700 cursor-pointer">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {(selectedCategory || selectedStatus || sortBy !== "terbaru") && (
        <Button variant="outline" className="w-full bg-transparent" onClick={handleReset}>
          Reset Filter
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Card className="p-6 sticky top-24">{content}</Card>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => onToggle?.(false)}>
            <Card className="fixed left-0 top-0 w-full max-w-sm h-full overflow-y-auto rounded-none p-6 z-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Filter</h2>
                <button onClick={() => onToggle?.(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
