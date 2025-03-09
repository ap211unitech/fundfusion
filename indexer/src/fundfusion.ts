import { NewCampaignCreated as NewCampaignCreatedEvent } from "../generated/FundFusion/FundFusion";
import { DeployedCampaign } from "../generated/schema";

export function handleNewCampaignCreated(event: NewCampaignCreatedEvent): void {
  const id = event.transaction.hash.concatI32(event.logIndex.toI32());
  const entity = new DeployedCampaign(id);

  entity.owner = event.params.creator;
  entity.campaign = event.params.campaign;
  entity.createdAt = event.params.timestamp;

  entity.save();
}
