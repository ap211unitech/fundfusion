import { ethers } from "ethers";

import { CATEGORY_CONTRACT, categoryabi } from "@/constants";
import { getProvider } from "@/lib/utils";

export const getAllCategories = async () => {
  const provider = getProvider();
  const contract = new ethers.Contract(
    CATEGORY_CONTRACT,
    categoryabi,
    provider
  );
  return (await contract.getCategories()) as string[];
};
