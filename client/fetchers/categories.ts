import { ethers } from "ethers";

import { CONFIG } from "@/config";
import { categoryabi } from "@/constants";
import { getProvider, sleep } from "@/lib/utils";

// Check if an address can perform action related to Category contract
export const isCategoryAdmin = async (accountAddress: string) => {
  if (CONFIG.IN_PRODUCTION) await sleep(1); // Cooldown period as I'm using free tier of RPC
  const provider = getProvider();
  const contract = new ethers.Contract(
    CONFIG.CATEGORY_CONTRACT,
    categoryabi,
    provider,
  );
  return (
    ((await contract.owner()) as string).toString().toLowerCase() ===
    accountAddress.toLowerCase()
  );
};

// Get all categories from Category contract
export const getAllCategories = async () => {
  if (CONFIG.IN_PRODUCTION) await sleep(1); // Cooldown period as I'm using free tier of RPC
  const provider = getProvider();
  const contract = new ethers.Contract(
    CONFIG.CATEGORY_CONTRACT,
    categoryabi,
    provider,
  );
  return (await contract.getCategories()) as string[];
};
