"use client";

import { Loader2, Trash2 } from "lucide-react";

import { useDeleteCampaign } from "@/hooks";
import { Button } from "@/components/ui";
import { Campaign } from "@/types";

export const DeleteCampaign = ({ campaign }: { campaign: Campaign }) => {
  const { mutateAsync: onDeleteCampaign, isPending: isDeletingCampaign } =
    useDeleteCampaign();

  return (
    <Button
      variant="destructive"
      disabled={isDeletingCampaign}
      className="flex items-center gap-2"
      onClick={() => onDeleteCampaign({ campaignAddress: campaign.address })}
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
  );
};
