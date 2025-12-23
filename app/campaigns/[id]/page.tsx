import { notFound } from "next/navigation"
import { campaignsData } from "@/lib/mock-campaigns"
import { CampaignDetailContent } from "@/components/campaigns/campaign-detail-content"

export function generateStaticParams() {
  return campaignsData.map((campaign) => ({
    id: campaign.id,
  }))
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = campaignsData.find((c) => c.id === params.id)

  if (!campaign) {
    notFound()
  }

  return <CampaignDetailContent campaign={campaign} />
}
