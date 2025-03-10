import { BigInt } from "@graphprotocol/graph-ts";

import {
  CreateCampaignCall,
  NewCampaignCreated as NewCampaignCreatedEvent,
} from "../generated/FundFusion/FundFusion";
import { CampaignFactory, CampaignInfo } from "../generated/schema";
import { Campaign as CampaignTemplate } from "../generated/templates";

export function handleNewCampaignCreated(event: NewCampaignCreatedEvent): void {
  const id = event.params.creator.concatI32(event.block.timestamp.toI32());
  const entity = new CampaignFactory(id);

  entity.owner = event.params.creator;
  entity.campaign = event.params.campaign;
  entity.createdAt = event.params.timestamp;

  entity.save();

  // Start indexing the campaign; `event.params.campaign` is the address of the new Campaign contract
  CampaignTemplate.create(event.params.campaign);
}

export function handleCreateCampaignCall(call: CreateCampaignCall): void {
  const id = call.transaction.from.concatI32(call.block.timestamp.toI32());

  // I missed throwing the event while creating campaign,
  // so doing this HACK to get `campaignAddress` from CampaignFactory entity
  // because I can build the same ID here.
  const campaignFactory = CampaignFactory.load(id);

  if (campaignFactory) {
    const transaction = new CampaignInfo(id);

    transaction.owner = call.from;
    transaction.address = campaignFactory.campaign;
    transaction.title = call.inputs._title;
    transaction.categoryId = call.inputs._categoryId;
    transaction.description = call.inputs._description;
    transaction.image = call.inputs._image;
    transaction.targetAmount = call.inputs._targetAmount;
    transaction.targetTimestamp = call.inputs._targetTimestamp;
    transaction.status = "ACTIVE";
    transaction.fundWithdrawanByOwner = false;
    transaction.totalRaisedAmount = new BigInt(0);

    transaction.save();
  }
}
