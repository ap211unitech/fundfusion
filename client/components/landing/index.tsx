import { Telescope } from "lucide-react";

import { checkIfCampaignActive } from "@/lib/utils";
import { getAllDeployedCampaigns } from "@/fetchers";

import { Campaign } from "./campaign";

export const Landing = async () => {
  const allDeployedCampaigns = await getAllDeployedCampaigns();

  const activecampaigns = allDeployedCampaigns.filter((campaign) =>
    checkIfCampaignActive(campaign),
  );

  const inactiveCampaigns = allDeployedCampaigns.filter(
    (campaign) => !checkIfCampaignActive(campaign),
  );

  return (
    <div className="space-y-10 py-12">
      <h1 className="flex items-center gap-2 text-2xl font-medium text-primary">
        <Telescope /> Discover all campaigns
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {activecampaigns.map((campaign) => {
          return <Campaign campaign={campaign} key={campaign.address} />;
        })}
        {inactiveCampaigns.map((campaign) => {
          return <Campaign campaign={campaign} key={campaign.address} />;
        })}
      </div>
    </div>
  );
};
