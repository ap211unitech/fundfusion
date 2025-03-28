"use client";

import { Search } from "lucide-react";

import { Loading } from "@/components/ui";
import { useMyCampaigns } from "@/hooks";

import { Campaign } from "./campaign";
import { NoCampaignsFound } from "./noCampaignsFound";

export const MyCampaigns = () => {
  const { data: campaigns, isPending } = useMyCampaigns();

  if (isPending) return <Loading />;

  if (!campaigns?.length) return <NoCampaignsFound />;

  return (
    <div className="space-y-10 py-12">
      <h1 className="flex items-center gap-2 text-2xl font-medium text-primary">
        <Search /> Discover your campaigns
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {campaigns?.map((campaign) => {
          return <Campaign campaign={campaign} key={campaign.address} />;
        })}
      </div>
    </div>
  );
};
