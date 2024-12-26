import { Clock3, ShieldAlert, Users } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";

import {
  Alert,
  Badge,
  ImageComponent,
  AlertDescription,
} from "@/components/ui";
import { Campaign as CampaignType } from "@/types";
import { checkIfUserCanGetRefund, durationLeft } from "@/lib/utils";

export const Campaign = ({
  campaign,
  userAddress,
}: {
  campaign: CampaignType;
  userAddress: string;
}) => {
  const canGetRefund = useMemo(
    () => checkIfUserCanGetRefund(campaign, userAddress),
    [campaign, userAddress],
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
          <p className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {durationLeft(campaign.targetTimestamp)}
          </p>
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {campaign.contributors.size || 0} contributors
          </p>
        </div>
        {canGetRefund && (
          <Alert
            variant="warning"
            className="flex items-center border-none bg-transparent p-0"
          >
            <div>
              <ShieldAlert className="mr-2 h-4 w-4" />
            </div>
            <AlertDescription>You can get your refund.</AlertDescription>
          </Alert>
        )}
      </div>
    </Link>
  );
};
