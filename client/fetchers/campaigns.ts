import { ethers } from "ethers";

import {
  Campaign,
  Contributors,
  CampaignMetadata,
  ContributionEvent,
} from "@/types";
import {
  GET_ALL_CAMPAIGNS,
  GET_CAMPAIGN_METADATA,
  GET_USER_CAMPAIGNS,
} from "@/constants";
import { executeGraphQLQuery, getIpfsUrl } from "@/lib/utils";

import { getAllCategories } from "./categories";
import { CampaignInfo_Response } from "./types";

// Get all deployed campaigns and it's metadata
export const getAllDeployedCampaigns = async (): Promise<Campaign[]> => {
  const [campaigns, allCategories] = await Promise.all([
    await executeGraphQLQuery<CampaignInfo_Response[]>(
      "campaignInfos",
      GET_ALL_CAMPAIGNS,
    ),
    await getAllCategories(),
  ]);

  const response = campaigns.map((campaignInfo): Campaign => {
    return formatCampaignInfo(allCategories, campaignInfo);
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
    return formatCampaignInfo(allCategories, campaignInfo);
  } catch (_) {
    return {} as Campaign;
  }
};

// Get all campaigns which any user created
export const getDeployedCampaignsForUser = async (
  address: string,
): Promise<Campaign[]> => {
  const [campaigns, allCategories] = await Promise.all([
    await executeGraphQLQuery<CampaignInfo_Response[]>(
      "campaignInfos",
      GET_USER_CAMPAIGNS(address),
    ),
    await getAllCategories(),
  ]);

  const response = campaigns.map((campaignInfo): Campaign => {
    return formatCampaignInfo(allCategories, campaignInfo);
  });

  return await Promise.all(response);
};

// Convert GraphQL response to appropriate info
const formatCampaignInfo = (
  allCategories: string[],
  campaignInfo: CampaignInfo_Response,
): Campaign => {
  const allContributionEvents: ContributionEvent[] = campaignInfo.contributors
    .filter(({ hasClaimedRefund }) => !hasClaimedRefund)
    .map(({ contributor, amount, timestamp }) => {
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
          amount:
            (contributors.get(contributor)?.amount || 0) +
            (!hasClaimedRefund ? +ethers.formatUnits(amount) : 0),
          hasClaimedRefund:
            contributors.get(contributor)?.hasClaimedRefund || hasClaimedRefund,
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
    address: campaignInfo.address,
    owner: campaignInfo.owner.toLowerCase(),
    fundWithdrawanByOwner: campaignInfo.fundWithdrawanByOwner,
    totalRaisedAmount: +ethers.formatEther(campaignInfo.totalRaisedAmount),
    allContributionEvents,
    contributors,
    ...formattedMetaData,
  };
};
