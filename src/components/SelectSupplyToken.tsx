'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Loading } from './Loading';

const GET_ASSETS = gql`
  query GetAssets($chainId: [Int!]) {
    vaults(where: { chainId_in: $chainId }) {
      items {
        address
        symbol
        name
        creationBlockNumber
        creationTimestamp
        creatorAddress
        whitelisted
        asset {
          address
          logoURI
          name
          symbol
          decimals
        }
        state {
          id
          apy
          netApy
          totalAssets
          totalAssetsUsd
          fee
          timelock
        }
      }
    }
  }
`;

interface Asset {
  address: string;
  logoURI: string;
  name: string;
  symbol: string;
  decimals: number;
  vaults: VaultItem[];
}

interface VaultItem {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  creationBlockNumber: number;
  creationTimestamp: string;
  creatorAddress: string;
  whitelisted: boolean;
  state: {
    id: string;
    apy: number;
    netApy: number;
    totalAssets: number;
    totalAssetsUsd: number;
    fee: number;
    timelock: number;
  };
}

export default function SelectSupplyToken() {
  const [amount, setAmount] = useState('');
  const { chain } = useAccount();
  const [assets, setAssets] = useState<Asset[]>([]);

  const { data, loading } = useQuery(GET_ASSETS, {
    variables: { chainId: [chain?.id as number] },
    skip: !chain?.id
  });

  useEffect(() => {
    if (data) {
      const groupedAssets = data.vaults.items
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((acc: Asset[], item: any) => {
          const asset = item.asset;
          const existingAsset = acc.find((a) => a.address === asset.address);

          if (!existingAsset) {
            acc.push({
              address: asset.address,
              logoURI: asset.logoURI,
              name: asset.name,
              symbol: asset.symbol,
              decimals: asset.decimals,
              vaults: []
            });
          }

          if (item.state.netApy > 0 && item.whitelisted) {
            const targetAsset = acc.find((a) => a.address === asset.address);
            targetAsset?.vaults.push({
              address: item.address,
              symbol: item.symbol,
              name: item.name,
              decimals: item.decimals,
              creationBlockNumber: item.creationBlockNumber,
              creationTimestamp: item.creationTimestamp,
              creatorAddress: item.creatorAddress,
              whitelisted: item.whitelisted,
              state: {
                id: item.state.id,
                apy: item.state.apy,
                netApy: item.state.netApy,
                totalAssets: item.state.totalAssets,
                totalAssetsUsd: item.state.totalAssetsUsd,
                fee: item.state.fee,
                timelock: item.state.timelock
              }
            });
          }

          return acc;
        }, [])
        .filter((asset: Asset) => asset.vaults.length > 0);

      setAssets(groupedAssets);
    }
  }, [data]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const decimalRegex = /^\d*\.?\d*$/;
    if (decimalRegex.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-[#343a3a] w-full p-4 gap-4 rounded-xl">
      <span className="text-xl w-full text-left">Select Supply Token</span>
      <div className="relative">
        <Input value={amount} onChange={handleAmountChange} placeholder="0.0" />
        <Select>
          <SelectTrigger className="w-2/5 absolute top-0" disabled={loading}>
            {loading ? <Loading /> : <SelectValue placeholder="Select token" />}
          </SelectTrigger>
          <SelectContent>
            {assets.map((asset: Asset) => (
              <SelectItem key={asset.address} value={asset.address} className="p-2">
                <div className="flex flex-row items-center justify-between gap-4 cursor-pointer">
                  <Image src={asset.logoURI} alt={asset.name} width={24} height={24} />
                  <span className="text-base">{asset.symbol}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
