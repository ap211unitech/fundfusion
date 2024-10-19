import { ReactNode } from "react";
import { headers } from "next/headers";

import { ThemeProvider } from "./themeProvider";
import { WalletConnectProvider } from "./walletConnect";

export const Provider = ({ children }: { children: ReactNode }) => {
  const cookies = headers().get("cookie");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <WalletConnectProvider cookies={cookies}>
        {children}
      </WalletConnectProvider>
    </ThemeProvider>
  );
};
