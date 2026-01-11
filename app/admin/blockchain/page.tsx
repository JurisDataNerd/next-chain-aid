"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Zap, Shield, LinkIcon, ExternalLink, Activity, TrendingUp, Wallet } from "lucide-react"
import { getBlockchainStats, getAllTransactionsFromBlockchain } from "@/lib/admin-blockchain"
import { weiToEth } from "@/lib/blockchain"
import { CONTRACTS } from "@/lib/blockchain"
import type { BlockchainTransaction } from "@/lib/types"
import { toast } from "sonner"

export default function BlockchainPage() {
  const [stats, setStats] = useState<any>(null)
  const [recentTx, setRecentTx] = useState<BlockchainTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [networkStatus, setNetworkStatus] = useState<"connected" | "disconnected">("disconnected")

  useEffect(() => {
    loadData()
    checkNetwork()
  }, [])

  const checkNetwork = async () => {
    try {
      // Simple network check
      const response = await fetch(CONTRACTS.RPC_URLS[0])
      setNetworkStatus(response.ok ? "connected" : "disconnected")
    } catch {
      setNetworkStatus("disconnected")
    }
  }

  const loadData = async () => {
    try {
      const [blockchainStats, transactions] = await Promise.all([
        getBlockchainStats(),
        getAllTransactionsFromBlockchain()
      ])
      
      setStats(blockchainStats)
      // Get 10 most recent transactions
      setRecentTx(transactions.slice(0, 10))
    } catch (error) {
      console.error('Error loading blockchain data:', error)
      toast.error("Gagal memuat data blockchain")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Blockchain Explorer</h1>
        <p className="text-muted-foreground mt-1">Verifikasi dan monitor transaksi blockchain ChainAid</p>
      </div>

      {/* Network Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${networkStatus === 'connected' ? 'bg-green-100' : 'bg-red-100'}`}>
                <Zap className={`w-5 h-5 ${networkStatus === 'connected' ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jaringan</p>
                <p className="font-semibold text-foreground">Ethereum Sepolia</p>
                <Badge className={`mt-1 ${networkStatus === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {networkStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </Badge>
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
                <p className="text-sm text-muted-foreground">Total Campaigns</p>
                <p className="text-2xl font-bold text-foreground">{stats?.totalCampaigns || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="mt-1 bg-green-100 text-green-800">Aktif & Terverifikasi</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Statistik Blockchain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-medium text-foreground">Total Transaksi</label>
              <p className="text-2xl font-bold text-primary mt-1">{stats?.totalTransactions?.toLocaleString('id-ID') || 0}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Total Donasi</label>
              <p className="text-2xl font-bold text-primary mt-1">{stats?.totalDonations?.toLocaleString('id-ID') || 0}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Total Volume (ETH)</label>
              <p className="text-2xl font-bold text-primary mt-1 font-mono">{stats?.totalAmount || '0'} ETH</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Total Donors</label>
              <p className="text-2xl font-bold text-primary mt-1">{stats?.totalDonors?.toLocaleString('id-ID') || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factory Contract Info */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Factory Contract</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Contract Address</p>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <code className="text-xs font-mono flex-1 break-all">
                  {CONTRACTS.CAMPAIGN_FACTORY || 'Not configured'}
                </code>
                {CONTRACTS.CAMPAIGN_FACTORY && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1 bg-transparent shrink-0"
                    onClick={() => window.open(`https://sepolia.etherscan.io/address/${CONTRACTS.CAMPAIGN_FACTORY}`, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3" />
                    Etherscan
                  </Button>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">RPC Endpoints</p>
              <div className="space-y-2">
                {CONTRACTS.RPC_URLS.map((url, idx) => (
                  <div key={idx} className="p-2 bg-muted/30 rounded text-xs font-mono break-all">
                    {url}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Transaksi Terbaru
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/admin/transaksi'}
            >
              Lihat Semua
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentTx.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada transaksi blockchain
            </div>
          ) : (
            <div className="space-y-3">
              {recentTx.map((tx, idx) => {
                const isDonation = !!tx.from_address
                return (
                  <div key={idx} className={`p-4 border rounded-lg ${isDonation ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${isDonation ? 'bg-green-600' : 'bg-red-600'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={isDonation ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {isDonation ? "Donasi" : "Penyaluran"}
                          </Badge>
                          <span className="font-semibold text-sm text-foreground font-mono">
                            {isDonation ? '+' : '-'}{weiToEth(BigInt(tx.amount))} ETH
                          </span>
                        </div>
                        <p className="text-sm text-foreground mt-1 truncate">{tx.campaign_title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(tx.timestamp)} • {isDonation ? 'From' : 'To'}: {(isDonation ? tx.from_address : tx.to_address)?.slice(0, 10)}...
                        </p>
                        {tx.tx_hash && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2 gap-1 h-7 text-xs bg-transparent"
                            onClick={() => window.open(`https://sepolia.etherscan.io/tx/${tx.tx_hash}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                            Lihat di Etherscan
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contract Functions Info */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Functions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-mono text-xs text-foreground">function donate(string memory message) payable public</p>
              <p className="text-muted-foreground text-xs mt-1">Melakukan donasi untuk campaign dengan pesan opsional</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-mono text-xs text-foreground">function withdraw(uint256 amount, string memory description) public</p>
              <p className="text-muted-foreground text-xs mt-1">Menyalurkan dana kepada penerima (hanya organization owner)</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-mono text-xs text-foreground">function getSummary() view public returns (...)</p>
              <p className="text-muted-foreground text-xs mt-1">Mendapatkan ringkasan campaign termasuk balance dan status</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-mono text-xs text-foreground">function getAllDonations() view public returns (Donation[])</p>
              <p className="text-muted-foreground text-xs mt-1">Mendapatkan semua riwayat donasi untuk transparansi penuh</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
