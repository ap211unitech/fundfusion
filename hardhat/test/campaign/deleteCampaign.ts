import { expect } from "chai";
import { ethers } from "hardhat";

import { sleep, tokens } from "../../utils";
import { ContractTransactionResponse } from "ethers";
import { Campaign } from "../../typechain-types";

const TITLE = "Test Campaign";
const CATEGORY = "Test Category";
const DESCRIPTION = "Test Description";
const IMAGE = "https://test-image.jpg";
const TARGET_AMOUNT = tokens(10);

describe("Campaign Contract", function () {
  let contract: Campaign & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let deployer: { address: any };

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const campaignContract = await ethers.getContractFactory("Campaign");
    const TARGET_TIMESTAMP = Math.floor(new Date().getTime() / 1000) + 20;
    contract = await campaignContract.deploy(
      TITLE,
      CATEGORY,
      DESCRIPTION,
      IMAGE,
      TARGET_AMOUNT,
      TARGET_TIMESTAMP
    );
  });

  describe("Try delete campaign", () => {
    it("Should not deleted camaign as it's not owner", async () => {
      const tx = contract
        .connect((await ethers.getSigners()).at(2))
        .deleteCampaign();
      await expect(tx).to.be.rejectedWith("Only owner allowed !!");
    });

    it("Should not delete if campaign already deleted", async () => {
      let tx = contract.deleteCampaign();
      await (await tx).wait();

      tx = contract.deleteCampaign();
      await expect(tx).to.be.rejectedWith(
        "Only active campaigns can be deleted !!"
      );
    });

    it("Should not delete if deadline passed", async () => {
      await sleep(25);
      let tx = contract.deleteCampaign();
      await expect(tx).to.be.rejectedWith(
        "Campaign is no longer valid. Deadline passed now !!"
      );
    });
  });

  describe("Delete Campaign", () => {
    let beforeStatus: bigint;
    let tx: ContractTransactionResponse;
    beforeEach(async () => {
      beforeStatus = await contract.status();
      tx = await contract.deleteCampaign();
      await tx.wait();
    });

    it("Should change status", async () => {
      expect(beforeStatus).to.equal(0);
      expect(await contract.status()).to.equal(1);
    });

    it("Should emit CampaignDeleted event", async () => {
      expect(tx).to.emit(contract, "CampaignDeleted");
    });
  });
});
