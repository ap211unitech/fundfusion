export const GET_ALL_CATEGORIES_QUERY = `{
  categories {
    id
    owner
    categoryId
    name
    updatedAt
  }
}`;

export const GET_ALL_CAMPAIGNS = `{
  campaignInfos {
    id
    owner
    address
    title
    categoryId
    description
    image
    targetAmount
    targetTimestamp
    status
    fundWithdrawanByOwner
    totalRaisedAmount
    contributors {
      id
      contributor
      amount
      timestamp
      hasClaimedRefund
    }
  }
}`;

export const GET_CAMPAIGN_METADATA = (campaignAddress: string) => `{
  campaignInfo(id: "${campaignAddress}") {
    id
    owner
    address
    title
    categoryId
    description
    image
    targetAmount
    targetTimestamp
    status
    fundWithdrawanByOwner
    totalRaisedAmount
    contributors {
      id
      contributor
      amount
      timestamp
      hasClaimedRefund
    }
  }
}`;

export const GET_USER_CAMPAIGNS = (owner: string) => `{
  campaignInfos(where: {owner: "${owner}"}) {
    id
    owner
    address
    title
    categoryId
    description
    image
    targetAmount
    targetTimestamp
    status
    fundWithdrawanByOwner
    totalRaisedAmount
    contributors {
      id
      contributor
      amount
      timestamp
      hasClaimedRefund
    }
  }
}`;
