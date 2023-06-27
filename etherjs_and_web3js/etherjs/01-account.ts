import { ethers } from "ethers";
import { MY_ADDRESS, zk_provider } from '../constant';


(async () => {
  const balance = await zk_provider.getBalance(MY_ADDRESS)
  console.log(`\nETH Balance of ${MY_ADDRESS} --> ${ethers.utils.formatEther(balance)} ETH\n`)
})()
