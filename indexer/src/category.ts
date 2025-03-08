import {
  CreatedCategory as CreatedCategoryEvent,
  EditCategory as EditCategoryEvent
} from "../generated/Category/Category"
import { CreatedCategory, EditCategory } from "../generated/schema"

export function handleCreatedCategory(event: CreatedCategoryEvent): void {
  let entity = new CreatedCategory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.categoryId = event.params.categoryId
  entity.name = event.params.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEditCategory(event: EditCategoryEvent): void {
  let entity = new EditCategory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.categoryId = event.params.categoryId
  entity.name = event.params.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
