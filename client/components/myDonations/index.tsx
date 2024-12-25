import { getAllDeployedCampaigns } from "@/fetchers";

import { DonationComponent } from "./donationComponent";

export const MyDonations = async () => {
  const campaigns = await getAllDeployedCampaigns();

  return <DonationComponent allCampaigns={campaigns} />;
};
