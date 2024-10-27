"use client";

import {
  useAppKit,
  useAppKitAccount,
  useAppKitState,
  useWalletInfo,
} from "@reown/appkit/react";
import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  CircleHelp,
  Coins,
  Loader2,
  Logs,
  Plus,
  StickyNote,
} from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { trimAccount } from "@/lib/utils";
import { useCategoryAdmin } from "@/hooks";

export const ConnectWallet = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletInfo } = useWalletInfo();
  const { loading } = useAppKitState();
  const { open } = useAppKit();

  const { data: isCategoryAdmin } = useCategoryAdmin();

  const connecting = useMemo(() => {
    return loading;
  }, [loading]);

  if (isConnected && !!address) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <div>
                {walletInfo?.icon && walletInfo.name ? (
                  <Image
                    src={walletInfo?.icon}
                    alt={walletInfo?.name}
                    width={18}
                    height={18}
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="[&_a]:cursor-pointer">
            <DropdownMenuItem onClick={() => open()} className="cursor-pointer">
              {walletInfo?.icon && walletInfo.name ? (
                <Image
                  src={walletInfo?.icon}
                  alt={walletInfo?.name}
                  width={16}
                  height={16}
                />
              ) : (
                <CircleHelp className="h-4 w-4 stroke-primary" />
              )}
              My Wallet Info
            </DropdownMenuItem>
            {isCategoryAdmin && (
              <DropdownMenuItem asChild>
                <Link href="/manageCategories">
                  <Logs className="h-4 w-4 stroke-primary stroke-[2.5px]" />
                  Manage categories
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href="/createCampaign">
                <Plus className="h-4 w-4 stroke-primary stroke-[2.5px]" />
                Create Campaign
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/myCampaigns">
                <StickyNote className="h-4 w-4 stroke-primary stroke-[2.5px]" />
                My Campaigns
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/myDonations">
                <Coins className="h-4 w-4 stroke-primary stroke-[2.5px]" />
                My Donations
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
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
