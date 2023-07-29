import { Wallet } from "zksync-web3";
import { MY_ADDRESS, zk_native_provider, WEI6, eth_provider, uniswapRouter, MAX_AMOUNT_APPROVE_TOKEN, getRandomInt } from '../constant';
import { BigNumber, VoidSigner, ethers } from "ethers";
import * as dotenv from "dotenv";
import { TOKENS } from "../token";
import { toStringTransaction } from "../utils";
import { ERC20 } from "./erc20";
import { ETH_ADDRESS } from "zksync-web3/build/src/utils";
dotenv.config({ path: __dirname + '../.env' });

const buildTransaction = async (
  tokenAAddress: string,
  tokenBAddress: string,
  amountIn: BigNumber,
  amountOutMin: BigNumber,
  walletAddress: string,
  options?: {
    gasLimit?: BigNumber;
    maxPriorityFeePerGas?: BigNumber;
  },
) => {
  let response: any;

  const WETH = TOKENS[(await eth_provider.getNetwork()).chainId].WETH.address;
  let deadline = BigNumber.from(Math.floor(Date.now() / 1000) + 70);
  console.log("🚀 ~ file: 11-swap-in-eth-uniswap.ts:21 ~ deadline:", deadline.toString())

  if (tokenAAddress != WETH && tokenBAddress != WETH) {
    throw new Error('Not support token');
  }
  if (tokenAAddress == WETH) {
    response =
      await (await uniswapRouter()).populateTransaction.swapExactETHForTokensSupportingFeeOnTransferTokens(
        amountOutMin,
        [WETH, tokenBAddress],
        walletAddress,
        deadline,
        { value: amountIn },
      );
  }
  if (tokenBAddress == WETH) {
    response =
      await (await uniswapRouter()).populateTransaction.swapExactTokensForETHSupportingFeeOnTransferTokens(
        // await router.swapExactTokensForETH(
        amountIn,
        amountOutMin,
        [tokenAAddress, WETH],
        walletAddress,
        deadline,
      );
  }
  console.log("🚀 ~ file: 11-swap-in-eth-uniswap.ts:28 ~ response:", toStringTransaction(response))
  if(options?.gasLimit) response.gasLimit = options?.gasLimit;
if(options?.maxPriorityFeePerGas) response.maxPriorityFeePerGas = options?.maxPriorityFeePerGas
  const voidSigner = new VoidSigner(walletAddress, eth_provider);
  return toStringTransaction(await voidSigner.populateTransaction(response));
};
const signTransaction = async (transaction: any, pk: string) => {
  const walletWeb3 = new Wallet(pk);
  return await walletWeb3.signTransaction(transaction);
}

const approveToken = async (
  tokenAddress: string,
  spender: string,
  amount: string,
  walletAddress: string,
) => {
  try {
    const erc20 = new ERC20(tokenAddress, eth_provider);
    const allowance = await erc20.allowance(walletAddress, spender);
    console.log("🚀 ~ file: 11-swap-in-eth-uniswap.ts:63 ~ allowance:", allowance)
    if (!(await erc20.isValidAllowance(amount, allowance))) {
      //Approve token;
      const transaction = await erc20.approve(
        walletAddress,
        spender,
        MAX_AMOUNT_APPROVE_TOKEN,
      );
      console.log("🚀 ~ file: 11-swap-in-eth-uniswap.ts:70 ~ transaction:", transaction)

      const signedTransaction = await signTransaction(transaction, process.env.PRIVATE_KEY as string);
      const trx = await eth_provider.sendTransaction(signedTransaction);
      console.log('Sending approve');
      return await trx.wait();
    }
  } catch (e) {
    throw e;
  }
};

const approveTokenAndSlippage = async (
  inputTokenAddress: string,
  outputTokenAddress: string,
  amountInput: string,
  slippage: number,
  address: string,
  options?: {
    gasLimit?: BigNumber;
    maxPriorityFeePerGas?: BigNumber;
  },
) => {
  const WETH = TOKENS[(await eth_provider.getNetwork()).chainId].WETH.address;
  console.log("🚀 ~ file: 11-swap-in-eth-uniswap.ts:89 ~ WETH:", WETH.toString())
  if (inputTokenAddress != WETH && outputTokenAddress != WETH) {
    throw new Error('Only support ETH');
  }
  if (inputTokenAddress != WETH) {
    await approveToken(
      inputTokenAddress,
      (await uniswapRouter()).address,
      amountInput,
      address,
    );
  }

  const erc20 = new ERC20(inputTokenAddress, eth_provider);
  const path = [inputTokenAddress, outputTokenAddress];
  const amountIn = await erc20.parseValue(amountInput);
  const amountOut = (await (await uniswapRouter()).getAmountsOut(amountIn, path))[
    path.length - 1
  ];
  const slippagePercent = Number(Number(slippage).toFixed(1)) * 10;
  const amountOutMin = amountOut.mul(1000 - slippagePercent).div(1000);
  console.log("🚀 ~ file: 11-swap-in-eth-uniswap.ts:126 ~ amountOutMin:", amountOutMin.toString())
  return await buildTransaction(
    inputTokenAddress,
    outputTokenAddress,
    amountIn,
    amountOutMin,
    address,
    options
  );
}

(async () => {
  // const transaction = await approveTokenAndSlippage(
  //   TOKENS[(await eth_provider.getNetwork()).chainId].WETH.address,
  //   TOKENS[(await eth_provider.getNetwork()).chainId].TKN.address,
  //   '0.04',
  //   10,
  //   MY_ADDRESS,
  //   {
  //     gasLimit: BigNumber.from(getRandomInt(550000, 650000)),
  //     maxPriorityFeePerGas: BigNumber.from(getRandomInt(1500000000, 2000000000))
  //   }
  //   );



  // const transaction = await approveTokenAndSlippage(
  //   TOKENS[(await eth_provider.getNetwork()).chainId].TKN.address,
  //   TOKENS[(await eth_provider.getNetwork()).chainId].WETH.address,
  //   '80000',
  //   50,
  //   MY_ADDRESS,
  //   {
  //     gasLimit: BigNumber.from(getRandomInt(550000, 650000)),
  //     maxPriorityFeePerGas: BigNumber.from(getRandomInt(1500000000, 2000000000))
  //   }
  // );


  // const transaction = await approveTokenAndSlippage(
  //   TOKENS[(await eth_provider.getNetwork()).chainId].WETH.address,
  //   '0xc405a68Be0967D0002DbbeB8De0084F24086D36c',
  //   '0.1',
  //   30,
  //   '0xbC278D6583b97399014F3B3c64D295135660C629',
  // );

  const transaction = await approveTokenAndSlippage(
    TOKENS[(await eth_provider.getNetwork()).chainId].WETH.address,
    '0xb478c6245e3d85d6ec3486b62ea872128d562541',
    '0.1',
    10,
    MY_ADDRESS,
  );

  // const transaction = await approveTokenAndSlippage(
  //   '0xc405a68Be0967D0002DbbeB8De0084F24086D36c',
  //   TOKENS[(await eth_provider.getNetwork()).chainId].WETH.address,
  //   '80000',
  //   50,
  //   '0xbC278D6583b97399014F3B3c64D295135660C629',
  // );


  console.log("🚀 ~ file: 11-swap-in-eth-uniswap.ts:133 ~ transaction:", transaction)

  const signedTransaction = await signTransaction(transaction, process.env.PRIVATE_KEY as string);
  console.log("🚀 ~ file: 11-swap-in-eth-uniswap.ts:136 ~ signedTransaction:", signedTransaction)
  const trx = await eth_provider.sendTransaction(signedTransaction);
  const trxReceip = await trx.wait(1);
  const gasFee = Number(
    ethers.utils.formatEther(
      trxReceip.gasUsed.mul(trxReceip.effectiveGasPrice),
    ),
  )
  const feeUSD = Number(await zk_native_provider.getTokenPrice(ETH_ADDRESS)) * gasFee
  console.log("🚀 ~ file: 11-swap-in-eth-uniswap.ts:138 ~ gasFee:", trxReceip.transactionHash, trxReceip.blockHash, `${gasFee} ETH ~ $${feeUSD}`)
})()