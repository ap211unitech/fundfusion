"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

import { ThemeProvider } from "./themeProvider";
import { WalletConnectProvider } from "./walletConnect";

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <WalletConnectProvider>{children}</WalletConnectProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
