import { expect } from "chai";
import { ethers } from "hardhat";

import { categoryContractHandler, tokens } from "../../utils";
import { ContractRunner, ContractTransactionResponse } from "ethers";
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

    const categoryContractAddress = await categoryContractHandler(true);

    const campaignContract = await ethers.getContractFactory("Campaign");
    contract = await campaignContract.deploy(
      deployer.address,
      TITLE,
      CATEGORY,
      DESCRIPTION,
      IMAGE,
      TARGET_AMOUNT,
      TARGET_TIMESTAMP,
      categoryContractAddress
    );
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
      const AMOUNT_3 = tokens(1);
      const AMOUNT_NEW = tokens(2.5);

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

      it("Should update contract balance & raisedAmount", async () => {
        const contractAddress = await contract.getAddress();
        const balance = await ethers.provider.getBalance(contractAddress);
        const raisedAmount = await contract.totalRaisedAmount();
        expect(balance).to.equal(AMOUNT_1 + AMOUNT_2);
        expect(raisedAmount).to.equal(AMOUNT_1 + AMOUNT_2);
      });

      it("Should mark contract inactive when target amount met", async () => {
        // 9 ETH already contributed, 1 ETH left to reach target, let's donate it and test
        tx = await contract
          .connect(CONTRIBUTOR_2 as unknown as ContractRunner)
          .donate({ value: AMOUNT_3 });
        await tx.wait();

        const contractAddress = await contract.getAddress();
        const balance = await ethers.provider.getBalance(contractAddress);
        const raisedAmount = await contract.totalRaisedAmount();

        expect(balance).to.equal(TARGET_AMOUNT);
        expect(raisedAmount).to.equal(TARGET_AMOUNT);
        expect((await contract.getMetadata()).at(6)).to.equal("INACTIVE");
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

        it("Should update contract balance & raisedAmount after new transaction", async () => {
          const contractAddress = await contract.getAddress();
          const balance = await ethers.provider.getBalance(contractAddress);
          const raisedAmount = await contract.totalRaisedAmount();
          expect(balance).to.equal(AMOUNT_1 + AMOUNT_2 + AMOUNT_NEW);
          expect(raisedAmount).to.equal(AMOUNT_1 + AMOUNT_2 + AMOUNT_NEW);
        });
      });
    });
  });
});
