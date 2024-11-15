'use client';

import base from '@/assets/base.png';
import ethereum from '@/assets/ethereum.png';
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn, shortAddress } from '@/lib/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoCopyOutline, IoLogOutOutline } from 'react-icons/io5';
import { formatEther } from 'viem';
import { useAccount, useBalance, useDisconnect, useSwitchChain } from 'wagmi';

export default function Wallet() {
  const { disconnect } = useDisconnect();
  const { chain, address } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data } = useBalance({ address });
  const [selectedChain, setSelectedChain] = useState<string | undefined>(undefined);

  const { toast } = useToast();

  const handleSwitchNetwork = async () => {
    await switchChain({ chainId: chains[0].id });
  };

  useEffect(() => {
    setSelectedChain(chain?.name);
  }, [chain]);

  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal, mounted }) => {
        const isConnected = mounted && account;
        if (!isConnected) {
          return (
            <button
              onClick={openConnectModal}
              className="bg-[#1f2324] border border-[#456DB5] text-sm py-2 px-4 rounded-full whitespace-nowrap"
            >
              Connect Wallet
            </button>
          );
        }
        if (!chain) {
          return (
            <button onClick={handleSwitchNetwork} className="bg-red-500 py-2 px-4 rounded-full">
              Switch Network
            </button>
          );
        }

        return (
          <>
            {selectedChain && (
              <Select>
                <SelectTrigger className="rounded-l-full border border-[#456DB5] justify-start -mr-8 py-2">
                  <Image
                    src={selectedChain === 'Ethereum' ? ethereum : base}
                    alt={selectedChain ?? ''}
                    width={24}
                    height={24}
                  />
                </SelectTrigger>
                <SelectContent className="w-80">
                  <div className="flex flex-col w-full h-full p-2 items-start justify-between rounded-xl">
                    <div className="flex items-center justify-between w-full cursor-pointer p-2 hover:bg-[#343A3A] rounded-xl">
                      <div className="flex justify-start items-center gap-2">
                        <Image src={ethereum} alt="ethereum" width={24} height={24} />
                        <span onClick={async () => await switchChain({ chainId: 1 })}>Ethereum</span>
                      </div>
                      {selectedChain === 'Ethereum' && <Check className="h-4 w-4" />}
                    </div>
                    <div className="flex items-center justify-between w-full cursor-pointer p-2 hover:bg-[#343A3A] rounded-xl">
                      <div className="flex justify-start items-center gap-2">
                        <Image src={base} alt="base" width={24} height={24} />
                        <span onClick={async () => await switchChain({ chainId: 8453 })}>Base</span>
                      </div>
                      {selectedChain === 'Base' && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </SelectContent>
              </Select>
            )}
            <Select>
              <SelectTrigger
                className={cn(
                  'bg-[#1f2324] text-sm py-2 px-4 rounded-full flex justify-between items-center gap-2',
                  'border border-[#456DB5] z-10 hover:opacity-100'
                )}
              >
                {shortAddress(address as `0x${string}`)}
              </SelectTrigger>

              <SelectContent className="p-6 w-max flex flex-col items-end">
                <span>{formatEther(data?.value ?? 0n)} ETH</span>
                <div
                  className="grid grid-cols-4 gap-2 p-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toast({
                      title: 'Copied!'
                    });
                    navigator.clipboard.writeText(address as string);
                  }}
                >
                  <div className="flex justify-center items-center col-span-1">
                    <IoCopyOutline />
                  </div>
                  <span className="col-span-3">Copy address</span>
                </div>

                <div className="grid grid-cols-4 gap-2 p-2 cursor-pointer" onClick={() => disconnect()}>
                  <div className="flex justify-center items-center col-span-1">
                    <IoLogOutOutline />
                  </div>
                  <span className="col-span-3">Disconnect</span>
                </div>
              </SelectContent>
            </Select>
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
