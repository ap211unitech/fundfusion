import { ethers } from "ethers";

import { campaignabi, FUNDFUSION_CONTRACT, fundfusionabi } from "@/constants";
import { getProvider } from "@/lib/utils";
import { Campaign, CampaignMetadata } from "@/types";

export const getAllDeployedCampaigns = async (): Promise<Campaign[]> => {
  const provider = getProvider();
  const fundfusionContract = new ethers.Contract(
    FUNDFUSION_CONTRACT,
    fundfusionabi,
    provider
  );
  const campaigns =
    (await fundfusionContract.getAllDeployedCampaigns()) as string[];

  const response = campaigns.map(async (campaignAddress) => {
    const campaignContract = new ethers.Contract(
      campaignAddress,
      campaignabi,
      provider
    );

    const totalRaisedAmount = +ethers.formatEther(
      await provider.getBalance(campaignAddress)
    );
    const fundWithdrawanByOwner =
      (await campaignContract.fundWithdrawanByOwner()) as boolean;
    const owner = (await campaignContract.owner()) as string;
    const metadata = await campaignContract.getMetadata();

    const formattedMetaData: CampaignMetadata = {
      title: metadata[0],
      category: metadata[1],
      description: metadata[2],
      image: metadata[3],
      targetAmount: +ethers.formatEther(metadata[4]),
      targetTimestamp: Number(metadata[5]),
      status: metadata[6],
    };

    return {
      address: campaignAddress,
      owner,
      fundWithdrawanByOwner,
      totalRaisedAmount,
      ...formattedMetaData,
    };
  });

  return Promise.all(response);
};
