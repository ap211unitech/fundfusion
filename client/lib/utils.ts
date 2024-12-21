import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ethers } from "ethers";
import moment from "moment";

import { CONFIG } from "@/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const daysLeft = (timestamp: number) => {
  const eventdate = moment(timestamp);
  const todaysdate = moment();
  return eventdate.diff(todaysdate, "days");
};

export const trimString = (account: string, chars: number = 8): string => {
  const keepChars = chars / 2;
  if (keepChars > account.length / 2) {
    return account;
  }
  return account.slice(0, keepChars) + "..." + account.slice(-keepChars);
};

export const getProvider = () => {
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  return provider;
};

export const getIpfsUrl = (ipfsHash: string) =>
  `https://${CONFIG.IPFS_PROVIDER.GATEWAY}/ipfs/${ipfsHash}`;
