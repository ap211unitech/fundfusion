import { GET_ALL_CATEGORIES_QUERY } from "@/constants";
import { executeGraphQLQuery } from "@/lib/utils";

import { Category_Response } from "./types";

// Check if an address can perform action related to Category contract
export const isCategoryAdmin = async (accountAddress: string) => {
  const data = await executeGraphQLQuery<Category_Response[]>(
    "categories",
    GET_ALL_CATEGORIES_QUERY,
  );
  return data.at(0)?.owner.toLowerCase() === accountAddress.toLowerCase();
};

// Get all categories from Category contract
export const getAllCategories = async () => {
  const data = await executeGraphQLQuery<Category_Response[]>(
    "categories",
    GET_ALL_CATEGORIES_QUERY,
  );
  return data.map(({ name }) => name);
};
