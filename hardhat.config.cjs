require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { ALCHEMY_API_KEY, DEPLOYER_PRIVATE_KEY } = process.env;

if (!ALCHEMY_API_KEY || !DEPLOYER_PRIVATE_KEY) {
  throw new Error(
    "Please set your ALCHEMY_API_KEY and DEPLOYER_PRIVATE_KEY in a .env file"
  );
}

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
    },
  },
};
