// ============================================================================
// ChainAid Smart Contract Integration
// ============================================================================
// Copy ABI dari Remix setelah compile
// Path di Remix: contracts/artifacts/ChainAid.json

export const CAMPAIGN_FACTORY_ABI = [
  // Paste ABI dari Remix di sini setelah compile
  // Untuk sekarang, ini adalah placeholder
  // Setelah compile di Remix, copy dari: 
  // Solidity Compiler > Compilation Details > ABI
] as const;

export const CAMPAIGN_ABI = [
  // Paste Campaign contract ABI dari Remix
] as const;

// Contract addresses (update setelah deploy)
export const CONTRACTS = {
  CAMPAIGN_FACTORY: process.env.NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS || '',
  CHAIN_ID: 11155111, // Sepolia testnet
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/',
} as const;

// Helper untuk convert wei to ETH
export function weiToEth(wei: string | bigint): string {
  const ethValue = Number(wei) / 1e18;
  return ethValue.toFixed(4);
}

// Helper untuk convert ETH to wei
export function ethToWei(eth: string | number): bigint {
  return BigInt(Math.floor(Number(eth) * 1e18));
}

// Helper untuk format address
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Helper untuk format timestamp
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
