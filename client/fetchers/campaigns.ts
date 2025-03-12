import { ethers } from "ethers";

import {
  Campaign,
  Contributors,
  CampaignMetadata,
  ContributionEvent,
} from "@/types";
import { CONFIG } from "@/config";
import { fundfusionabi, GET_CAMPAIGN_METADATA } from "@/constants";
import { executeGraphQLQuery, getIpfsUrl, getProvider } from "@/lib/utils";

import { getAllCategories } from "./categories";
import { CampaignInfo_Response } from "./types";

// Get all deployed campaigns and it's metadata
export const getAllDeployedCampaigns = async (): Promise<Campaign[]> => {
  const provider = getProvider();
  const fundfusionContract = new ethers.Contract(
    CONFIG.FUNDFUSION_CONTRACT,
    fundfusionabi,
    provider,
  );
  const campaigns =
    (await fundfusionContract.getAllDeployedCampaigns()) as string[];

  const allCategories = await getAllCategories();

  const response = campaigns.map(async (campaignAddress): Promise<Campaign> => {
    return await getCampaignData(allCategories, campaignAddress);
  });

  return await Promise.all(response);
};

// Get all campaigns for a particular and it's metadata
export const getCampaignsForCategory = async (
  category: string,
): Promise<Campaign[]> => {
  const allDeployedCampaigns = await getAllDeployedCampaigns();
  return allDeployedCampaigns.filter((c) => c.category === category);
};

// Get metadata for a campaign
export const getCampaignData = async (
  allCategories: string[],
  campaignContractAddress: string,
): Promise<Campaign> => {
  try {
    const campaignInfo = await executeGraphQLQuery<CampaignInfo_Response>(
      "campaignInfo",
      GET_CAMPAIGN_METADATA(campaignContractAddress),
    );

    const allContributionEvents: ContributionEvent[] =
      campaignInfo.contributors.map(({ contributor, amount, timestamp }) => {
        return {
          donatorAddress: contributor,
          donatedAmount: +ethers.formatUnits(amount),
          timestamp: timestamp * 1000,
        };
      });

    const contributors: Contributors = new Map();

    campaignInfo.contributors.forEach(
      ({ contributor, amount, hasClaimedRefund }) => {
        if (!!contributor) {
          const key = contributor.toLowerCase();

          const value = {
            amount: (contributors.get(contributor)?.amount || 0) + amount,
            hasClaimedRefund:
              contributors.get(contributor)?.hasClaimedRefund ||
              hasClaimedRefund,
          };

          contributors.set(key, value);
        }
      },
    );

    const formattedMetaData: CampaignMetadata = {
      title: campaignInfo.title,
      category: allCategories.at(Number(campaignInfo.categoryId)) as string,
      description: campaignInfo.description,
      image: getIpfsUrl(campaignInfo.image),
      targetAmount: +ethers.formatEther(campaignInfo.targetAmount),
      targetTimestamp: Number(campaignInfo.targetTimestamp) * 1000,
      status: campaignInfo.status,
    };

    return {
      address: campaignContractAddress,
      owner: campaignInfo.owner.toLowerCase(),
      fundWithdrawanByOwner: campaignInfo.fundWithdrawanByOwner,
      totalRaisedAmount: +ethers.formatEther(campaignInfo.totalRaisedAmount),
      allContributionEvents,
      contributors,
      ...formattedMetaData,
    };
  } catch (_) {
    return {} as Campaign;
  }
};

// Get all campaigns which any user created
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

  const allCategories = await getAllCategories();

  const response = campaigns.map(async (campaignAddress): Promise<Campaign> => {
    return await getCampaignData(allCategories, campaignAddress);
  });

  return await Promise.all(response);
};
