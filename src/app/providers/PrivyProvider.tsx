'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});

const queryClient = new QueryClient();

interface PrivyProviderWrapperProps {
  children: ReactNode;
}

const PrivyProviderWrapper = ({ children }: PrivyProviderWrapperProps) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            loginMethods: ['wallet', 'email', 'farcaster'],
            appearance: {
              theme: 'light',
              accentColor: '#676FFF',
              // Customize as needed
            },
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
            },
          }}
        >
          {children}
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default PrivyProviderWrapper;