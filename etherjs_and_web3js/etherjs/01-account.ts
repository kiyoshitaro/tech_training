import { ethers } from "ethers";
import { MY_ADDRESS, zk_native_provider, zk_provider } from '../constant';


(async () => {
  const balance = await zk_provider.getBalance(MY_ADDRESS)
  console.log(`\nETH Balance of ${MY_ADDRESS} --> ${ethers.utils.formatEther(balance)} ETH\n`)

  const tokenPrice = await zk_native_provider.getTokenPrice('0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4')
  console.log("🚀 ~ file: 01-account.ts:10 ~ tokenPrice:", tokenPrice)
})()
