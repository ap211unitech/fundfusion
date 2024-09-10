export type SearchParams = { [key: string]: string | string[] | undefined };

export type CampaignMetadata = {
  title: string;
  category: string;
  description: string;
  image: string;
  targetAmount: number;
  targetTimestamp: number;
  status: string;
};

export type Campaign = CampaignMetadata & {
  owner: string;
  address: string;
  fundWithdrawanByOwner: boolean;
  totalRaisedAmount: number;
};
