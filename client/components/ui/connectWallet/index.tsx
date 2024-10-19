"use client";

import {
  useAppKit,
  useAppKitAccount,
  useAppKitState,
  useWalletInfo,
} from "@reown/appkit/react";
import Image from "next/image";
import { useMemo } from "react";
import { ChevronDown, CircleHelp, Loader2 } from "lucide-react";

import { Button } from "@/components/ui";
import { trimAccount } from "@/lib/utils";

export const ConnectWallet = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletInfo } = useWalletInfo();
  const { loading } = useAppKitState();
  const { open } = useAppKit();

  const connecting = useMemo(() => {
    return loading;
  }, [loading]);

  if (isConnected && !!address) {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => open()}
      >
        <div>
          {walletInfo?.icon && walletInfo.name ? (
            <Image
              src={walletInfo?.icon}
              alt={walletInfo?.name}
              width={22}
              height={22}
            />
          ) : (
            <CircleHelp className="h-5 w-5 stroke-primary" />
          )}
        </div>
        <div className="flex items-center gap-1">
          <p>{trimAccount(address)}</p>
          <ChevronDown className="h-4 w-4" />
        </div>
      </Button>
    );
  }

  return (
    <Button onClick={() => open()} disabled={connecting}>
      {connecting ? (
        <section className="flex items-center gap-1">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p>Connecting...</p>
        </section>
      ) : (
        <section>Connect Wallet</section>
      )}
    </Button>
  );
};
