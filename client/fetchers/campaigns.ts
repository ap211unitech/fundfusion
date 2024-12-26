import { ethers } from "ethers";

import { campaignabi, fundfusionabi } from "@/constants";
import { getIpfsUrl, getProvider } from "@/lib/utils";
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
    return await getCampaignData(campaignAddress);
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
      await campaignContract.totalRaisedAmount(),
    );

    const fundWithdrawanByOwner =
      (await campaignContract.fundWithdrawanByOwner()) as boolean;

    const owner = ((await campaignContract.owner()) as string).toLowerCase();

    const contributorEvents = await campaignContract.queryFilter("FundDonated");

    const contributors = new Map<string, number>();

    contributorEvents.forEach((c) => {
      const [donatorAddress, donatedAmount] = [
        // @ts-ignore
        c.args.at(1) as string,
        // @ts-ignore
        +ethers.formatUnits(c.args.at(2) || 0),
      ];

      if (!!donatorAddress) {
        contributors.set(
          donatorAddress.toLowerCase(),
          (contributors.get(donatorAddress) || 0) + donatedAmount,
        );
      }
    });

    const metadata = await campaignContract.getMetadata();

    const formattedMetaData: CampaignMetadata = {
      title: metadata[0],
      category: metadata[1],
      description: metadata[2],
      image: getIpfsUrl(metadata[3]),
      targetAmount: +ethers.formatEther(metadata[4]),
      targetTimestamp: Number(metadata[5]) * 1000,
      status: metadata[6],
    };

    return {
      address: campaignContractAddress,
      owner,
      fundWithdrawanByOwner,
      totalRaisedAmount,
      contributors,
      ...formattedMetaData,
    };
  } catch (_) {
    return {} as Campaign;
  }
};

export const getDeployedCampaignsForUser = async (
  address: string,
): Promise<Campaign[]> => {
  const provider = getProvider();
  const fundfusionContract = new ethers.Contract(
    CONFIG.FUNDFUSION_CONTRACT,
    fundfusionabi,
    provider,
  );
  const campaigns = (await fundfusionContract.getDeployedCampaigns(
    address,
  )) as string[];

  const response = campaigns.map(async (campaignAddress): Promise<Campaign> => {
    return await getCampaignData(campaignAddress);
  });

  return Promise.all(response);
};
