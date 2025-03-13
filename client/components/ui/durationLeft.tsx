"use client";

import { AlarmClockCheck, Clock3 } from "lucide-react";
import { useMemo } from "react";

import { Campaign } from "@/types";
import { checkIfCampaignActive, durationLeft } from "@/lib/utils";

export const DurationLeft = ({ campaign }: { campaign: Campaign }) => {
  const isCampaignActive = useMemo(
    () => checkIfCampaignActive(campaign),
    [campaign],
  );

  if (isCampaignActive) {
    return (
      <p className="flex items-center gap-2">
        <Clock3 className="h-4 w-4" />
        {durationLeft(campaign.targetTimestamp)}
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2 text-destructive">
      <AlarmClockCheck className="h-4 w-4" />
      Ended
    </p>
  );
};
