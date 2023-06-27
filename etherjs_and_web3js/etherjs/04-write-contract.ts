import { MY_ADDRESS, MY_ADDRESS_2, TDS_TOKEN_ADDRESS_ZK_TESTNET, getContract, myWallet, zk_provider } from '../constant';
import TDSJson from "../abis/Tardis.json";

const TDSContract = getContract(TDS_TOKEN_ADDRESS_ZK_TESTNET, TDSJson.abi);
(async () => {
  const senderBalance = await TDSContract.balanceOf(MY_ADDRESS);
  const receiverBalance = await TDSContract.balanceOf(MY_ADDRESS_2);

  console.log(`\nSender balance before: ${senderBalance}`);
  console.log(`\nReceive balance before: ${receiverBalance}`);

  const constractWithWallet = TDSContract.connect(myWallet);
  const tx = await constractWithWallet.transfer(MY_ADDRESS_2, 100000);
  await tx.wait();
  console.log("🚀 ~ file: write_contract.ts:14 ~ tx:", tx)

  const senderBalanceAfter = await TDSContract.balanceOf(MY_ADDRESS);
  const receiverBalanceAfter = await TDSContract.balanceOf(MY_ADDRESS_2);

  console.log(`\nSender balance after: ${senderBalanceAfter}`)
  console.log(`Receiver balance after: ${receiverBalanceAfter}\n`)
})()
