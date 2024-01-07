import { BigNumber, Contract, ethers } from "ethers";
import { Wallet } from "zksync-web3";
import * as dotenv from "dotenv";
import { Provider as ZkProvider, Contract as ZkContract } from "zksync-web3";
dotenv.config({ path: __dirname + '/.env' });
import SyncSwapStablePoolABI from './abis/syncswap/SyncSwapStablePool.json';
import SyncSwapClassicPoolFactoryABI from './abis/syncswap/SyncSwapStablePoolFactory.json';
import SyncSwapRouterABI from './abis/syncswap/SyncSwapRouter.json';
import UniswapV2Route02ABI from './abis/UniswapV2Route02.json';
import PancakeswapV3RouterABI from './abis/PancakeswapV3/router.json';

export const ZKSYNC_TESTNET_PROVIDER = 'https://testnet.era.zksync.dev';
export const ZKSYNC_MAINNET_PROVIDER = 'https://mainnet.era.zksync.io';
export const ETH_GOERLI_TESTNET_PROVIDER = 'https://goerli.blockpi.network/v1/rpc/public';
export const MY_ADDRESS = '0xf9F689367990f981BCD267FB1A4c45f63B6Bd7b1';
export const MY_ADDRESS_2 = '0xbC278D6583b97399014F3B3c64D295135660C629';
export const MY_ADDRESS_3 = '0xd40A929027c04CEecf78E034b7F828CF999EEC79';
export const MY_ADDRESS_4 = '0x6Ff7A794182D94d33bfcdEc7324fa16DA73F9db4';
export const MY_ADDRESS_7 = '0x390F8C4Cd9b057BA722dA945B3c58b4D66008361';
export const MAX_AMOUNT_APPROVE_TOKEN = '100000000000000000000000000000000';
export const zk_provider = new ethers.providers.JsonRpcProvider(ZKSYNC_TESTNET_PROVIDER)
export const zk_native_provider = new ZkProvider(ZKSYNC_TESTNET_PROVIDER);
export const eth_provider = new ethers.providers.JsonRpcProvider(ETH_GOERLI_TESTNET_PROVIDER)
// export const eth_provider = new ethers.providers.JsonRpcProvider(`https://crimson-winter-sun.quiknode.pro/${process.env.QUICKNODE_KEY}`)
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
import { TransactionRequest } from "zksync-web3/build/src/types";
import { ERC20 } from "./etherjs/erc20";

export const CONTRACTS_ADDRESS = {
  280: {
    SyncSwap: {
      SyncSwapVault: '0x4Ff94F499E1E69D687f3C3cE2CE93E717a0769F8',
      SyncSwapPoolMaster: '0x22E50b84ec0C362427B617dB3e33914E91Bf865a',
      SyncSwapClassicPoolFactory: '0xf2FD2bc2fBC12842aAb6FbB8b1159a6a83E72006',
      SyncSwapStablePoolFactory: '0xB6a70D6ab2dE494592546B696208aCEeC18D755f',
      SyncSwapRouter: '0xB3b7fCbb8Db37bC6f572634299A58f51622A847e',
    },
    Orbiter: {
      OrbiterMaker: '0xa08606A85bf58AFB7c3d464Fc6cF78A159933DD1',
    },
    PancakeswapV3: {
      PancakeswapV3Factory: '0x48e6Bc3f2546E63908cd09b04E2B3f78e57B6292',
      PancakeswapV3Router: '0x4DC9186c6C5F7dd430c7b6D8D513076637902241',
    },
  },
  324: {
    SyncSwap: {
      SyncSwapVault: '0x621425a1Ef6abE91058E9712575dcc4258F8d091',
      SyncSwapPoolMaster: '0xbB05918E9B4bA9Fe2c8384d223f0844867909Ffb',
      SyncSwapClassicPoolFactory: '0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb',
      SyncSwapStablePoolFactory: '0x5b9f21d407F35b10CbfDDca17D5D84b129356ea3',
      SyncSwapRouter: '0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295',
    },
    Orbiter: {
      OrbiterMaker: '0x80C67432656d59144cEFf962E8fAF8926599bCF8',
    },
    PancakeswapV3: {
      PancakeswapV3Factory: '0x1BB72E0CbbEA93c08f535fc7856E0338D7F7a8aB',
      PancakeswapV3Router: '0xf8b59f3c3Ab33200ec80a8A58b2aA5F5D2a8944C',
    },
  },
  1: {
    UniswapV2: {
      UniswapV2Router02: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    },
    Orbiter: {
      OrbiterMaker: '0x80C67432656d59144cEFf962E8fAF8926599bCF8',
    },
  },
  5: {
    UniswapV2: {
      UniswapV2Router02: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    },
    Orbiter: {
      OrbiterMaker: '0xa08606A85bf58AFB7c3d464Fc6cF78A159933DD1',
    },
  },
};

export const classicPoolFactory = async () => {
  const { chainId } = await zk_native_provider.getNetwork();
  const contractAddresses = CONTRACTS_ADDRESS[Number(chainId)].SyncSwap;
  return new ZkContract(
    contractAddresses.SyncSwapClassicPoolFactory,
    SyncSwapClassicPoolFactoryABI,
    zk_native_provider,
  );
}

export const stablePoolPoolFactory = async () => {
  const { chainId } = await zk_native_provider.getNetwork();
  const contractAddresses = CONTRACTS_ADDRESS[Number(chainId)].SyncSwap;
  return new ZkContract(
    contractAddresses.SyncSwapStablePoolFactory,
    SyncSwapStablePoolABI,
    zk_native_provider,
  );
}

export const syncSwapRouter = async () => {
  const { chainId } = await zk_native_provider.getNetwork();
  const contractAddresses = CONTRACTS_ADDRESS[Number(chainId)].SyncSwap;
  return new ZkContract(
    contractAddresses.SyncSwapRouter,
    SyncSwapRouterABI,
    zk_native_provider,
  );
}

export const uniswapRouter = async () => {
  const { chainId } = await eth_provider.getNetwork();
  const contractAddresses = CONTRACTS_ADDRESS[Number(chainId)].UniswapV2;
  return new ZkContract(
    contractAddresses.UniswapV2Router02,
    UniswapV2Route02ABI['abi'],
    eth_provider,
  );
}

export const pancakeswapZkRouter = async () => {
  const { chainId } = await zk_native_provider.getNetwork();
  const contractAddresses = CONTRACTS_ADDRESS[Number(chainId)].PancakeswapV3;
  return new ZkContract(
    contractAddresses.PancakeswapV3Router,
    PancakeswapV3RouterABI,
    zk_native_provider,
  );
}


export enum ELayer {
  ETHEREUM,
  ZKSYNC
}
export const convertAmount = async (
  amount: string,
  inputTokenAddress: string,
  layer: ELayer = ELayer.ZKSYNC,
): Promise<BigNumber> => {
  const erc20 = new ERC20(inputTokenAddress, layer === ELayer.ZKSYNC ? zk_native_provider : eth_provider);
  const decimals = await erc20.getDecimals();
  const modifiedAmount = Number(amount).toFixed(decimals);
  return ethers.utils.parseUnits(modifiedAmount, decimals);
};


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


export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
