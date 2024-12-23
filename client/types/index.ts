export type SearchParams = { [key: string]: string | string[] | undefined };

export type CampaignMetadata = {
  title: string;
  category: string;
  description: string;
  image: string;
  targetAmount: number;
  targetTimestamp: number;
  status: CampaignStatus;
};

export enum CampaignStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}

export type Campaign = CampaignMetadata & {
  owner: string;
  address: string;
  fundWithdrawanByOwner: boolean;
  totalRaisedAmount: number;
  contributors: Map<string, number>;
};

export type IpfsResponse = {
  status: number;
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
};
