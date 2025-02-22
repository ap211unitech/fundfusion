import { expect } from "chai";
import { ethers } from "hardhat";

import { categoryContractHandler, sleep, tokens } from "../../utils";
import { ContractTransactionResponse } from "ethers";
import { Campaign } from "../../typechain-types";

const TITLE = "Test Campaign";
const CATEGORY_ID = 0;
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

    const categoryContractAddress = await categoryContractHandler(true);

    const campaignContract = await ethers.getContractFactory("Campaign");
    const TARGET_TIMESTAMP = Math.floor(new Date().getTime() / 1000) + 60;
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

  const EDIT_TITLE = "Edited Test Campaign";
  const EDIT_CATEGORY_ID = 1;
  const EDIT_DESCRIPTION = "Test Description";
  const EDIT_IMAGE = "https://edited-test-image.jpg";
  const EDIT_TARGET_AMOUNT = tokens(5.5);

  describe("Try editing campaign", () => {
    it("Should not edit camaign as it's not owner", async () => {
      const tx = contract
        .connect((await ethers.getSigners()).at(2))
        .editCampaign(
          EDIT_TITLE,
          EDIT_CATEGORY_ID,
          EDIT_DESCRIPTION,
          EDIT_IMAGE,
          EDIT_TARGET_AMOUNT
        );
      await expect(tx).to.be.rejectedWith("Only owner allowed !!");
    });

    it("Should not edit campaign if it is not active", async () => {
      let tx = contract.deleteCampaign();
      await (await tx).wait();

      tx = contract.editCampaign(
        EDIT_TITLE,
        EDIT_CATEGORY_ID,
        EDIT_DESCRIPTION,
        EDIT_IMAGE,
        EDIT_TARGET_AMOUNT
      );
      await expect(tx).to.be.rejectedWith(
        "Only active campaigns can be edited !!"
      );
    });

    it("Should not edit camaign as deadline passed", async () => {
      await sleep(50);
      const tx = contract.editCampaign(
        EDIT_TITLE,
        EDIT_CATEGORY_ID,
        EDIT_DESCRIPTION,
        EDIT_IMAGE,
        EDIT_TARGET_AMOUNT
      );
      await expect(tx).to.be.rejectedWith(
        "Campaign is no longer valid. Deadline passed now !!"
      );
    });
  });

  describe("Edit Campaign", () => {
    let tx: ContractTransactionResponse;
    beforeEach(async () => {
      tx = await contract.editCampaign(
        EDIT_TITLE,
        EDIT_CATEGORY_ID,
        EDIT_DESCRIPTION,
        EDIT_IMAGE,
        EDIT_TARGET_AMOUNT
      );
      await tx.wait();
    });

    it("Should update title", async () => {
      expect(await contract.title()).to.equal(EDIT_TITLE);
    });

    it("Should update category", async () => {
      expect(await contract.categoryId()).to.equal(EDIT_CATEGORY_ID);
    });

    it("Should update description", async () => {
      expect(await contract.description()).to.equal(EDIT_DESCRIPTION);
    });

    it("Should update image url", async () => {
      expect(await contract.image()).to.equal(EDIT_IMAGE);
    });

    it("Should update target amount", async () => {
      expect(await contract.targetAmount()).to.equal(EDIT_TARGET_AMOUNT);
    });

    it("Should emit CampaignEdited event", async () => {
      expect(tx).to.emit(contract, "CampaignEdited");
    });
  });
});
