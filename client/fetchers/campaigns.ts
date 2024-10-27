import { ethers } from "ethers";

import { campaignabi, fundfusionabi } from "@/constants";
import { getProvider } from "@/lib/utils";
import { Campaign, CampaignMetadata } from "@/types";
import { CONFIG } from "@/config";

export const getAllDeployedCampaigns = async (): Promise<Campaign[]> => {
  const provider = getProvider();
  const fundfusionContract = new ethers.Contract(
    CONFIG.FUNDFUSION_CONTRACT,
    fundfusionabi,
    provider,
  );
  const campaigns =
    (await fundfusionContract.getAllDeployedCampaigns()) as string[];

  const response = campaigns.map(async (campaignAddress): Promise<Campaign> => {
    const campaignContract = new ethers.Contract(
      campaignAddress,
      campaignabi,
      provider,
    );

    const totalRaisedAmount = +ethers.formatEther(
      await provider.getBalance(campaignAddress),
    );
    const fundWithdrawanByOwner =
      (await campaignContract.fundWithdrawanByOwner()) as boolean;
    const owner = (await campaignContract.owner()) as string;

    // TODO: Recheck it
    const contributors = await campaignContract.queryFilter("FundDonated");

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
      contributors: contributors.length,
      ...formattedMetaData,
    };
  });

  return Promise.all(response);
};

export const getCampaignsForCategory = async (
  category: string,
): Promise<Campaign[]> => {
  const allDeployedCampaigns = await getAllDeployedCampaigns();
  return allDeployedCampaigns.filter((c) => c.category === category);
};

export const getCampaignData = async (
  campaignContractAddress: string,
): Promise<Campaign> => {
  try {
    const provider = getProvider();
    const campaignContract = new ethers.Contract(
      campaignContractAddress,
      campaignabi,
      provider,
    );

    const totalRaisedAmount = +ethers.formatEther(
      await provider.getBalance(campaignContractAddress),
    );
    const fundWithdrawanByOwner =
      (await campaignContract.fundWithdrawanByOwner()) as boolean;
    const owner = (await campaignContract.owner()) as string;

    // TODO: Recheck it
    const contributors = await campaignContract.queryFilter("FundDonated");

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
      address: campaignContractAddress,
      owner,
      fundWithdrawanByOwner,
      totalRaisedAmount,
      contributors: contributors.length,
      ...formattedMetaData,
    };
  } catch (_) {
    return {} as Campaign;
  }
};
