"use client";

import { TEST_NETWORK } from "@/constants";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, pulsechain, pulsechainV4, sepolia } from "viem/chains";
import { WagmiProvider } from "wagmi";

const config = getDefaultConfig({
  appName: "AntiGravity",
  projectId: "da0885f4ccb13b9f676544fd97528d14",
  chains: TEST_NETWORK ? [sepolia, pulsechain] : [mainnet, pulsechain],
  ssr: true,
});

const client = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const RainbowKitContext = ({ children }: Props) => {
  return (
    <WagmiProvider config={config} reconnectOnMount={false}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKitContext;
