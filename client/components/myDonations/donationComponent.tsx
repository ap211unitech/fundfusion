"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { Coins } from "lucide-react";
import { useMemo } from "react";

import { Campaign as CampaignType } from "@/types";

import { Campaign } from "./campaign";
import { NoCampaignsFound } from "./noCampaignsFound";

export const DonationComponent = ({
  allCampaigns,
}: {
  allCampaigns: CampaignType[];
}) => {
  const { address } = useAppKitAccount();

  const campaigns = useMemo(
    () =>
      allCampaigns.filter(({ contributors }) =>
        contributors.has(address as string),
      ),
    [address, allCampaigns],
  );

  if (!campaigns?.length) return <NoCampaignsFound />;

  return (
    <div className="space-y-10 py-12">
      <h1 className="flex items-center gap-2 text-2xl font-medium text-primary">
        <Coins /> Your donations
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {campaigns?.map((campaign) => {
          return <Campaign campaign={campaign} key={campaign.address} />;
        })}
      </div>
    </div>
  );
};
