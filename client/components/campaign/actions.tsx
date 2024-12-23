"use client";

import { Edit, Heart, Loader2, Trash2 } from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useMemo } from "react";

import { useDeleteCampaign } from "@/hooks";
import { Button } from "@/components/ui";
import { Campaign } from "@/types";

type Props = {
  campaign: Campaign;
  isCampaignActive: boolean;
};

export const Actions = ({ campaign, isCampaignActive }: Props) => {
  const { address } = useAppKitAccount();

  const { mutateAsync: onDeleteCampaign, isPending: isDeletingCampaign } =
    useDeleteCampaign();

  const isDonatable = useMemo(() => isCampaignActive, [isCampaignActive]);

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
