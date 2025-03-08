import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { CreatedCategory, EditCategory } from "../generated/Category/Category"

export function createCreatedCategoryEvent(
  owner: Address,
  categoryId: BigInt,
  name: string
): CreatedCategory {
  let createdCategoryEvent = changetype<CreatedCategory>(newMockEvent())

  createdCategoryEvent.parameters = new Array()

  createdCategoryEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  createdCategoryEvent.parameters.push(
    new ethereum.EventParam(
      "categoryId",
      ethereum.Value.fromUnsignedBigInt(categoryId)
    )
  )
  createdCategoryEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return createdCategoryEvent
}

export function createEditCategoryEvent(
  owner: Address,
  categoryId: BigInt,
  name: string
): EditCategory {
  let editCategoryEvent = changetype<EditCategory>(newMockEvent())

  editCategoryEvent.parameters = new Array()

  editCategoryEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  editCategoryEvent.parameters.push(
    new ethereum.EventParam(
      "categoryId",
      ethereum.Value.fromUnsignedBigInt(categoryId)
    )
  )
  editCategoryEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return editCategoryEvent
}
