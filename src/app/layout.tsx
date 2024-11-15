'use client';

import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import './globals.css';

const config = getDefaultConfig({
  appName: 'morpho-frontend',
  projectId: '134f0e99f1b28f5fc5482a9ac6126a51',
  chains: [mainnet],
  ssr: true
});

const queryClient = new QueryClient();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#131719]">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Header />
              <div className="container min-h-screen min-w-[100vw]">{children}</div>
              <Toaster />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
