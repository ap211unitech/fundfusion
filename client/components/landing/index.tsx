import { getAllDeployedCampaigns } from "@/fetchers";
import { Telescope } from "lucide-react";

import { Campaign } from "./campaign";

export const Landing = async () => {
  const campaigns = await getAllDeployedCampaigns();

  return (
    <div className="space-y-10 py-12">
      <h1 className="flex items-center gap-2 text-2xl font-medium text-primary">
        <Telescope /> Discover all active campaigns
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {campaigns.map((campaign) => {
          return <Campaign campaign={campaign} key={campaign.address} />;
        })}
      </div>
    </div>
  );
};
