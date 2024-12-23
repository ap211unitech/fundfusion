"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { Edit } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui";
import { Campaign } from "@/types";

import { DonateToCampaign } from "./donate";
import { DeleteCampaign } from "./delete";

type Props = {
  campaign: Campaign;
  isCampaignActive: boolean;
};

export const Actions = ({ campaign, isCampaignActive }: Props) => {
  const { address } = useAppKitAccount();

  const isDonatable = useMemo(
    () =>
      isCampaignActive &&
      campaign.owner.toLowerCase() !== address?.toLowerCase(),
    [address, campaign.owner, isCampaignActive],
  );

  const isEditable = useMemo(
    () =>
      campaign.owner.toLowerCase() === address?.toLowerCase() &&
      isCampaignActive,
    [address, campaign.owner, isCampaignActive],
  );

  const isDeletable = useMemo(
    () =>
      campaign.owner.toLowerCase() === address?.toLowerCase() &&
      isCampaignActive,
    [address, campaign.owner, isCampaignActive],
  );

  return (
    <div className="flex items-center gap-3">
      {isDonatable && <DonateToCampaign campaign={campaign} />}
      {isEditable && (
        <Button className="flex items-center gap-2" variant="secondary">
          <Edit className="h-4 w-4" />
          Edit Campaign
        </Button>
      )}
      {isDeletable && <DeleteCampaign campaign={campaign} />}
    </div>
  );
};
