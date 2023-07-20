import { Wallet, types, utils, Contract } from "zksync-web3";
import { MY_ADDRESS, zk_native_provider, eth_provider, WEI6, convertAmount, stablePoolPoolFactory, classicPoolFactory, syncSwapRouter, MY_ADDRESS_7 } from '../constant';
import { BigNumber, PopulatedTransaction, VoidSigner, ethers } from "ethers";
import ZksyncAbi from '../abis/Zksync.json';
import * as dotenv from "dotenv";
import { ETH_ADDRESS } from "zksync-web3/build/src/utils";
import SyncSwapClassicPoolABI from '../abis/syncswap/SyncSwapClassicPool.json';
import { defaultAbiCoder } from "ethers/lib/utils";
import { TOKENS } from "../token";
import { toStringTransaction } from "../utils";
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


const buildTransaction = async (inputTokenAddress: string,
  outputTokenAddress: string,
  amount: string,
  walletAddress: string,
  options?: {},
) => {
  const convertedAmount = await convertAmount(amount, inputTokenAddress);
  console.log("🚀 ~ file: 09-swap-eth-to-usdc-zk.ts:80 ~ convertedAmount:", convertedAmount)
  const { poolAddress } = await getPoolInformationFromContract(
    inputTokenAddress,
    outputTokenAddress,
  );
  // Constructs the swap paths with steps.
  // Determine withdraw mode, to withdraw native ETH or wETH on last step.
  // 0 - vault internal transfer
  // 1 - withdraw and unwrap to native ETH
  // 2 - withdraw and wrap to wETH
  const withdrawMode = 1; // 1 or 2 to withdraw to user's wallet

  const swapData: string = defaultAbiCoder.encode(
    ['address', 'address', 'uint8'],
    [inputTokenAddress, walletAddress, withdrawMode], // tokenIn, to, withdraw mode
  );

  // We have only 1 step.
  const steps = [
    {
      pool: poolAddress,
      data: swapData,
      callback: ETH_ADDRESS, // we don't have a callback
      callbackData: '0x',
    },
  ];

  // If we want to use the native ETH as the input token,
  // the `tokenIn` on path should be replaced with the zero address.
  // Note: however we still have to encode the wETH address to pool's swap data.
  // const nativeETHAddress = ZERO_ADDRESS;
  // We have only 1 path.
  const isNative = TOKENS[(await zk_native_provider.getNetwork()).chainId].WETH.address == inputTokenAddress;
  const inputToken = isNative ? ETH_ADDRESS : inputTokenAddress;

  const paths = [
    {
      steps: steps,
      tokenIn: inputToken,
      amountIn: convertedAmount,
    },
  ];

  // Note: checks approval for ERC20 tokens.
  // The syncSwapRouter will handle the deposit to the pool's vault account.
  const response = await (await syncSwapRouter()).populateTransaction.swap(
    paths, // paths
    0, // amountOutMin // Note: ensures slippage here
    BigNumber.from(Math.floor(Date.now() / 1000)).add(1800), // deadline // 30 minutes
    { value: isNative ? convertedAmount : '0' },
  );

  const voidSigner = new VoidSigner(walletAddress, zk_native_provider);
  return toStringTransaction(await voidSigner.populateTransaction(response));
};

const signTransaction = async (transaction: any, pk: string) => {
  const walletWeb3 = new Wallet(pk);
  return await walletWeb3.signTransaction(transaction);
}

(async () => {
  // const transaction = await buildTransaction(
  //   TOKENS[(await zk_native_provider.getNetwork()).chainId].USDC.address,
  //   TOKENS[(await zk_native_provider.getNetwork()).chainId].zkUSD.address,
  //   '3173158314771015138906643999.231532',
  //   MY_ADDRESS,
  // );

  const transaction = await buildTransaction(
    TOKENS[(await zk_native_provider.getNetwork()).chainId].WETH.address,
    TOKENS[(await zk_native_provider.getNetwork()).chainId].USDC.address,
    '0.01',
    MY_ADDRESS,
  );

  const signedTransaction = await signTransaction(transaction, process.env.PRIVATE_KEY as string);
  const trx = await zk_native_provider.sendTransaction(signedTransaction);
  const trxReceip = await trx.wait(1);

  const gasFee = Number(
    ethers.utils.formatEther(
      trxReceip.gasUsed.mul(trxReceip.effectiveGasPrice),
    ),
  )
  const feeUSD = Number(await zk_native_provider.getTokenPrice(ETH_ADDRESS)) * gasFee
  console.log("🚀 ~ file: 09-swap-eth-to-usdc-zk.ts:155 ~ trxReceip:", trxReceip, `${gasFee} ETH ~ ${feeUSD}`)

})()