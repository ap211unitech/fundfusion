import { expect } from "chai";
import { ethers } from "hardhat";

import { categoryContractHandler, tokens } from "../../utils";
import { ContractTransactionResponse } from "ethers";
import { Campaign } from "../../typechain-types";

const TITLE = "Test Campaign";
const CATEGORY_ID = 0;
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

    const categoryContractAddress = await categoryContractHandler(true);

    const campaignContract = await ethers.getContractFactory("Campaign");
    contract = await campaignContract.deploy(
      deployer.address,
      TITLE,
      CATEGORY_ID,
      DESCRIPTION,
      IMAGE,
      TARGET_AMOUNT,
      TARGET_TIMESTAMP,
      categoryContractAddress
    );
  });

  describe("Deployment Fail", () => {
    it("Timestamp less than current time", async () => {
      const categoryContractAddress = await categoryContractHandler(false);

      const campaignContract = await ethers.getContractFactory("Campaign");
      const contract = campaignContract.deploy(
        deployer.address,
        TITLE,
        CATEGORY_ID,
        DESCRIPTION,
        IMAGE,
        TARGET_AMOUNT,
        TARGET_TIMESTAMP - 10000,
        categoryContractAddress
      );
      await expect(contract).to.be.rejectedWith(
        "Target timestamp must be greater than current time !!'"
      );
    });

    it("Category doesn't exists", async () => {
      const categoryContractAddress = await categoryContractHandler(false);

      const campaignContract = await ethers.getContractFactory("Campaign");
      const contract = campaignContract.deploy(
        deployer.address,
        TITLE,
        CATEGORY_ID,
        DESCRIPTION,
        IMAGE,
        TARGET_AMOUNT,
        TARGET_TIMESTAMP,
        categoryContractAddress
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
      const category = await contract.categoryId();
      expect(category).to.equal(CATEGORY_ID);
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
      expect(metadata[1]).to.equal(CATEGORY_ID);
      expect(metadata[2]).to.equal(DESCRIPTION);
      expect(metadata[3]).to.equal(IMAGE);
      expect(metadata[4]).to.equal(TARGET_AMOUNT);
      expect(metadata[5]).to.equal(TARGET_TIMESTAMP);
      expect(metadata[6]).to.equal("ACTIVE");
    });
  });
});
