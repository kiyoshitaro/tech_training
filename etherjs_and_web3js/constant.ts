import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

export const ZKSYNC_TESTNET_PROVIDER = 'https://testnet.era.zksync.dev';
export const MY_ADDRESS = '0xf9F689367990f981BCD267FB1A4c45f63B6Bd7b1';
export const MY_ADDRESS_2 = '0xbC278D6583b97399014F3B3c64D295135660C629';
export const zk_provider = new ethers.providers.JsonRpcProvider(ZKSYNC_TESTNET_PROVIDER)
export const TDS_TOKEN_ADDRESS_ZK_TESTNET = '0x09825c8C53Ac725A526360a33Cb0260e83c598F5';
export const USDC_TOKEN_ADDRESS_ZK_TESTNET = '0x0faF6df7054946141266420b43783387A78d82A9'
export const myWallet = new ethers.Wallet(process.env.PRIVATE_KEY, zk_provider)
export const getContract = (contractAddress: string, abi: any) => {
  return new ethers.Contract(contractAddress, abi, zk_provider);
}