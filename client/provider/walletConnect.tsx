"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import {
  Metadata,
  ThemeMode,
  createAppKit,
  useAppKitTheme,
  useAppKitAccount,
} from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { AppKitNetwork, hardhat, sepolia } from "@reown/appkit/networks";

import { CONFIG } from "@/config";

/******************************* WalletConnect modal config *******************************/

if (!CONFIG.REOWN_PROJECT_ID) {
  throw new Error("Reown Project ID is not defined");
}
const SUPPORTED_NETWORKS: [AppKitNetwork, ...AppKitNetwork[]] =
  CONFIG.IN_PRODUCTION ? [sepolia] : [hardhat];

const metadata: Metadata = {
  name: "FundFusion",
  description: "Decentralized Crowdfunding Application",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["http://localhost:3000/favicon.ico"],
};

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: SUPPORTED_NETWORKS,
  projectId: CONFIG.REOWN_PROJECT_ID,
  features: {
    email: false,
    socials: false,
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    "--w3m-border-radius-master": "2px",
  },
});

/******************************* ************************* *******************************/

export const WalletConnectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();

  const { theme } = useTheme();
  const { address } = useAppKitAccount();
  const { setThemeMode, setThemeVariables } = useAppKitTheme();

  useEffect(() => {
    setThemeMode(theme as ThemeMode);
    setThemeVariables({
      "--w3m-color-mix-strength": theme === "light" ? 5 : 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // Refresh server components on account change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => router.refresh(), [address]);

  return <>{children}</>;
};
