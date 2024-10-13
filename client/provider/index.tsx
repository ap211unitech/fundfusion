import { ReactNode } from "react";

import { ThemeProvider } from "./themeProvider";
import { WalletConnectProvider } from "./walletConnect";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <WalletConnectProvider>{children}</WalletConnectProvider>
    </ThemeProvider>
  );
};
