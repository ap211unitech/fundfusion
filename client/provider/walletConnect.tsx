"use client";

import { useTheme } from "next-themes";
import { ReactNode, useEffect } from "react";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { createAppKit, ThemeMode, useAppKitTheme } from "@reown/appkit/react";
import { EthersAdapter, Metadata } from "@reown/appkit-adapter-ethers";

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
  themeVariables: {
    "--w3m-border-radius-master": "2px",
  },
});

export const WalletConnectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { theme } = useTheme();
  const { setThemeMode, setThemeVariables } = useAppKitTheme();

  useEffect(() => {
    setThemeMode(theme as ThemeMode);
    setThemeVariables({
      "--w3m-color-mix-strength": theme === "light" ? 5 : 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return <>{children}</>;
};
