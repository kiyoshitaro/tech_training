import { ethers } from "ethers";
import { MY_ADDRESS, TDS_TOKEN_ADDRESS_ZK_TESTNET, USDC_TOKEN_ADDRESS_ZK_TESTNET, zk_provider } from '../constant';
import TDSJson from "../abis/Tardis.json";
import USDCJson from "../abis/ERC20.json";

const getUSDCBalance = async (accountAddress: string) => {
  try {
    const usdcContract = new ethers.Contract(USDC_TOKEN_ADDRESS_ZK_TESTNET, USDCJson.abi, zk_provider);
    const balance = await usdcContract.balanceOf(accountAddress);
    return ethers.utils.formatUnits(balance, 6);
  } catch (error) {
    console.error('Error:', error);
  }
}

const getTardisBalance = async (accountAddress: string) => {
  try {
    const usdcContract = new ethers.Contract(TDS_TOKEN_ADDRESS_ZK_TESTNET, TDSJson.abi, zk_provider);
    const balance = await usdcContract.balanceOf(accountAddress);
    return ethers.utils.formatUnits(balance, 6);
  } catch (error) {
    console.error('Error:', error);
  }
}
(async () => {
  const contract = new ethers.Contract(TDS_TOKEN_ADDRESS_ZK_TESTNET, TDSJson.abi, zk_provider)
  const name = await contract.name()
  const symbol = await contract.symbol()
  const totalSupply = await contract.totalSupply()
  console.log(`\nReading from ${TDS_TOKEN_ADDRESS_ZK_TESTNET}\n`)
  console.log(`Name: ${name}`)
  console.log(`Symbol: ${symbol}`)
  console.log(`Total Supply: ${totalSupply}\n`)

  const usdcBalance = await getUSDCBalance(MY_ADDRESS);
  console.log(`\nUSDC Balance of ${MY_ADDRESS} --> ${usdcBalance} USDC\n`);

  const tardisBalance = await getTardisBalance(MY_ADDRESS);
  console.log(`\nTDS Balance of ${MY_ADDRESS} --> ${tardisBalance} TDS\n`);
})()