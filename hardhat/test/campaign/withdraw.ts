import { expect } from "chai";
import { ethers } from "hardhat";

import { categoryContractHandler, sleep, tokens } from "../../utils";
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

    const categoryContractAddress = await categoryContractHandler(true);

    const CURRENT_TIMESTAMP = Math.floor(new Date().getTime() / 1000) + 10;
    const campaignContract = await ethers.getContractFactory("Campaign");
    contract = await campaignContract.deploy(
      deployer.address,
      TITLE,
      CATEGORY,
      DESCRIPTION,
      IMAGE,
      TARGET_AMOUNT,
      CURRENT_TIMESTAMP,
      categoryContractAddress
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
      await sleep(20);
      const tx = contract.withdraw();
      await expect(tx).to.be.rejectedWith("Target amount not met !!");
    });
  });
});

describe("Campaign Contract", function () {
  let tx: ContractTransactionResponse;
  let contract: Campaign & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  let deployer: { address: any };

  let balanceBefore: bigint;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const categoryContractAddress = await categoryContractHandler(true);

    const CURRENT_TIMESTAMP = Math.floor(new Date().getTime() / 1000) + 60;
    const campaignContract = await ethers.getContractFactory("Campaign");
    contract = await campaignContract.deploy(
      deployer.address,
      TITLE,
      CATEGORY,
      DESCRIPTION,
      IMAGE,
      TARGET_AMOUNT,
      CURRENT_TIMESTAMP,
      categoryContractAddress
    );

    // Donate some amount
    tx = await contract
      .connect((await ethers.getSigners()).at(2))
      .donate({ value: tokens(4) });
    await tx.wait();

    tx = await contract
      .connect((await ethers.getSigners()).at(3))
      .donate({ value: tokens(10) });
    await tx.wait();

    // Get Deployer balance before
    balanceBefore = await ethers.provider.getBalance(deployer.address);

    await sleep(60);
    // Withdraw
    tx = await contract.withdraw();
    await tx.wait();
  });

  it("Updates the owner balance", async () => {
    const balanceAfter = await ethers.provider.getBalance(deployer.address);
    expect(balanceAfter).to.be.greaterThan(balanceBefore);
  });

  it("Updates the contract balance", async () => {
    const contractAddress = await contract.getAddress();
    const result = await ethers.provider.getBalance(contractAddress);
    expect(result).to.equal(0);
  });

  it("Updates the fundWithdrawanByOwner variable", async () => {
    const result = await contract.fundWithdrawanByOwner();
    expect(result).to.equal(true);
  });

  it("Emit FundWithdrawanByOwner event", async () => {
    expect(tx).to.emit(contract, "FundWithdrawanByOwner");
  });

  it("Should throw error if try to withdraw again", async () => {
    await expect(contract.withdraw()).to.be.rejectedWith(
      "Can not withdraw from this campaign as funds are already withdrawan !!"
    );
  });
});
