"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import { Button } from "@/components/ui";

export const ConnectWallet = () => {
  const { open } = useAppKit();
  //   const { isConnected, address } = useAppKitAccount();

  return <Button onClick={() => open()}>Connect Wallet</Button>;
};
