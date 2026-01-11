"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Download, ExternalLink, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { getAllTransactionsFromBlockchain } from "@/lib/admin-blockchain"
import { getCampaigns } from "@/lib/api"
import { weiToEth } from "@/lib/blockchain"
import type { BlockchainTransaction, Campaign } from "@/lib/types"
import { toast } from "sonner"

export function TransaksiContent() {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<"all" | "donation" | "withdrawal">("all")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [txData, campaignsResponse] = await Promise.all([
        getAllTransactionsFromBlockchain(),
        getCampaigns({}, { limit: 1000 })
      ])
      
      setTransactions(txData)
      setCampaigns(campaignsResponse.data)
    } catch (error) {
      console.error('Error loading transactions:', error)
      toast.error("Gagal memuat data transaksi")
    } finally {
      setLoading(false)
    }
  }

  const getCampaignInfo = (campaignId: string) => {
    return campaigns.find(c => c.id === campaignId)
  }

  const filteredTransactions = transactions.filter((tx) => {
    const campaign = getCampaignInfo(tx.campaign_id)
    const matchesSearch =
      tx.campaign_title.toLowerCase().includes(search.toLowerCase()) ||
      campaign?.organization?.name.toLowerCase().includes(search.toLowerCase()) ||
      tx.from_address?.toLowerCase().includes(search.toLowerCase()) ||
      tx.to_address?.toLowerCase().includes(search.toLowerCase())
    
    const matchesType = filterType === "all" || 
      (filterType === "donation" && tx.from_address) ||
      (filterType === "withdrawal" && tx.to_address && tx.description)
    
    return matchesSearch && matchesType
  })

  const stats = {
    totalDonations: transactions.filter(t => t.from_address).length,
    totalWithdrawals: transactions.filter(t => t.to_address && t.description).length,
    totalVolume: transactions.reduce((sum, t) => sum + t.amount, 0),
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const exportToCSV = () => {
    const headers = ['Tanggal', 'Tipe', 'Campaign', 'Organisasi', 'Jumlah (ETH)', 'TX Hash']
    const rows = filteredTransactions.map(tx => {
      const campaign = getCampaignInfo(tx.campaign_id)
      const type = tx.from_address ? 'Donasi' : 'Penyaluran'
      return [
        formatDate(tx.timestamp),
        type,
        tx.campaign_title,
        campaign?.organization?.name || '-',
        weiToEth(BigInt(tx.amount)),
        tx.tx_hash || '-'
      ]
    })

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transaksi-chainaid-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Transaksi</h1>
        <p className="text-muted-foreground mt-1">Monitor semua transaksi donasi dan penyaluran dana dari blockchain</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Donasi</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalDonations.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Penyaluran</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalWithdrawals.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold text-foreground">{weiToEth(BigInt(stats.totalVolume))} ETH</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Riwayat Transaksi Blockchain</CardTitle>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={exportToCSV}>
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 items-center flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari campaign, organisasi, atau address..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="all">Semua Tipe</option>
              <option value="donation">Donasi</option>
              <option value="withdrawal">Penyaluran</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tanggal</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tipe</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Campaign</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Organisasi</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Jumlah (ETH)</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">From/To</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">TX Hash</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx, idx) => {
                  const campaign = getCampaignInfo(tx.campaign_id)
                  const isDonation = !!tx.from_address
                  
                  return (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-foreground">{formatDate(tx.timestamp)}</td>
                      <td className="py-3 px-4">
                        <Badge className={isDonation ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {isDonation ? "Donasi" : "Penyaluran"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground max-w-xs truncate">{tx.campaign_title}</td>
                      <td className="py-3 px-4 text-sm text-foreground">{campaign?.organization?.name || '-'}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-foreground font-mono">
                        {isDonation ? '+' : '-'}{weiToEth(BigInt(tx.amount))}
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-muted-foreground">
                        {isDonation 
                          ? `${tx.from_address?.slice(0, 6)}...${tx.from_address?.slice(-4)}`
                          : `${tx.to_address?.slice(0, 6)}...${tx.to_address?.slice(-4)}`
                        }
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {tx.tx_hash ? (
                          <a
                            href={`https://sepolia.etherscan.io/tx/${tx.tx_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline font-mono text-xs"
                          >
                            {tx.tx_hash.slice(0, 10)}...
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {transactions.length === 0 
                ? "Belum ada transaksi blockchain" 
                : "Tidak ada transaksi yang sesuai dengan filter"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
