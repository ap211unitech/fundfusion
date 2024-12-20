const CATEGORY_QUERY_KEYS_PREFIX = "@category";
const CAMPAIGN_QUERY_KEYS_PREFIX = "@campaign";

export const CATEGORY_QUERY_KEYS = {
  checkAdmin: (address: string) => [
    CATEGORY_QUERY_KEYS_PREFIX,
    "checkAdmin",
    address,
  ],
};

export const CAMPAIGN_QUERY_KEYS = {
  myCampaigns: (address: string) => [
    CAMPAIGN_QUERY_KEYS_PREFIX,
    "myCampaigns",
    address,
  ],
};
