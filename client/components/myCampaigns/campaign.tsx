"use client";

import { PartyPopper, Users } from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useMemo } from "react";
import Link from "next/link";

import {
  Alert,
  Badge,
  DurationLeft,
  ImageComponent,
  AlertDescription,
} from "@/components/ui";
import {
  checkIfOwnerCanWithdraw,
  checkIfOwnerAlreadyWithdrawnFunds,
} from "@/lib/utils";
import { Campaign as CampaignType } from "@/types";

export const Campaign = ({ campaign }: { campaign: CampaignType }) => {
  const { address: ownerAddress } = useAppKitAccount();

  const canWithdraw = useMemo(
    () => checkIfOwnerCanWithdraw(campaign, ownerAddress as string),
    [campaign, ownerAddress],
  );

  const fundsAlreadyWithdrawn = useMemo(
    () => checkIfOwnerAlreadyWithdrawnFunds(campaign, ownerAddress as string),
    [campaign, ownerAddress],
  );

  return (
    <Link
      href={`/campaign?id=${campaign.address}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 shadow-lg transition-all hover:-translate-y-2 hover:border-primary"
    >
      <div className="relative h-[280px]">
        <ImageComponent fill alt={campaign.title} src={campaign.image} />
      </div>
      <div className="space-y-3 p-4">
        <Badge className="mb-1 rounded-full font-medium">
          {campaign.category}
        </Badge>
        <h2 className="line-clamp-2 text-lg group-hover:text-primary">
          {campaign.title}
        </h2>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <DurationLeft campaign={campaign} />
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {campaign.contributors?.size || 0} contributors
          </p>
        </div>
        {canWithdraw && (
          <Alert
            variant="warning"
            className="flex items-center border-none bg-transparent p-0"
          >
            <div>
              <PartyPopper className="mr-2 h-4 w-4" />
            </div>
            <AlertDescription>
              You can withdraw the collected amount.
            </AlertDescription>
          </Alert>
        )}
        {fundsAlreadyWithdrawn && (
          <Alert
            variant="success"
            className="flex items-center border-none bg-transparent p-0"
          >
            <div>
              <PartyPopper className="mr-2 h-4 w-4" />
            </div>
            <AlertDescription>
              You&apos;ve withdrawn the collected amount.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Link>
  );
};
