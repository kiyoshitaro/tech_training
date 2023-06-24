import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // const token = await ethers.deployContract("Tardis");
  // token.estimateGas

  const Tardis = await ethers.getContractFactory("Tardis");
  const tardis = await Tardis.deploy();
  await tardis.deployed();

  console.log("Token address:", tardis.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
