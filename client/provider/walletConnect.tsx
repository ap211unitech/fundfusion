"use client";

import { ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter, Metadata } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";

import { CONFIG } from "@/config";

const projectId = CONFIG.REOWN_PROJECT_ID;

const metadata: Metadata = {
  name: "FundFusion",
  description: "Decentralized Crowdfunding Application",
  url: "*",
  icons: [],
};

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [mainnet, arbitrum],
  projectId,
  features: {
    email: false,
    socials: false,
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export const WalletConnectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <>{children}</>;
};
