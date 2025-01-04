import { ethers } from "ethers";

import {
  Campaign,
  Contributors,
  CampaignMetadata,
  ContributionEvent,
} from "@/types";
import { CONFIG } from "@/config";
import { campaignabi, fundfusionabi } from "@/constants";
import { getIpfsUrl, getProvider } from "@/lib/utils";

import { getAllCategories } from "./categories";

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

  const response = campaigns.map(async (campaignAddress): Promise<Campaign> => {
    return await getCampaignData(campaignAddress);
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
  campaignContractAddress: string,
): Promise<Campaign> => {
  try {
    const allCategories = await getAllCategories();

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

    const refundedAccounts = (
      await campaignContract.queryFilter("RefundClaimed")
    )
      // @ts-ignore
      .map((e) => e.args.at(1)?.toLowerCase());

    const allContributionEvents: ContributionEvent[] = contributorEvents.map(
      (c) => {
        const [donatorAddress, donatedAmount, timestamp] = [
          // @ts-ignore
          c.args.at(1) as string,
          // @ts-ignore
          +ethers.formatUnits(c.args.at(2) || 0),
          // @ts-ignore
          (Number(c.args.at(3)) || 0) * 1000,
        ];

        return { donatorAddress, donatedAmount, timestamp };
      },
    );

    const contributors: Contributors = new Map();

    contributorEvents.forEach((c) => {
      const [donatorAddress, donatedAmount] = [
        // @ts-ignore
        c.args.at(1) as string,
        // @ts-ignore
        +ethers.formatUnits(c.args.at(2) || 0),
      ];

      if (!!donatorAddress) {
        const key = donatorAddress.toLowerCase();

        const value = {
          amount:
            (contributors.get(donatorAddress)?.amount || 0) + donatedAmount,
          hasClaimedRefund: refundedAccounts.includes(key),
        };

        contributors.set(key, value);
      }
    });

    const metadata = await campaignContract.getMetadata();

    const formattedMetaData: CampaignMetadata = {
      title: metadata[0],
      category: allCategories.at(Number(metadata[1])) as string,
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

  const response = campaigns.map(async (campaignAddress): Promise<Campaign> => {
    return await getCampaignData(campaignAddress);
  });

  return await Promise.all(response);
};
