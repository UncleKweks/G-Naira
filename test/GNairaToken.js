import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("GNairaToken contract", function () {
  let Token;
  let GNairaToken;
  let owner;
  let addr1;
  let addr2;
  let tokenCap = ethers.utils.parseEther("150000000");
  let tokenBlockReward = ethers.utils.parseEther("50");

  beforeEach(async function () {
    Token = await ethers.getContractFactory("GNairaToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    GNairaToken = await Token.deploy(tokenCap, tokenBlockReward);
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
      expect(cap).to.equal(tokenCap);
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await GNairaToken.blockReward();
      expect(blockReward).to.equal(tokenBlockReward);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await GNairaToken.transfer(addr1.address, ethers.utils.parseEther("50"));
      const addr1Balance = await GNairaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("50"));

      await GNairaToken.connect(addr1).transfer(
        addr2.address,
        ethers.utils.parseEther("50")
      );
      const addr2Balance = await GNairaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(ethers.utils.parseEther("50"));
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await GNairaToken.balanceOf(owner.address);

      await expect(
        GNairaToken.connect(addr1).transfer(
          owner.address,
          ethers.utils.parseEther("1")
        )
      ).to.be.revertedWith("ERC20InsufficientBalance"); // Update the expected error message

      expect(await GNairaToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await GNairaToken.balanceOf(owner.address);

      await GNairaToken.transfer(addr1.address, ethers.utils.parseEther("100"));
      await GNairaToken.transfer(addr2.address, ethers.utils.parseEther("50"));

      const finalOwnerBalance = await GNairaToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(
        initialOwnerBalance.sub(ethers.utils.parseEther("150"))
      );

      const addr1Balance = await GNairaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("100"));

      const addr2Balance = await GNairaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(ethers.utils.parseEther("50"));
    });
  });
});
