import { expect } from "chai";
import { ethers } from "hardhat";

import { categoryContractHandler, tokens } from "../../utils";
import { ContractTransactionResponse } from "ethers";
import { FundFusion } from "../../typechain-types";

const TITLE = "Test Campaign";
const CATEGORY = "Test Category";
const DESCRIPTION = "Test Description";
const IMAGE = "https://test-image.jpg";
const TARGET_AMOUNT = tokens(10);
const TARGET_TIMESTAMP = Math.floor(new Date().getTime() / 1000) + 10000;

describe("FundFusion Contract", () => {
  let contract: FundFusion & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let deployer: { address: any };

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const fundfusionContract = await ethers.getContractFactory("FundFusion");
    contract = await fundfusionContract.deploy();
  });

  describe("Create new campaign", () => {
    let tx: ContractTransactionResponse;
    beforeEach(async () => {
      const categoryContractAddress = await categoryContractHandler(true);
      tx = await contract.createCampaign(
        TITLE,
        CATEGORY,
        DESCRIPTION,
        IMAGE,
        TARGET_AMOUNT,
        TARGET_TIMESTAMP,
        categoryContractAddress
      );
      await tx.wait();
    });

    it("Should update mapping", async () => {
      const campaigns = await contract.getDeployedCampaigns(deployer.address);
      expect(campaigns.length).to.equal(1);
    });

    it("Should update allDeployedCampaigns array", async () => {
      const campaigns = await contract.getAllDeployedCampaigns();
      expect(campaigns.length).to.equal(1);
    });

    it("Should emit NewCampaignCreated event", async () => {
      expect(tx).to.emit(contract, "NewCampaignCreated");
    });
  });
});
