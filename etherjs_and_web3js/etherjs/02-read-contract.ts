import { ethers } from "ethers";
import { MY_ADDRESS, MY_ADDRESS_2, TDS_TOKEN_ADDRESS_ZK_TESTNET, USDC_TOKEN_ADDRESS_ZK_TESTNET, estimateGas, getContract, myWallet, zk_provider } from '../constant';
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

// const contract = getContract(TDS_TOKEN_ADDRESS_ZK_TESTNET, TDSJson.abi);
const contract = getContract(USDC_TOKEN_ADDRESS_ZK_TESTNET, USDCJson.abi);

(async () => {
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

  // ESTIMATE GAS TRANSFER
  const constractWithWallet = contract.connect(myWallet);
  const gsE = await estimateGas(constractWithWallet, 'transfer', [MY_ADDRESS_2, 10000]);
  console.log("🚀 ~ file: 02-read-contract.ts:42 ~ gsE:", `${gsE} ETH`)
})()