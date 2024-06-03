# GNairaToken Project
## Overview
The GNairaToken project consists of two main smart contracts:
GNairaToken is a custom ERC20 token with additional functionalities such as minting, burning, and blacklisting. This contract also integrates a multi-signature wallet for enhanced security of minting and burning operations. The contract is designed to follow the ERC20 standard while introducing features to manage and secure the token effectively.

## Features
1. **ERC20 Standard Compliance:<br>**
   * The GNairaToken adheres to the ERC20 standard, ensuring compatibility with existing wallets and exchanges.

2. **Capped Supply:<br>**
* The total supply of GNairaToken is capped, preventing the creation of tokens beyond a specified limit..

3. **Burnable Tokens: <br>**
* Tokens can be burned (destroyed), reducing the total supply.

4. **Blacklisting: <br>**
* Addresses can be blacklisted to prevent them from sending or receiving tokens.

5. **Governor Role:<br>**
* A special role called 'Governor' is defined, which has exclusive rights to perform critical actions such as minting, burning, and managing the blacklist.

6.** Block Reward:<br>**
* A reward is given to miners for including transactions in blocks, promoting network participation.

7. **Multi-Signature Wallet Integration:<br>**
* The contract integrates with a MultiSigWallet to secure the minting and burning operations, requiring multiple approvals before these actions can be executed.





## Contract Details
### * Parameters:<br>
* **cap**: The maximum number of tokens that can ever exist. <br>
* **reward**: The reward given to miners for including transactions in blocks.<br>
* **owners**: An array of addresses that will own the multi-signature wallet.<br>
*** requiredConfirmations**: The number of confirmations required for a transaction in the multi-signature wallet.<br>

## Governor Functions
 * mintWithMultiSig 

    * Mints new tokens. Can only be called by the governor.<br>
    * function mintWithMultiSig(address account, uint256 amount) external onlyGovernor <br>

* burnWithMultiSig

  * Burns tokens. Can only be called by the governor.<br>
  * function burnWithMultiSig(uint256 amount) external onlyGovernor<br>

* **setGovernor**

  * Sets a new governor.<br>
  * function setGovernor(address _governor) external onlyGovernor<br>

* **setBlockReward<br>**
  * Sets a new block reward.
  *  function setBlockReward(uint256 reward) public onlyGovernor<br>


 * **addToBlacklist**
    * Adds addresses to the blacklist.
    * function addToBlacklist(address[] calldata addresses) external onlyGovernor

* **removeFromBlacklist**
  * Removes an address from the blacklist.
  * function removeFromBlacklist(address account) external onlyGovernor

## Modifiers
 * **onlyGovernor**
      * Restricts function access to only the governor.
      * modifier onlyGovernor()

## Internal Functions
   * _beforeTokenTransfer
   * Overrides the _beforeTokenTransfer function to include blacklisting logic and block reward distribution.
   * function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual
  
## Usage

1. **Deployment**:

   * Deploy the contract with the necessary parameters (cap, reward, owners, requiredConfirmations) using Remix or any other deployment tool.

2. **Minting Tokens**:

   * The governor can mint new tokens by calling mintWithMultiSig.

3. **Burning Tokens**:

   * The governor can burn tokens by calling burnWithMultiSig.

4. **Managing the Blacklist**:

   * The governor can add addresses to the blacklist using addToBlacklist and remove them using removeFromBlacklist.

5. **Changing the Governor**:

   * The current governor can appoint a new governor by calling setGovernor.

6. **Setting the Block Reward**:

   * The governor can update the block reward by calling setBlockReward.
  
## Multi-Signature Wallet
The multi-signature wallet ensures that minting and burning operations are secure and require multiple approvals. This reduces the risk of unauthorized token minting or burning.  

## Development and Testing
1. Compile the Contract:

      * Use Remix or another Solidity compiler to compile the contract.

2. Deploy the Contract:

      * Deploy the contract using Remix or another deployment tool. Make sure to pass the correct constructor parameters.
3. nteract with the Contract:

      * Use the deployed contract instance to interact with the functions defined in the contract. Ensure that the governor is the only one performing restricted actions.
  

## Conclusion
The GNairaToken smart contract provides a secure and efficient way to manage an ERC20 token with additional functionalities like minting, burning, blacklisting, and block rewards. The integration with a multi-signature wallet ensures that critical operations are secured and require multiple approvals.  

## Additional Resources
* [Solidity Documentation](https://docs.soliditylang.org/en/latest/index.html) <br>
* [Remix IDE](https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null)<br>
* [OpenZeppelin Contracts](https://www.openzeppelin.com/) <br>
* [Hardhat Documentation](https://hardhat.org/docs) <br>

## License
This project is licensed under the [MIT](https://opensource.org/license/mit) License. See the LICENSE file for more details.