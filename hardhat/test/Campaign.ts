import { expect } from "chai";
import { ethers } from "hardhat";

import { tokens } from "../utils";
import { ContractRunner, ContractTransactionResponse } from "ethers";
import { Campaign } from "../typechain-types";

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
    const campaignContract = await ethers.getContractFactory("Campaign");
    contract = await campaignContract.deploy(
      TITLE,
      CATEGORY,
      DESCRIPTION,
      IMAGE,
      TARGET_AMOUNT,
      TARGET_TIMESTAMP
    );
  });

  describe("Deployment Fail", () => {
    it("Deployment should fail", async () => {
      const campaignContract = await ethers.getContractFactory("Campaign");
      const contract = campaignContract.deploy(
        TITLE,
        CATEGORY,
        DESCRIPTION,
        IMAGE,
        TARGET_AMOUNT,
        TARGET_TIMESTAMP - 10000
      );
      await expect(contract).to.be.rejectedWith(
        "Target timestamp must be greater than current time !!'"
      );
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
  });

  describe("Donate to Campaign", () => {
    it("Owner donates <> should fail", async () => {
      const AMOUNT = tokens(4);
      const tx = contract.donate({ value: AMOUNT });
      await expect(tx).to.be.rejectedWith("Owner can not donate !!");
    });

    describe("Contributors donate", () => {
      const AMOUNT_1 = tokens(4);
      const AMOUNT_2 = tokens(5);
      const AMOUNT_NEW = tokens(0.5);

      let CONTRIBUTOR_1: { address: any }, CONTRIBUTOR_2: { address: any };
      let tx: ContractTransactionResponse;

      beforeEach(async () => {
        const signers = await ethers.getSigners();

        CONTRIBUTOR_1 = signers[2];
        CONTRIBUTOR_2 = signers[3];

        tx = await contract
          .connect(CONTRIBUTOR_1 as unknown as ContractRunner)
          .donate({ value: AMOUNT_1 });
        await tx.wait();

        tx = await contract
          .connect(CONTRIBUTOR_2 as unknown as ContractRunner)
          .donate({ value: AMOUNT_2 });
        await tx.wait();
      });

      it("Donators mapping should be updated", async () => {
        const amount_1 = await contract.contributors(CONTRIBUTOR_1.address);
        expect(amount_1).to.equal(AMOUNT_1);

        const amount_2 = await contract.contributors(CONTRIBUTOR_2.address);
        expect(amount_2).to.equal(AMOUNT_2);
      });

      it("Should update contract balance", async () => {
        const contractAddress = await contract.getAddress();
        const balance = await ethers.provider.getBalance(contractAddress);
        expect(balance).to.equal(AMOUNT_1 + AMOUNT_2);
      });

      it("Should emit FundDonated event", async () => {
        expect(tx).to.emit(contract, "FundDonated");
      });

      describe("New donation from existing contributor", () => {
        beforeEach(async () => {
          const tx = await contract
            .connect(CONTRIBUTOR_1 as unknown as ContractRunner)
            .donate({ value: AMOUNT_NEW });
          await tx.wait();
        });

        it("Should aggregate balance in mapping", async () => {
          const amount = await contract.contributors(CONTRIBUTOR_1.address);
          expect(amount).to.equal(AMOUNT_1 + AMOUNT_NEW);
        });

        it("Should update contract balance after new transaction", async () => {
          const contractAddress = await contract.getAddress();
          const balance = await ethers.provider.getBalance(contractAddress);
          expect(balance).to.equal(AMOUNT_1 + AMOUNT_2 + AMOUNT_NEW);
        });
      });
    });
  });
});
