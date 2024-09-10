import { ethers } from "ethers";

import { CATEGORY_CONTRACT } from "@/constants";
import { categoryabi } from "@/constants/abi/category";
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
