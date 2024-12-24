import { useQuery } from "@tanstack/react-query";
import { useAppKitAccount } from "@reown/appkit/react";

import { CAMPAIGN_QUERY_KEYS } from "@/constants";
import { getDeployedCampaignsForUser } from "@/fetchers";

export const useMyCampaigns = () => {
  const { address } = useAppKitAccount();

  return useQuery({
    queryKey: CAMPAIGN_QUERY_KEYS.myCampaigns(address as string),
    enabled: !!address,
    queryFn: async () => {
      if (!address) return [];
      return await getDeployedCampaignsForUser(address);
    },
  });
};
