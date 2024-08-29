import { expect } from "chai";
import { ethers } from "hardhat";

import { tokens } from "../../utils";
import { ContractTransactionResponse } from "ethers";
import { Campaign } from "../../typechain-types";

const TITLE = "Test Campaign";
const CATEGORY = "Test Category";
const DESCRIPTION = "Test Description";
const IMAGE = "https://test-image.jpg";
const TARGET_AMOUNT = tokens(10);
const TARGET_TIMESTAMP = Math.floor(new Date().getTime() / 1000) + 10000;

describe("Campaign Contract", function () {
  let contract: Campaign & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let deployer: { address: any };

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();

    let categoryContract = await ethers.getContractFactory("Category");
    let deployedCategoryContract = await categoryContract.deploy();

    const tx = await deployedCategoryContract.createCategory(CATEGORY);
    await tx.wait();

    const campaignContract = await ethers.getContractFactory("Campaign");
    contract = await campaignContract.deploy(
      TITLE,
      CATEGORY,
      DESCRIPTION,
      IMAGE,
      TARGET_AMOUNT,
      TARGET_TIMESTAMP,
      await deployedCategoryContract.getAddress()
    );
  });

  describe("Deployment Fail", () => {
    it("Timestamp less than current time", async () => {
      let categoryContract = await ethers.getContractFactory("Category");
      let deployedCategoryContract = await categoryContract.deploy();

      const campaignContract = await ethers.getContractFactory("Campaign");
      const contract = campaignContract.deploy(
        TITLE,
        CATEGORY,
        DESCRIPTION,
        IMAGE,
        TARGET_AMOUNT,
        TARGET_TIMESTAMP - 10000,
        await deployedCategoryContract.getAddress()
      );
      await expect(contract).to.be.rejectedWith(
        "Target timestamp must be greater than current time !!'"
      );
    });

    it("Timestamp less than current time", async () => {
      let categoryContract = await ethers.getContractFactory("Category");
      let deployedCategoryContract = await categoryContract.deploy();

      const campaignContract = await ethers.getContractFactory("Campaign");
      const contract = campaignContract.deploy(
        TITLE,
        CATEGORY,
        DESCRIPTION,
        IMAGE,
        TARGET_AMOUNT,
        TARGET_TIMESTAMP,
        await deployedCategoryContract.getAddress()
      );
      await expect(contract).to.be.rejectedWith("Category doesn't exists !!'");
    });
  });

  describe("Deployment", () => {
    it("Owner should be same as Deployer", async () => {
      const contractOwner = await contract.owner();
      expect(contractOwner).to.equal(deployer.address);
    });

    it("Should have a title", async () => {
      const title = await contract.title();
      expect(title).to.equal(TITLE);
    });

    it("Should have a category", async () => {
      const category = await contract.category();
      expect(category).to.equal(CATEGORY);
    });

    it("Should have a description", async () => {
      const description = await contract.description();
      expect(description).to.equal(DESCRIPTION);
    });

    it("Should have target amount", async () => {
      const targetAmount = await contract.targetAmount();
      expect(targetAmount).to.equal(TARGET_AMOUNT);
    });

    it("Should have target date", async () => {
      const targetDate = await contract.targetTimestamp();
      expect(targetDate).to.equal(TARGET_TIMESTAMP);
    });

    it("Should get metadata", async () => {
      const metadata = await contract.getMetadata();
      expect(metadata[0]).to.equal(TITLE);
      expect(metadata[1]).to.equal(CATEGORY);
      expect(metadata[2]).to.equal(DESCRIPTION);
      expect(metadata[3]).to.equal(IMAGE);
      expect(metadata[4]).to.equal(TARGET_AMOUNT);
      expect(metadata[5]).to.equal(TARGET_TIMESTAMP);
      expect(metadata[6]).to.equal("ACTIVE");
    });
  });
});
