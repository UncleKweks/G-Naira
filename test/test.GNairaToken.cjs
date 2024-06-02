const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GNairaToken contract", function () {
  let GNairaToken;
  let gnairaToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let tokenCap = ethers.utils.parseUnits("15000000", 18);
  let tokenBlockReward = ethers.utils.parseUnits("40", 18);

  beforeEach(async function () {
    GNairaToken = await ethers.getContractFactory("GNairaToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    tokenCap = ethers.utils.parseUnits("10000000", 18);
    tokenBlockReward = ethers.utils.parseUnits("50", 18);

    const owners = [owner.address, addr1.address, addr2.address];
    const requiredConfirmations = 2;

    gnairaToken = await GNairaToken.deploy(
      tokenCap,
      tokenBlockReward,
      owners,
      requiredConfirmations
    );
    await gnairaToken.deployed();
  });

  it("Should set the right owner", async function () {
    expect(await gnairaToken.owner()).to.equal(owner.address);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await gnairaToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await gnairaToken.balanceOf(owner.address);
      expect(await gnairaToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await gnairaToken.cap();
      expect(cap.toString()).to.equal(tokenCap.toString());
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await gnairaToken.blockReward();
      expect(blockReward.toString()).to.equal(tokenBlockReward.toString());
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await gnairaToken.transfer(addr1.address, 50);
      const addr1Balance = await gnairaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await gnairaToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await gnairaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should allow the owner to set the governor address", async function () {
      const newGovernor = addr1.address;

      await gnairaToken.connect(owner).setGovernor(newGovernor);

      expect(await gnairaToken.governor()).to.equal(newGovernor);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await gnairaToken.balanceOf(owner.address);

      await expect(
        gnairaToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      expect(await gnairaToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await gnairaToken.balanceOf(owner.address);

      await gnairaToken.transfer(addr1.address, 100);
      await gnairaToken.transfer(addr2.address, 50);

      const finalOwnerBalance = await gnairaToken.balanceOf(owner.address);
      expect(finalOwnerBalance.eq(initialOwnerBalance.sub(150))).to.be.true;

      const addr1Balance = await gnairaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await gnairaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
