"use client";

import { useMemo } from "react";
import { Edit, Heart, Trash2 } from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";

import { Campaign } from "@/types";
import { Button } from "@/components/ui";

export const Actions = ({ campaign }: { campaign: Campaign }) => {
  const { address } = useAppKitAccount();

  const isDonatable = useMemo(
    () =>
      campaign.status === "ACTIVE" &&
      campaign.targetTimestamp > new Date().getTime() / 1000,
    [campaign.status, campaign.targetTimestamp],
  );

  const isEditable = useMemo(
    () =>
      campaign.owner === address &&
      campaign.status === "ACTIVE" &&
      campaign.targetTimestamp > new Date().getTime() / 1000,
    [campaign.owner, campaign.status, campaign.targetTimestamp, address],
  );

  const isDeletable = useMemo(
    () =>
      campaign.owner === address &&
      campaign.status === "ACTIVE" &&
      campaign.targetTimestamp > new Date().getTime() / 1000,
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
        <Button className="flex items-center gap-2" variant="destructive">
          <Trash2 className="h-4 w-4" />
          Delete Campaign
        </Button>
      )}
    </div>
  );
};
