const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GNairaToken contract", function () {
  let Token;
  let GNairaToken;
  let owner;
  let addr1;
  let addr2;
  const tokenCap = ethers.utils.parseUnits("15000000", 18);
  const tokenBlockReward = ethers.utils.parseUnits("40", 18);

  beforeEach(async function () {
    Token = await ethers.getContractFactory("GNairaToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    GNairaToken = await Token.deploy(tokenCap, tokenBlockReward);
    await GNairaToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await GNairaToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await GNairaToken.balanceOf(owner.address);
      expect(await GNairaToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await GNairaToken.cap();
      console.log("Expected Cap:", tokenCap.toString());
      console.log("Actual Cap:", cap.toString());
      expect(cap.toString()).to.equal(tokenCap.toString());
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await GNairaToken.blockReward();
      console.log("Expected Block Reward:", tokenBlockReward.toString());
      console.log("Actual Block Reward:", blockReward.toString());
      expect(blockReward.toString()).to.equal(tokenBlockReward.toString());
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await GNairaToken.transfer(addr1.address, 50);
      const addr1Balance = await GNairaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await GNairaToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await GNairaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await GNairaToken.balanceOf(owner.address);

      await expect(
        GNairaToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20InsufficientBalance");

      expect(await GNairaToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await GNairaToken.balanceOf(owner.address);

      await GNairaToken.transfer(addr1.address, 100);

      await GNairaToken.transfer(addr2.address, 50);

      const finalOwnerBalance = await GNairaToken.balanceOf(owner.address);
      expect(finalOwnerBalance.eq(initialOwnerBalance.sub(150))).to.be.true;

      const addr1Balance = await GNairaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await GNairaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
