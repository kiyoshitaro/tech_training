import { Wallet } from "zksync-web3";
import { MY_ADDRESS, zk_native_provider, convertAmount, eth_provider, CONTRACTS_ADDRESS, ELayer } from '../constant';
import { VoidSigner, ethers } from "ethers";
import * as dotenv from "dotenv";
import { ETH_ADDRESS } from "zksync-web3/build/src/utils";
import { TOKENS } from "../token";
import { toStringTransaction } from "../utils";
dotenv.config({ path: __dirname + '../.env' });

const buildTransaction = async (tokenAAddress: string, tokenAAmount: string, walletAddress: string) => {
  const convertedAmount = await convertAmount(tokenAAmount, tokenAAddress, ELayer.ETHEREUM);
  const outputChainId = (await eth_provider.getNetwork()).chainId;
  const codes = [
    {
      name: "Ethereum Mainnet",
      code: "9001",
      chainId: 1
    },
    {
      name: "Ethereum Testnet",
      code: "9005",
      chainId: 5
    },
    {
      name: "ZKSync Mainnet",
      code: "9014",
      chainId: 324
    },
    {
      name: "ZKSync Testnet",
      code: "9514",
      chainId: 280
    }
  ]
  const chainCode = codes.find(item => item.chainId == outputChainId);
  const modifiedAmount = convertedAmount.toString().slice(0, -4) + (chainCode?.code || '')
  console.log("🚀 ~ file: 12-bridge-with-orbiter.ts:39 ~ buildTransaction ~ modifiedAmount:", modifiedAmount)

  const voidSigner = new VoidSigner(walletAddress, eth_provider);
  //TODO: get current maker address to send value
  const makerAddress = CONTRACTS_ADDRESS[(await eth_provider.getNetwork()).chainId].Orbiter.OrbiterMaker
  let transaction = {
    from: walletAddress,
    to: makerAddress,
    value: modifiedAmount,
    data: '0x',
    nonce: await voidSigner.getTransactionCount()
  }
  return toStringTransaction(await voidSigner.populateTransaction((transaction)));
}

const signTransaction = async (transaction: any, pk: string) => {
  const walletWeb3 = new Wallet(pk);
  return await walletWeb3.signTransaction(transaction);
}

(async () => {
  const transaction = await buildTransaction(
    TOKENS[(await eth_provider.getNetwork()).chainId].WETH.address,
    '0.01',
    MY_ADDRESS,
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
  console.log("🚀 ~ file: 12-bridge-with-orbiter.ts:76 ~ feeUSD:", trxReceip, `${gasFee} ETH ~ $${feeUSD}`)
})()