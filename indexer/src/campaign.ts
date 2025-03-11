import {
  FundDonated as FundDonatedEvent,
  FundWithdrawanByOwner as FundWithdrawanByOwnerEvent,
} from "../generated/templates/Campaign/Campaign";

import { Contributor, CampaignInfo } from "../generated/schema";

export function handleFundDonated(event: FundDonatedEvent): void {
  const id = event.transaction.hash.concatI32(event.logIndex.toI32());
  const entity = new Contributor(id);

  entity.contributor = event.params.contributor;
  entity.campaign = event.params.campaign;
  entity.amount = event.params.amount;
  entity.timestamp = event.params.timestamp;
  entity.hasClaimedRefund = false;

  entity.save();
}

export function handleFundWithdrawanByOwner(
  event: FundWithdrawanByOwnerEvent
): void {
  const campaignInfo = CampaignInfo.load(event.transaction.from);
  if (campaignInfo) {
    campaignInfo.fundWithdrawanByOwner = true;
    campaignInfo.save();
  }
}
