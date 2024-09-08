import { ethers } from "hardhat";
import { categories } from "../constants/items";
import { tokens } from "../utils";

const main = async () => {
  // SetUp Account
  const [deployer] = await ethers.getSigners();

  // Deploy contract
  const categoryContract = await ethers.getContractFactory("Category");
  const contract = await categoryContract.deploy({ gasLimit: 5000000 });
  const contractAddress = await contract.getAddress();
  console.log(`Deployed Category Contract at => ${contractAddress}`);

  // Add some categories
  for (let i = 0; i < categories.length; i++) {
    const tx = await contract.createCategory(categories[i]);
    await tx.wait();
    // await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

main()
  .then(() => console.log("Deployment successful !!"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
