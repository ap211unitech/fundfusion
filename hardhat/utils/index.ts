import { ethers } from "ethers";

export const tokens = (val: number) => {
  return ethers.parseUnits(val.toString());
};

export const sleep = async (seconds: number) =>
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
