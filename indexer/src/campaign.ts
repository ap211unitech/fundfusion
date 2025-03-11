import {
  FundDonated as FundDonatedEvent,
  RefundClaimed as RefundClaimedEvent,
  CampaignEdited as CampaignEditedEvent,
  CampaignDeleted as CampaignDeletedEvent,
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

  // Update `totalRaisedAmount` value
  const campaignInfo = CampaignInfo.load(event.params.campaign);
  if (campaignInfo) {
    campaignInfo.totalRaisedAmount = campaignInfo.totalRaisedAmount.plus(
      event.params.amount
    );
    campaignInfo.save();
  }
}

export function handleFundWithdrawanByOwner(
  event: FundWithdrawanByOwnerEvent
): void {
  const campaignInfo = CampaignInfo.load(event.params.campaign);
  if (campaignInfo) {
    campaignInfo.fundWithdrawanByOwner = true;
    campaignInfo.save();
  }
}

export function handleCampaignEdited(event: CampaignEditedEvent): void {
  const campaignInfo = CampaignInfo.load(event.params.campaign);
  if (campaignInfo) {
    campaignInfo.title = event.params.title;
    campaignInfo.categoryId = event.params.categoryId;
    campaignInfo.description = event.params.description;
    campaignInfo.image = event.params.image;
    campaignInfo.targetAmount = event.params.targetAmount;

    campaignInfo.save();
  }
}

export function handleCampaignDeleted(event: CampaignDeletedEvent): void {
  const campaignInfo = CampaignInfo.load(event.params.campaign);
  if (campaignInfo) {
    campaignInfo.status = "INACTIVE";
    campaignInfo.save();
  }
}

export function handleRefundClaimed(event: RefundClaimedEvent): void {
  const id = event.transaction.hash.concatI32(event.logIndex.toI32());
  const entity = new Contributor(id);

  entity.contributor = event.params.contributor;
  entity.campaign = event.params.campaign;
  entity.amount = event.params.amount;
  entity.timestamp = event.params.timestamp;
  entity.hasClaimedRefund = true;

  entity.save();
}
