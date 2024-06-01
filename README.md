# GNairaToken Project
## Overview
The GNairaToken project consists of two main smart contracts:

1. GNairaToken: An ERC20 token with additional features such as capping, burning, and block rewards. <br>
2. MultiSigWallet: A multi-signature wallet for managing transactions securely.

## Smart Contracts
### GNairaToken
`GNairaToken` is an ERC20 token with a capped supply, burnable functionality, and block rewards for miners.

Key Features:

* Capped Supply: Limits the maximum number of tokens that can be minted.<br>
* Burnable: Allows tokens to be destroyed, reducing the total supply.<br>
* Block Rewards: Rewards miners with tokens for including transactions in blocks.   


### MultiSigWallet
`MultiSigWallet` is a multi-signature wallet that requires multiple approvals for executing transactions. <br>

Key Features:

* Multi-Signature Transactions: Requires a specified number of approvals from owners to execute a transaction. <br>
* Revoke Approvals: Owners can revoke their approvals if necessary. <br>
* Transaction Management: Allows owners to submit, approve, revoke, and execute transactions. <br>


## Development Environment

### Tools Used
* Solidity: The programming language used for writing smart contracts. <br>
* Remix IDE: A browser-based IDE for developing, deploying, and testing smart contracts. <br>
* Hardhat: A development environment to compile, deploy, test, and debug Ethereum software. <br>
* OpenZeppelin: A library for secure smart contract development.
* Mocha: A JavaScript test framework for Node.js. <br>
* Chai: A BDD / TDD assertion library for Node.js and the browser.<br>

## Dependencies <br>
Ensure you have the following dependencies installed: <br>
`npm install` <br>

`npm i hardhat` 

## Setup Instructions <br>
1. Clone the Repository: <br>
    `git clone https://github.com/Uncle Kweks/gnaiaratoken-project.git
cd gnaiaratoken-project
`

2. Install Dependencies: <br>
   `npm install`

3. Compile the Contracts:
   `npx hardhat compile` 

4. Deploy the Contracts:
   `npx hardhat run scripts/deploy.js --network <your_network>
`

5. Run Tests:
   `npx hardhat test`

## Testing 
Unit tests for the `GNairaToken` contract are written using Hardhat and Chai. Ensure you have the development dependencies installed and run the tests using Hardhat. <br>


## Deployment Script
The deployment script `deploy.js` deploys the GNairaToken contract and logs the contract address and token supply. <br>

`node scripts/deploy.cjs`



## Environment Variables
Create a `.env` file in the root directory of your project and add the following variables:

`PRIVATE_KEY=<your_private_key> <br>`

`INFURA_API_KEY=<your_infura_api_key>`

Replace `<your_private_key>` with your Ethereum account's private key and `<your_infura_api_key>` with your Infura project ID.

## Additional Resources
* [Solidity Documentation](https://docs.soliditylang.org/en/latest/index.html) <br>
* [Remix IDE](https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null)<br>
* [OpenZeppelin Contracts](https://www.openzeppelin.com/) <br>
* [Hardhat Documentation](https://hardhat.org/docs) <br>

## License
This project is licensed under the [MIT](https://opensource.org/license/mit) License. See the LICENSE file for more details.