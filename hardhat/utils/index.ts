import { ethers } from "ethers";

export const tokens = (val: number) => {
  return ethers.parseUnits(val.toString());
};
