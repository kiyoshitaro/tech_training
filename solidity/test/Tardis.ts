import type * as ethersjs from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
//   loadFixture,
// } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
describe("Token contract", function () {
  describe("Deployment", function () {
    let hardhatToken: ethersjs.Contract;
    let owner: SignerWithAddress, addr1: SignerWithAddress, addr2: SignerWithAddress;
    beforeEach(async () => {
      [owner, addr1, addr2] = await ethers.getSigners();
      hardhatToken = await ethers.deployContract("Tardis");
    });
    it("Should set the right owner", async function () {
      // const [owner] = await ethers.getSigners();
      // const hardhatToken = await ethers.deployContract("Tardis");

      // This test expects the owner variable stored in the contract to be
      // equal to our Signer's owner.
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    let hardhatToken: ethersjs.Contract;
    let owner: SignerWithAddress, addr1: SignerWithAddress, addr2: SignerWithAddress;
    beforeEach(async () => {
      [owner, addr1, addr2] = await ethers.getSigners();
      hardhatToken = await ethers.deployContract("Tardis");
    });
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await expect(
        hardhatToken.transfer(addr1.address, 50)
      ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(
        hardhatToken.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
    });

    it("Should emit Transfer events", async function () {
      // Transfer 50 tokens from owner to addr1
      await expect(hardhatToken.transfer(addr1.address, 50))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(owner.address, addr1.address, 50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(addr1.address, addr2.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      // Try to send 1 token from addr1 (0 tokens) to owner.
      // `require` will evaluate false and revert the transaction.
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });

});
