import { ethers } from "ethers";

import { CONFIG } from "@/config";
import { categoryabi } from "@/constants";
import { getProvider } from "@/lib/utils";

// Check if an address can perform action related to Category contract
export const isCategoryAdmin = async (accountAddress: string) => {
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
  const provider = getProvider();
  const contract = new ethers.Contract(
    CONFIG.CATEGORY_CONTRACT,
    categoryabi,
    provider,
  );
  return (await contract.getCategories()) as string[];
};
