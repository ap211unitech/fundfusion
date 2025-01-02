import { ethers, hardhatArguments } from "hardhat";

import { categories, campaigns } from "../constants/items";

const main = async () => {
  let contract, contractAddress;

  const NETWORK = hardhatArguments.network;

  // Deploy Category contract
  const categoryContract = await ethers.getContractFactory("Category");
  contract = await categoryContract.deploy({ gasLimit: 5000000 });
  const categoryContractAddress = await contract.getAddress();
  console.log(`Deployed Category Contract at => ${categoryContractAddress}`);

  // Add some categories
  for (let i = 0; i < categories.length; i++) {
    const tx = await contract.createCategory(categories[i]);
    await tx.wait();

    if (NETWORK !== "localhost")
      await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Deploy FundFusion contract
  const fundfusionContract = await ethers.getContractFactory("FundFusion");
  contract = await fundfusionContract.deploy({ gasLimit: 5000000 });
  contractAddress = await contract.getAddress();
  console.log(`Deployed FundFusion Contract at => ${contractAddress}`);

  // Add some Campaigns
  for (let i = 0; i < campaigns.length; i++) {
    const {
      title,
      categoryId,
      description,
      image,
      targetAmount,
      targetTimestamp,
    } = campaigns[i];

    const tx = await contract.createCampaign(
      title,
      categoryId,
      description,
      image,
      targetAmount,
      targetTimestamp,
      categoryContractAddress
    );
    await tx.wait();
    if (NETWORK !== "localhost")
      await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};

main()
  .then(() => console.log("Deployment successful !!"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
