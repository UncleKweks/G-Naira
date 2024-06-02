require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const GNairaToken = await ethers.getContractFactory("GNairaToken");
  const tokenCap = ethers.utils.parseUnits("10000000", 18);
  const tokenBlockReward = ethers.utils.parseUnits("50", 18);

  const owners = [
    "0x51C78a61C4CF196c7cb46CF5170728a571718099",
    "0x66020133CD2812B66459882E01003CfBa31189B4",
    "0xC4b033d10Ab097cb12A872398E019499393eE34b",
  ];
  const requiredConfirmations = 2;

  console.log("Token Cap:", tokenCap.toString());
  console.log("Token Block Reward:", tokenBlockReward.toString());
  console.log("Owners:", owners);
  console.log("Required Confirmations:", requiredConfirmations);

  const gNairaToken = await GNairaToken.deploy(
    tokenCap,
    tokenBlockReward,
    owners,
    requiredConfirmations
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
    console.error("Deployment failed:", error);
    process.exit(1);
  });
