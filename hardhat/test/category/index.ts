import { expect } from "chai";
import { ethers } from "hardhat";

import { ContractTransactionResponse } from "ethers";
import { Category } from "../../typechain-types";

const CATEGORY_NAME = "DeFi";

describe("Category Contract", () => {
  let contract: Category & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let deployer: { address: any };

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const categoryContract = await ethers.getContractFactory("Category");
    contract = await categoryContract.deploy();
  });

  describe("Create new category", () => {
    let tx: ContractTransactionResponse;
    beforeEach(async () => {
      tx = await contract.createCategory(CATEGORY_NAME);
      await tx.wait();
    });

    it("Should update category array", async () => {
      const campaigns = await contract.getCategories();
      expect(campaigns.includes(CATEGORY_NAME)).to.equal(true);
    });

    it("Should emit CreatedCategory event", async () => {
      expect(tx).to.emit(contract, "CreatedCategory");
    });
  });

  describe("Edit category", () => {
    const EDITED_CATEGORY_NAME = "Finance";
    let tx: ContractTransactionResponse;
    beforeEach(async () => {
      tx = await contract.createCategory(CATEGORY_NAME);
      await tx.wait();

      tx = await contract.editCategory(0, EDITED_CATEGORY_NAME);
      await tx.wait();
    });

    it("Should throw error if out of bound", async () => {
      const tx = contract.editCategory(1, EDITED_CATEGORY_NAME);
      await expect(tx).to.be.rejectedWith("Out of bound !!");
    });

    it("Should update category array", async () => {
      const campaigns = await contract.getCategories();
      expect(campaigns.includes(CATEGORY_NAME)).to.equal(false);
      expect(campaigns.includes(EDITED_CATEGORY_NAME)).to.equal(true);
    });

    it("Should emit EditCategory event", async () => {
      expect(tx).to.emit(contract, "EditCategory");
    });
  });
});
