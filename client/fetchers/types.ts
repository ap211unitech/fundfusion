import { CampaignStatus } from "@/types";

export type Category_Response = {
  id: string;
  owner: string;
  categoryId: string;
  name: string;
  updatedAt: string;
};

export type CampaignInfo_Response = {
  id: string;
  owner: string;
  address: string;
  title: string;
  categoryId: number;
  description: string;
  image: string;
  targetAmount: number;
  targetTimestamp: number;
  status: CampaignStatus;
  fundWithdrawanByOwner: boolean;
  totalRaisedAmount: number;
  contributors: Contributor_Response[];
};

export type Contributor_Response = {
  id: string;
  contributor: string;
  amount: number;
  timestamp: number;
  hasClaimedRefund: boolean;
};
