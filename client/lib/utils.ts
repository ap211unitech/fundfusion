import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ethers } from "ethers";
import moment from "moment";

import { CONFIG } from "@/config";
import { Campaign, CampaignStatus } from "@/types";

export const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trimString = (account?: string, chars: number = 8): string => {
  if (!account) return "";

  const keepChars = chars / 2;
  if (keepChars > account.length / 2) {
    return account;
  }
  return account.slice(0, keepChars) + "...." + account.slice(-keepChars);
};

export const executeGraphQLQuery = async <T>(
  key: string,
  query: string,
): Promise<T> => {
  const res = await fetch(CONFIG.GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error("GraphQL request failed!");

  return (await res.json()).data[key];
};

export const getProvider = () => {
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  return provider;
};

export const getIpfsUrl = (ipfsHash: string) =>
  `https://${CONFIG.IPFS_PROVIDER.GATEWAY}/ipfs/${ipfsHash}`;

export const getIpfsHashFromUrl = (url: string) => url.split("/ipfs/").at(1);

export const durationLeft = (endDate: number) => {
  const now = moment(new Date());
  const leftTime = moment.duration(moment(endDate).diff(now));

  if (leftTime.years() > 0) return `${leftTime.years()} years left`;
  if (leftTime.months() > 0) return `${leftTime.months()} months left`;
  if (leftTime.days() > 0) return `${leftTime.days()} days left`;
  if (leftTime.hours() > 0) return `${leftTime.hours()} hours left`;
  if (leftTime.minutes() > 0) return `${leftTime.minutes()} minutes left`;
  return `${Math.max(0, leftTime.seconds())} seconds left`;
};

export const checkIfCampaignActive = (campaign: Campaign) =>
  !campaign.fundWithdrawanByOwner &&
  campaign.status === CampaignStatus.ACTIVE &&
  campaign.targetTimestamp >= new Date().getTime();

export const checkIfUserCanGetRefund = (
  campaign: Campaign,
  userAddress: string,
) =>
  !checkIfCampaignActive(campaign) &&
  campaign.contributors.has(userAddress.toLowerCase()) &&
  campaign.totalRaisedAmount < campaign.targetAmount &&
  !campaign.contributors.get(userAddress.toLowerCase())?.hasClaimedRefund;

export const checkIfOwnerCanWithdraw = (
  campaign: Campaign,
  ownerAddress: string,
) =>
  !checkIfCampaignActive(campaign) &&
  !campaign.fundWithdrawanByOwner &&
  campaign.owner.toLowerCase() === ownerAddress.toLowerCase() &&
  campaign.totalRaisedAmount >= campaign.targetAmount;

export const checkIfOwnerAlreadyWithdrawnFunds = (
  campaign: Campaign,
  ownerAddress: string,
) =>
  !checkIfCampaignActive(campaign) &&
  campaign.owner.toLowerCase() === ownerAddress.toLowerCase() &&
  campaign.fundWithdrawanByOwner;
