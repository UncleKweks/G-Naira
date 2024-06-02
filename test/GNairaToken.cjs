require("dotenv").config();
const { ethers } = require("hardhat");

async function deployMultiSigWallet() {
  // Deploy or retrieve the MultiSigWallet address
  // Implement your logic here
}

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const GNairaToken = await ethers.getContractFactory("GNairaToken");
  const tokenCap = ethers.utils.parseUnits("10000000", 18);
  const tokenBlockReward = ethers.utils.parseUnits("50", 18);
  const multiSigWalletAddress = await deployMultiSigWallet();

  const gNairaToken = await GNairaToken.deploy(
    tokenCap,
    tokenBlockReward,
    multiSigWalletAddress
  );
  await gNairaToken.deployed();

  console.log("GNairaToken deployed to:", gNairaToken.address);

  const totalSupply = await gNairaToken.totalSupply();
  console.log("Total Supply:", ethers.utils.formatUnits(totalSupply, 18));

  const deployerBalance = await gNairaToken.balanceOf(deployer.address);
  console.log(
    "Deployer's token balance:",
    ethers.utils.formatUnits(deployerBalance, 18)
  );

  return gNairaToken.address;
}

main()
  .then(async (GNairaTokenAddress) => {
    console.log("Deployment successful");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
