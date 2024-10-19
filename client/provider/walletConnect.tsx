"use client";

import { useTheme } from "next-themes";
import { ReactNode, useEffect } from "react";
import {
  createAppKit,
  Metadata,
  ThemeMode,
  useAppKitTheme,
} from "@reown/appkit/react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CONFIG, CONNECT_WALLET_CONFIGS } from "@/config";

const metadata: Metadata = {
  name: "FundFusion",
  description: "Decentralized Crowdfunding Application",
  url: "*",
  icons: [],
};

createAppKit({
  adapters: [CONNECT_WALLET_CONFIGS.WAGMI_ADAPTER],
  metadata,
  networks: CONNECT_WALLET_CONFIGS.SUPPORTED_NETWORKS,
  projectId: CONFIG.REOWN_PROJECT_ID,
  enableInjected: false,
  features: {
    email: false,
    socials: false,
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    "--w3m-border-radius-master": "2px",
  },
});

const queryClient = new QueryClient();

export const WalletConnectProvider = ({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
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

  const initialState = cookieToInitialState(
    CONNECT_WALLET_CONFIGS.WAGMI_ADAPTER.wagmiConfig as Config,
    cookies,
  );

  return (
    <WagmiProvider
      config={CONNECT_WALLET_CONFIGS.WAGMI_ADAPTER.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
