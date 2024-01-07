import { Wallet } from "zksync-web3";
import { MY_ADDRESS, zk_native_provider, convertAmount, eth_provider, CONTRACTS_ADDRESS, ELayer, pancakeswapZkRouter } from '../constant';
import { BigNumber, VoidSigner, ethers } from "ethers";
import * as dotenv from "dotenv";
import { ETH_ADDRESS } from "zksync-web3/build/src/utils";
import { TOKENS } from "../token";
import { toStringTransaction } from "../utils";
dotenv.config({ path: __dirname + '../.env' });

const buildTransaction = async (
  inputTokenAddress: string,
  outputTokenAddress: string,
  amount: string,
  walletAddress: string,
  slippage = 10,
  options?: {},) => {
    const amountIn = await convertAmount(amount, inputTokenAddress);
    let response: any;
    const WETH = TOKENS[(await zk_native_provider.getNetwork()).chainId].WETH.address;

    const ETH = TOKENS[(await zk_native_provider.getNetwork()).chainId]?.ETH?.address;

    if (inputTokenAddress == ETH) {
      inputTokenAddress = WETH;
    }
    if (outputTokenAddress == ETH) {
      outputTokenAddress = WETH;
    }

    const deadline = BigNumber.from(Math.floor(Date.now() / 1000) + 70);

    // const amountOut = (await (await pancakeswapZkRouter()).getAmountsOut(amountIn, path))[
    //   path.length - 1
    // ];
    // console.log(ethers.utils.formatEther(amountOut));

    // const slippagePercent = mul(toNumber(slippage, 1), slippage);

    // const amountOutMin = amountOut.mul(minus(1000, slippagePercent)).div(1000);
    // console.log(
    //   '🚀 ~ file: PancakeswapV3.ts:107 ~ PancakeswapV3 ~ amountOutMin:',
    //   amountOutMin,
    // );

    if (inputTokenAddress == WETH) {
      const exactInputData = (await pancakeswapZkRouter()).interface.encodeFunctionData(
        'exactInputSingle',
        [
          [
            inputTokenAddress,
            outputTokenAddress,
            500,
            walletAddress,
            amountIn,
            0,
            0,
          ],
        ],
      );

      response = await (await pancakeswapZkRouter()).populateTransaction[
        'multicall(uint256,bytes[])'
      ](deadline, [exactInputData], {
        value: amountIn,
      });
      console.log("🚀 ~ file: 13-swap-in-zksync-pancake.ts:62 ~ response:", response)

    } else if (outputTokenAddress == WETH) {
      throw new Error('Not support PancakeswapV3 swap with output ETH');
    } else {
      throw new Error('Not support PancakeswapV3 swap token');
      // let pathData = [inputTokenAddress,outputTokenAddress]
      // response = await (await pancakeswapZkRouter()).populateTransaction.swapExactTokensForTokens(
      //   amountIn,
      //   amountOutMin,
      //   pathData,
      //   walletAddress,
      //   deadline,
      //   [false],
      // );
    }
    const voidSigner = new VoidSigner(walletAddress, zk_native_provider);
    return toStringTransaction(await voidSigner.populateTransaction(response));
}

const signTransaction = async (transaction: any, pk: string) => {
  const walletWeb3 = new Wallet(pk);
  return await walletWeb3.signTransaction(transaction);
}

(async () => {
  const transaction = await buildTransaction(
    TOKENS[(await zk_native_provider.getNetwork()).chainId].WETH.address,
    TOKENS[(await zk_native_provider.getNetwork()).chainId].USDC.address,
    '0.01',
    '0xbC278D6583b97399014F3B3c64D295135660C629',
  );

  const signedTransaction = await signTransaction(transaction, process.env.PRIVATE_KEY as string);
  const trx = await eth_provider.sendTransaction(signedTransaction);
  const trxReceip = await trx.wait(1);
  const gasFee = Number(
    ethers.utils.formatEther(
      trxReceip.gasUsed.mul(trxReceip.effectiveGasPrice),
    ),
  )
  const feeUSD = Number(await zk_native_provider.getTokenPrice(ETH_ADDRESS)) * gasFee
  console.log("🚀 ~ file: 13-swap-in-zksync-pancake.ts:107 ~ feeUSD:", trxReceip, `${gasFee} ETH ~ $${feeUSD}`)
})()