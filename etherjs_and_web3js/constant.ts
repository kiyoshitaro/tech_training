import { BigNumber, Contract, ethers } from "ethers";
import { Wallet } from "zksync-web3";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

export const ZKSYNC_TESTNET_PROVIDER = 'https://testnet.era.zksync.dev';
export const ETH_GOERLI_TESTNET_PROVIDER = 'https://eth-goerli.g.alchemy.com/v2/demo';
export const MY_ADDRESS = '0xf9F689367990f981BCD267FB1A4c45f63B6Bd7b1';
export const MY_ADDRESS_2 = '0xbC278D6583b97399014F3B3c64D295135660C629';
export const MY_ADDRESS_3 = '0xd40A929027c04CEecf78E034b7F828CF999EEC79';
export const MY_ADDRESS_4 = '0x6Ff7A794182D94d33bfcdEc7324fa16DA73F9db4';
export const zk_provider = new ethers.providers.JsonRpcProvider(ZKSYNC_TESTNET_PROVIDER)
export const eth_provider = new ethers.providers.JsonRpcProvider(ETH_GOERLI_TESTNET_PROVIDER)
export const TDS_TOKEN_ADDRESS_ZK_TESTNET = '0x09825c8C53Ac725A526360a33Cb0260e83c598F5';
export const USDC_TOKEN_ADDRESS_ZK_TESTNET = '0x0faF6df7054946141266420b43783387A78d82A9'
export const ZKUSDC_TOKEN_ADDRESS_ZK_TESTNET = '0xA4D8FECEf6C4f77bDe74eDBc7931de2e47828B3F'
export const myWallet = new ethers.Wallet(process.env.PRIVATE_KEY, zk_provider);
export const DECIMALS = 6;
export const WEI6 = BigNumber.from(10).pow(DECIMALS);
export const getContract = (contractAddress: string, abi: any) => {
  return new ethers.Contract(contractAddress, abi, zk_provider);
}
import {
  PopulatedTransaction,
} from 'ethers';
export const estimateGas = async (constractWithWallet: Contract, methodName, methodParams) => {

  // Create a contract instance
  // const contract = new ethers.Contract(contractAddress, abi, zk_provider);
  // const constractWithWallet = contract.connect(myWallet);

  // // Get the method's interface
  // const methodInterface = new ethers.utils.Interface(abi);
  // const methodData = methodInterface.encodeFunctionData(methodName, methodParams);

  // Estimate gas for the method call
  try {
    // NOTE: wrong, need to multiple gasPrice
    const gasEstimate = await constractWithWallet.estimateGas[methodName](...methodParams);
    return ethers.utils.formatEther(gasEstimate);
  } catch (error) {
    console.error(`Failed to estimate gas for method "${methodName}":`, error);
    throw error;
  }
}

export const listenForTransactions = (walletAddress: string) => {
  zk_provider.on('block', async (blockNumber) => {
    console.log("🚀 ~ file: test.ts:19 ~ provider.on ~ blockNumber:", blockNumber)
    try {
      const block = await zk_provider.getBlock(blockNumber);
      if (block) {
        for (const transactionHash of block.transactions) {
          const transaction = await zk_provider.getTransaction(transactionHash);
          if (transaction.to === walletAddress) {
            console.log(`Incoming transaction detected: from ${transaction.from} to ${transaction.to}: ${ethers.utils.formatEther(transaction.value)} ETH`);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}
