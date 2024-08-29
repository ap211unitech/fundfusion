import { ethers } from "hardhat";

export const tokens = (val: number) => {
  return ethers.parseUnits(val.toString());
};

export const sleep = async (seconds: number) =>
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const categoryContractHandler = async (create?: boolean) => {
  let categoryContract = await ethers.getContractFactory("Category");
  let deployedCategoryContract = await categoryContract.deploy();

  if (create) {
    const CATEGORY = "Test Category";
    await (await deployedCategoryContract.createCategory(CATEGORY)).wait();
  }

  return await deployedCategoryContract.getAddress();
};
