import { ethers } from "ethers";
import { MY_ADDRESS, zk_native_provider, zk_provider } from '../constant';
import { ETH_ADDRESS } from "zksync-web3/build/src/utils";


(async () => {
  const balance = await zk_provider.getBalance(MY_ADDRESS)
  console.log(`\nETH Balance of ${MY_ADDRESS} --> ${ethers.utils.formatEther(balance)} ETH\n`)

  const tokenPrice = await zk_native_provider.getTokenPrice(ETH_ADDRESS)
  console.log("🚀 ~ file: 01-account.ts:10 ~ tokenPrice:", tokenPrice);
})()
