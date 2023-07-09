import { MY_ADDRESS, MY_ADDRESS_2, MY_ADDRESS_4, TDS_TOKEN_ADDRESS_ZK_TESTNET, WEI6, estimateGas, getContract, myWallet, zk_provider } from '../constant';
import TDSJson from "../abis/Tardis.json";
import { ethers } from 'ethers';

const TDSContract = getContract(TDS_TOKEN_ADDRESS_ZK_TESTNET, TDSJson.abi);
(async () => {
  const senderBalance = await TDSContract.balanceOf(MY_ADDRESS);
  const receiverBalance = await TDSContract.balanceOf(MY_ADDRESS_4);

  console.log(`\nSender balance before: ${senderBalance}`);
  console.log(`\nReceive balance before: ${receiverBalance}`);

  // TRANSFER
  const transaction = await TDSContract.connect(myWallet)[`transfer`](...[MY_ADDRESS_4, 1000000000000000]);
  const signedTransaction = await myWallet.signTransaction(transaction);
  const transactionResponse = await zk_provider.sendTransaction(signedTransaction);
  console.log('Transaction hash:', transactionResponse);

  // NOTE: Calculate gasfee in ETH
  const txReceip = await transactionResponse.wait(1);
  const gasFee = Number(ethers.utils.formatEther(txReceip.gasUsed.mul(txReceip.effectiveGasPrice)));
  console.log("🚀 ~ file: write_contract.ts:14 ~ Real gas:", gasFee)

  const senderBalanceAfter = await TDSContract.balanceOf(MY_ADDRESS);
  const receiverBalanceAfter = await TDSContract.balanceOf(MY_ADDRESS_4);

  console.log(`\nSender balance after: ${senderBalanceAfter}`)
  console.log(`Receiver balance after: ${receiverBalanceAfter}\n`)
})()
