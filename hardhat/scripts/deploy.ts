import { ethers } from "hardhat";

import { categories, campaigns } from "../constants/items";

const main = async () => {
  let contract, contractAddress;

  // Deploy Category contract
  const categoryContract = await ethers.getContractFactory("Category");
  contract = await categoryContract.deploy({ gasLimit: 5000000 });
  const categoryContractAddress = await contract.getAddress();
  console.log(`Deployed Category Contract at => ${categoryContractAddress}`);

  // Add some categories
  for (let i = 0; i < categories.length; i++) {
    const tx = await contract.createCategory(categories[i]);
    await tx.wait();
    // await new Promise((resolve) => setTimeout(resolve, 2000));
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
      category,
      description,
      image,
      targetAmount,
      targetTimestamp,
    } = campaigns[i];

    let signer = (await ethers.getSigners()).at(i);

    const tx = await contract
      .connect(signer)
      .createCampaign(
        title,
        category,
        description,
        image,
        targetAmount,
        targetTimestamp,
        categoryContractAddress
      );
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
