import { expect } from "chai";
import { ethers } from "hardhat";

import { sleep, tokens } from "../../utils";
import { ContractRunner, ContractTransactionResponse } from "ethers";
import { Campaign } from "../../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const TITLE = "Test Campaign";
const CATEGORY = "Test Category";
const DESCRIPTION = "Test Description";
const IMAGE = "https://test-image.jpg";
const TARGET_AMOUNT = tokens(10);

const DONATE_AMOUNT = tokens(3);

describe("Campaign Contract", function () {
  let contract: Campaign & {
    deploymentTransaction(): ContractTransactionResponse;
  };

  let donator: ContractRunner | HardhatEthersSigner | null | undefined;

  beforeEach(async () => {
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

    donator = (await ethers.getSigners()).at(2);

    const tx = await contract.connect(donator).donate({ value: DONATE_AMOUNT });
    await tx.wait();
  });

  describe("Try refund process", () => {
    it("Should not refund if campaign is not over", async () => {
      const tx = contract.connect(donator).getRefund();
      await expect(tx).to.be.rejectedWith(
        "You are not eligible to get refund !!"
      );
    });

    it("Should not refund if targetAmount met", async () => {
      await (
        await contract.connect(donator).donate({ value: tokens(15) })
      ).wait();

      const tx = contract.connect(donator).getRefund();
      await expect(tx).to.be.rejectedWith(
        "You are not eligible to get refund !!"
      );
    });

    it("Should not refund if not donated", async () => {
      await sleep(20);
      const tx = contract.getRefund();
      await expect(tx).to.be.rejectedWith(
        "Either you have claimed your refund or you haven't donated to this campaign !!"
      );
    });
  });
});

describe("Campaign Contract", function () {
  let contract: Campaign & {
    deploymentTransaction(): ContractTransactionResponse;
  };

  let donator: ContractRunner | HardhatEthersSigner | null | undefined;

  let contributorMappingBefore: bigint;
  let contractBalanceBefore: bigint;

  beforeEach(async () => {
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

    donator = (await ethers.getSigners()).at(2);

    const tx = await contract.connect(donator).donate({ value: DONATE_AMOUNT });
    await tx.wait();

    contractBalanceBefore = await ethers.provider.getBalance(
      await contract.getAddress()
    );

    contributorMappingBefore = await contract.contributors(
      // @ts-ignore
      donator.address
    );
  });

  describe("Refund process", () => {
    it("Should change contract balance", async () => {
      await sleep(20);
      await contract.connect(donator).getRefund();

      const newContractBalance = await ethers.provider.getBalance(
        await contract.getAddress()
      );
      expect(contractBalanceBefore - newContractBalance).to.equal(
        DONATE_AMOUNT
      );
    });

    it("Should change donator balance", async () => {
      await sleep(20);
      await contract.connect(donator).getRefund();

      const newContributorBalance = await ethers.provider.getBalance(
        await contract.getAddress()
      );
      expect(contributorMappingBefore - newContributorBalance).to.equal(
        DONATE_AMOUNT
      );
    });
  });
});
