import { PartyPopper, ShieldAlert, Users } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";

import {
  Alert,
  Badge,
  DurationLeft,
  ImageComponent,
  AlertDescription,
} from "@/components/ui";
import { Campaign as CampaignType } from "@/types";
import { checkIfUserCanGetRefund } from "@/lib/utils";

export const Campaign = ({
  campaign,
  userAddress,
}: {
  campaign: CampaignType;
  userAddress?: string;
}) => {
  const canClaimRefund = useMemo(
    () => !!userAddress && checkIfUserCanGetRefund(campaign, userAddress),
    [campaign, userAddress],
  );

  const alreadyClaimedRefund = useMemo(
    () =>
      !!userAddress &&
      !!campaign.contributors.get(userAddress)?.hasClaimedRefund,
    [campaign.contributors, userAddress],
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
        {canClaimRefund && (
          <Alert
            variant="warning"
            className="flex items-center border-none bg-transparent p-0"
          >
            <div>
              <ShieldAlert className="mr-2 h-4 w-4" />
            </div>
            <AlertDescription>You can claim your refund.</AlertDescription>
          </Alert>
        )}
        {alreadyClaimedRefund && (
          <Alert
            variant="success"
            className="flex items-center border-none bg-transparent p-0"
          >
            <div>
              <PartyPopper className="mr-2 h-4 w-4" />
            </div>
            <AlertDescription>Your refund has been credited!</AlertDescription>
          </Alert>
        )}
      </div>
    </Link>
  );
};
