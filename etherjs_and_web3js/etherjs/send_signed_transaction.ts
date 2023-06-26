import { ethers } from "ethers";
import { MY_ADDRESS, MY_ADDRESS_2, myWallet, zk_provider } from '../constant';


(async () => {
  const senderBalance = await zk_provider.getBalance(MY_ADDRESS);
  const receiverBalance = await zk_provider.getBalance(MY_ADDRESS_2);

  console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalance)}`)
  console.log(`Reciever balance before: ${ethers.utils.formatEther(receiverBalance)}\n`)

  const tx = await myWallet.sendTransaction({
    to: MY_ADDRESS_2,
    value: ethers.utils.parseEther("0.002")
  });

  await tx.wait();
  console.log("🚀 ~ file: send_signed_transaction.ts:18 ~ tx:", tx)

  const senderBalanceAfter = await zk_provider.getBalance(MY_ADDRESS);
  const receiverBalanceAfter = await zk_provider.getBalance(MY_ADDRESS_2);

  console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
  console.log(`Reciever balance after: ${ethers.utils.formatEther(receiverBalanceAfter)}\n`)
})()
