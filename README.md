# FundFusion

FundFusion is a decentralized crowdfunding platform that empowers users to create, manage, and contribute to campaigns transparently. Campaign owners can withdraw funds from the smart contract, and contributors can claim refunds under specific conditions. Admin can manage categories for better campaign organization.

Built with a robust tech stack, FundFusion ensures a secure and seamless user experience with features like user-friendly forms, managing and storing images on IPFS, real-time updates, and blockchain transparency.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Smart Contracts](#smart-contracts)
- [Contributing](#contributing)

## Features

- **Campaign Management**:

  - Users can create, edit, and delete campaigns.
  - Campaigns deactivates under certain conditions, such as meeting their target or being deleted by the owner etc.

- **Contributor Features**:

  - Contributors can securely fund campaigns using cryptocurrency.
  - Refunds are available for contributors if
    - Campaign is deactivated before completion
    - Campaign did not met target amount after completion

- Campaign owners can withdraw funds from the smart contract when specific conditions are met.
- Admin can create new categories and edit existing ones for better organization.
- Leveraging blockchain technology for tamper-proof and transparent transactions.
- Intuitive and responsive design for seamless interaction across devices.
- Fully functional indexer for the FundFusion using TheGraph, enabling efficient querying of blockchain data, Optimized data retrieval by structuring GraphQL schemas and subgraph mappings to track campaign activity in real-time.

## Tech Stack

- **Frontend:** Next.js, Server-Side fetching, Tailwind CSS, Typescript, React Hook Form & Zod Validation, Pinata SDK for managing and storing images on IPFS, Reown Wallet Kit, Ethers.js etc
- **Backend:** Hardhat, Solidity (Smart Contracts)
- **Indexer:** TheGraph, GraphQL, Docker
- **Testing:** Thorough testing using TypeScript and Ethers.js for robust smart contract.
- **Blockchain:** Sepolia Testnet (Ethereum)
- **Tools:** Hardhat, Ethers.js

## Getting Started

Follow these instructions to set up the project locally. This might take a little while to set up, so please hang tight. Additionally, it's crucial to follow these steps in given sequence in order to avoid potential issues.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- MetaMask or any EVM wallet

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ap211unitech/fundfusion.git
   cd fundfusion
   ```

2. Install the dependencies:

   ```bash
   cd client && yarn
   cd hardhat && yarn
   cd indexer && yarn
   ```

3. Compile the smart contracts:

   ```bash
   cd hardhat && yarn hardhat compile
   ```

4. Run Hardhat node:

   ```bash
   cd hardhat && yarn hardhat node
   ```

5. Deploy the smart contract in a different terminal window:

   ```bash
   cd hardhat && yarn hardhat run ./scripts/deploy.ts --network localhost
   ```

6. Setup Indexer. This cleans old build files, regenerates necessary code, and compiles the indexer project for a fresh setup:

   ```bash
      cd indexer
      yarn clean
      yarn ready
   ```

7. Deploy Subgraph to [The Graph Studio](https://thegraph.com/studio/):

   ```bash
      cd indexer
      yarn deploy
   ```

8. Create `.env.local` file in `client` folder & put appropriate environment variables:

   ```bash
   NEXT_PUBLIC_REOWN_PROJECT_ID=
   NEXT_PUBLIC_CATEGORY_CONTRACT=
   NEXT_PUBLIC_FUNDFUSION_CONTRACT=
   NEXT_PUBLIC_PINATA_GATEWAY=
   NEXT_PUBLIC_RPC_URL=http://localhost:8545
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.studio.thegraph.com/query/<your user id>/fundfusion/version/latest

   PINATA_JWT_TOKEN=
   ```

9. Start the dev server:

   ```bash
   cd client
   yarn dev
   ```

10. Open your browser and navigate to `http://localhost:3000`.

## Smart Contracts

The smart contracts for FundFusion are written in Solidity which handles the core logic of the platform, including campaign publishing, edit/delete them, handling withdraw, refunds and transaction management. The contracts are deployed on the Sepolia Testnet Ethereum network.

## Blockchain Indexer

This indexer efficiently tracks and organizes on-chain campaign data, enabling real-time querying of campaign details, contributions, fund withdrawals and more. By leveraging TheGraph's subgraph architecture, FundFusion can now provide instant and reliable access to blockchain data without relying on slow, manual blockchain calls. This enhances the user experience by ensuring seamless interaction with live campaign information while maintaining decentralization.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## See Live

https://fundfusiona.vercel.app/

## Reach me out

porwalarjun95@gmail.com

## Connect with me

https://www.linkedin.com/in/arjun-porwal-9198b71a3/
