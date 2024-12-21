"use client";

import { Edit, Heart, Loader2, Trash2 } from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useMemo } from "react";

import { Campaign, CampaignStatus } from "@/types";
import { useDeleteCampaign } from "@/hooks";
import { Button } from "@/components/ui";

export const Actions = ({ campaign }: { campaign: Campaign }) => {
  const { address } = useAppKitAccount();

  const { mutateAsync: onDeleteCampaign, isPending: isDeletingCampaign } =
    useDeleteCampaign();

  const isDonatable = useMemo(
    () =>
      campaign.status === CampaignStatus.ACTIVE &&
      campaign.targetTimestamp > new Date().getTime(),
    [campaign.status, campaign.targetTimestamp],
  );

  const isEditable = useMemo(
    () =>
      campaign.owner === address?.toLowerCase() &&
      campaign.status === CampaignStatus.ACTIVE &&
      campaign.targetTimestamp > new Date().getTime(),
    [campaign.owner, campaign.status, campaign.targetTimestamp, address],
  );

  const isDeletable = useMemo(
    () =>
      campaign.owner === address &&
      campaign.status === CampaignStatus.ACTIVE &&
      campaign.targetTimestamp > new Date().getTime(),
    [campaign.owner, campaign.status, campaign.targetTimestamp, address],
  );

  return (
    <div className="flex items-center gap-3">
      {isDonatable && (
        <Button className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Donate
        </Button>
      )}
      {isEditable && (
        <Button className="flex items-center gap-2" variant="secondary">
          <Edit className="h-4 w-4" />
          Edit Campaign
        </Button>
      )}
      {isDeletable && (
        <Button
          variant="destructive"
          disabled={isDeletingCampaign}
          className="flex items-center gap-2"
          onClick={() =>
            onDeleteCampaign({ campaignAddress: campaign.address })
          }
        >
          {isDeletingCampaign ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4" />
              Delete Campaign
            </>
          )}
        </Button>
      )}
    </div>
  );
};
