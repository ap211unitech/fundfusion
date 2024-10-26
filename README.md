# FundFusion

FundFusion is a Decentralized crowdfunding platform built on the blockchain, leveraging Next.js for the frontend and Solidity for smart contract development. This project enables users to create new campaigns, edit/delete it, donate to any active campaign, get refund (if campaign didn't met the target amount)

Check out the FundFusion Demo [here]().

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Contributing](#contributing)

## Features

- Decentralized platform for buying and selling goods.
- Secure transactions using cryptocurrency.
- User-friendly interface with a responsive design.
- Product listing with detailed descriptions and pricing.
- Integration with blockchain for transparent and tamper-proof transactions.
- Admin can track orders, create new products & Withdraw funds from Smart Contract.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, Typescript, Server-Side fetching
- **Backend:** Hardhat, Solidity (Smart Contracts)
- **Blockchain:** Sepolia Testnet (Ethereum)
- **Tools:** Hardhat, Ethers.js

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- MetaMask or any Ethereum wallet

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ap211unitech/fundfusion.git
    cd fundfusion
    ```

2. Install the dependencies:

    ```bash
    cd client && yarn install
    ```
    
    ```bash
    cd hardhat && yarn install
    ```

3. Compile the smart contracts:

    ```bash
    cd hardhat && yarn hardhat compile
    ```

4. Deploy the smart contract:

    ```bash
    npx hardhat vars set ETHERSCAN_API_KEY 
    ```

    ```bash
    npx hardhat vars set ALCHEMY_KEY 
    ```

    ```bash
    npx hardhat vars set SEPOLIA_ACCOUNT_PRIVATE_KEY 
    ```

    ```bash
    cd hardhat && yarn hardhat run ./scripts/deploy.js --network sepolia
    ```

5. Start the build server:

    ```bash
    cd client
    yarn build
    yarn start
    ```

6. Open your browser and navigate to `http://localhost:3000`.

### Usage

1. Connect your Ethereum wallet using MetaMask.
2. Browse through the product listings.
3. Purchase any product
4. Proceed to checkout and confirm the transaction using your cryptocurrency.
5. Wait for the transaction to be confirmed on the blockchain.

### Smart Contracts

The smart contracts for CryptoCart are written in Solidity and handle the core logic of the platform, including product listing, purchasing, and transaction management. The contracts are deployed on the Sepolia Testnet Ethereum network.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## See Live
https://fundfusion.vercel.app/

## Reach me out
porwalarjun95@gmail.com

## Connect with me
https://www.linkedin.com/in/arjun-porwal-9198b71a3/