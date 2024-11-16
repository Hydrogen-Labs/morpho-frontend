export interface Asset {
  address: `0x${string}`;
  logoURI: string;
  name: string;
  symbol: string;
  decimals: number;
  vaults: VaultItem[];
  trustedCuratorVault?: VaultItem;
  highTVLVault?: VaultItem;
  highAPY1Vault?: VaultItem;
  highAPY2Vault?: VaultItem;
}

export interface Collateral {
  market: {
    collateralAsset: Asset;
  };
  supplyAssets: number;
}

export interface VaultItem {
  id: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  creationBlockNumber: number;
  creationTimestamp: string;
  creatorAddress: string;
  whitelisted: boolean;
  network: string;
  state: {
    id: string;
    apy: number;
    netApy: number;
    totalAssets: number;
    totalAssetsUsd: number;
    fee: number;
    timelock: number;
    allocation: Collateral[];
  };
  asset?: {
    decimals: number;
    symbol: string;
    logoURI: string;
  };
  metadata?: {
    curators: {
      name: string;
      image: string;
      link: string;
    }[];
    image: string;
    description: string;
  };
  curators: {
    name: string;
    image: string;
    url: string;
  }[];
}

export interface VaultPosition {
  id: string;
  shares: number;
  assets: number;
  assetsUsd: number;
  vault: VaultItem;
}