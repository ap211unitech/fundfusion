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
const CURRENT_TIMESTAMP = Math.floor(new Date().getTime() / 1000);

describe("Campaign Contract", function () {
  let contract: Campaign & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let deployer: { address: any };

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const campaignContract = await ethers.getContractFactory("Campaign");
    contract = await campaignContract.deploy(
      TITLE,
      CATEGORY,
      DESCRIPTION,
      IMAGE,
      TARGET_AMOUNT,
      CURRENT_TIMESTAMP + 5
    );

    // Donate some amount
    const tx = await contract
      .connect((await ethers.getSigners()).at(2))
      .donate({ value: tokens(4) });
    await tx.wait();
  });

  describe("Try Withdraw from Campaign", () => {
    it("Should not withdraw from active campaign", async () => {
      const tx = contract.withdraw();
      await expect(tx).to.be.rejectedWith(
        "Can not withdraw Funds from active campaigns !!"
      );
    });

    it("Should not withdraw if target amount not met", async () => {
      await sleep(5);
      const tx = contract.withdraw();
      await expect(tx).to.be.rejectedWith("Target amount not met !!");
    });
  });
});
