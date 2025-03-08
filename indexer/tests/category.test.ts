import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CreatedCategory } from "../generated/schema"
import { CreatedCategory as CreatedCategoryEvent } from "../generated/Category/Category"
import { handleCreatedCategory } from "../src/category"
import { createCreatedCategoryEvent } from "./category-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let categoryId = BigInt.fromI32(234)
    let name = "Example string value"
    let newCreatedCategoryEvent = createCreatedCategoryEvent(
      owner,
      categoryId,
      name
    )
    handleCreatedCategory(newCreatedCategoryEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CreatedCategory created and stored", () => {
    assert.entityCount("CreatedCategory", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CreatedCategory",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CreatedCategory",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "categoryId",
      "234"
    )
    assert.fieldEquals(
      "CreatedCategory",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
