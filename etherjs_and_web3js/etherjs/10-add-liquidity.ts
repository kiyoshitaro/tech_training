import { Wallet,  Contract } from "zksync-web3";
import { MY_ADDRESS, zk_native_provider, WEI6, convertAmount, stablePoolPoolFactory, classicPoolFactory, router } from '../constant';
import { BigNumber, VoidSigner, ethers } from "ethers";
import * as dotenv from "dotenv";
import { ETH_ADDRESS } from "zksync-web3/build/src/utils";
import SyncSwapClassicPoolABI from '../abis/syncswap/SyncSwapClassicPool.json';
import { defaultAbiCoder } from "ethers/lib/utils";
import { TOKENS } from "../token";
import { toStringTransaction } from "../utils";
import { ERC20 } from "./erc20";
dotenv.config({ path: __dirname + '../.env' });

const getPoolInformationFromContract = async (
  inputTokenAddress: string,
  outputTokenAddress: string,
): Promise<{
  tokenA: string;
  tokenB: string;
  reserveA: BigNumber;
  reserveB: BigNumber;
  pool: Contract;
  poolAddress: string;
}> => {
  let poolAddress: string;
  //TODO: temporary code
  if (
    inputTokenAddress == '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4'
  ) {
    poolAddress = await (await stablePoolPoolFactory()).getPool(
      inputTokenAddress,
      outputTokenAddress,
    );
  } else {
    poolAddress = await (await classicPoolFactory()).getPool(
      inputTokenAddress,
      outputTokenAddress,
    );
  }

  // Checks whether the pool exists.
  if (poolAddress === ETH_ADDRESS) {
    throw Error('Pool not exists');
  }
  // Gets the reserves of the pool.
  const pool: Contract = new Contract(
    poolAddress,
    SyncSwapClassicPoolABI,
    zk_native_provider,
  );
  const reserves: [BigNumber, BigNumber] = await pool.getReserves();
  // Sorts the reserves by token addresses.
  const [reserveA, reserveB] =
    inputTokenAddress < outputTokenAddress
      ? reserves
      : [reserves[1], reserves[0]];

  const [tokenA, tokenB] =
    inputTokenAddress < outputTokenAddress
      ? [inputTokenAddress, outputTokenAddress]
      : [outputTokenAddress, inputTokenAddress];

  return {
    tokenA,
    tokenB,
    reserveA,
    reserveB,
    pool,
    poolAddress,
  };
};


const buildTransaction = async (
  tokenAAddress: string,
  tokenBAddress: string,
  tokenAAmount: string,
  walletAddress: string,
) => {
  const convertedAmount = await convertAmount(tokenAAmount, tokenAAddress);
  const { reserveA, reserveB, poolAddress, tokenA, tokenB } = await getPoolInformationFromContract(tokenAAddress, tokenBAddress);

  let amountA: BigNumber;
  let amountB: BigNumber;

  if (tokenAAddress == tokenA) {
    amountA = convertedAmount;
    amountB = convertedAmount.mul(reserveB).div(reserveA);
  } else {
    amountA = convertedAmount.mul(reserveA).div(reserveB);
    amountB = convertedAmount;
  }

  const tokenAContract = new ERC20(tokenA, zk_native_provider);
  const tokenBContract = new ERC20(tokenB, zk_native_provider);

  const balanceA = await tokenAContract.getBalance(walletAddress);
  const balanceB = await tokenBContract.getBalance(walletAddress);

  if (amountA.gt(balanceA)) {
    throw new Error('Insufficient Balance Token: ' + tokenA);
  }

  if (amountB.gt(balanceB)) {
    throw new Error('Insufficient Balance Token: ' + tokenB);
  }

  const encodedRecipient = defaultAbiCoder.encode(
    ['address'],
    [walletAddress],
  );
  const inputs = [
    {
      token: tokenA,
      amount: amountA,
    },
    {
      token: tokenB,
      amount: amountB,
    },
  ];
  const response = await (await router()).populateTransaction.addLiquidity2(
    poolAddress, // pool
    inputs,
    encodedRecipient,
    ethers.constants.Zero,
    ETH_ADDRESS, // we don't have a callback
    '0x',
    // {estimateGas: ethers.constants.Zero}
  );
  const voidSigner = new VoidSigner(walletAddress, zk_native_provider);
  return toStringTransaction(await voidSigner.populateTransaction(response));
};

const signTransaction = async (transaction: any, pk: string) => {
  const walletWeb3 = new Wallet(pk);
  return await walletWeb3.signTransaction(transaction);
}

(async () => {
  const transaction = await buildTransaction(
    TOKENS[(await zk_native_provider.getNetwork()).chainId].zkUSD.address,
    TOKENS[(await zk_native_provider.getNetwork()).chainId].USDC.address,
    '300',
    MY_ADDRESS,
  );

  const signedTransaction = await signTransaction(transaction, process.env.PRIVATE_KEY as string);
  const trx = await zk_native_provider.sendTransaction(signedTransaction);
  const trxReceip = await trx.wait(1);
  const gasFee = Number(
    ethers.utils.formatEther(
      trxReceip.gasUsed.mul(trxReceip.effectiveGasPrice).mul(WEI6),
    ),
  )
  console.log("🚀 ~ file: 09-swap-eth-to-usdc-zk.ts:155 ~ trxReceip:", trxReceip, `$${gasFee}`)
})()