import { Coins } from "lucide-react";

import { Loading } from "@/components/ui";

import { Campaign } from "./campaign";
import { NoCampaignsFound } from "./noCampaignsFound";

export const MyDonations = () => {
  const isPending = false;

  const campaigns = [];

  if (isPending) return <Loading />;

  if (!campaigns?.length) return <NoCampaignsFound />;

  return (
    <div className="space-y-10 py-12">
      <h1 className="flex items-center gap-2 text-2xl font-medium text-primary">
        <Coins /> Your contributions
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {campaigns?.map((campaign) => {
          return <Campaign campaign={campaign} key={campaign.address} />;
        })}
      </div>
    </div>
  );
};
