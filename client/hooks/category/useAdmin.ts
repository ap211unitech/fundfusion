import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";

import { CATEGORY_QUERY_KEYS } from "@/constants";
import { isCategoryAdmin } from "@/fetchers";

export const useCategoryAdmin = () => {
  const { address } = useAppKitAccount();

  return useQuery({
    queryKey: CATEGORY_QUERY_KEYS.checkAdmin(address as string),
    enabled: !!address,
    queryFn: async () => {
      if (!address) return false;
      return await isCategoryAdmin(address);
    },
  });
};
