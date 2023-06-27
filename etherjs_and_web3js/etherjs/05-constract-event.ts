import { MY_ADDRESS, TDS_TOKEN_ADDRESS_ZK_TESTNET, USDC_TOKEN_ADDRESS_ZK_TESTNET, getContract, myWallet, zk_provider } from "../constant";
import TDSJson from "../abis/Tardis.json";
import USDCJson from "../abis/ERC20.json";
import { Contract, ethers } from "ethers";

const contract = getContract(TDS_TOKEN_ADDRESS_ZK_TESTNET, TDSJson.abi);
// const contract = getContract(USDC_TOKEN_ADDRESS_ZK_TESTNET, USDCJson.abi);

(async () => {
  const block = await zk_provider.getBlockNumber();
  console.log("🚀 ~ file: constract_event.ts:7 ~ block:", block);

  // const blockInfo = await zk_provider.getBlock(block)
  // console.log("🚀 ~ file: constract_event.ts:12 ~ blockInfo:", blockInfo)

  // const { transactions } = await zk_provider.getBlockWithTransactions(block)

  // console.log(`\nLogging first transaction in block:\n`)
  // console.log(transactions[0]);

  // const _t = await contract.balanceOf(MY_ADDRESS);
  // const _t = await contract.queryFilter('Transfer', block - 100, block);
  // console.log("🚀 ~ file: 05-constract-event.ts:20 ~ _t:", _t[0])

  // const transferEvent = await contract.queryFilter('Transfer', block - 1000, block);
  // console.log("🚀 ~ file: constract_event.ts:10 ~ transferEvent:", transferEvent)

  // contract.connect(myWallet);
  const filter = { address: contract.address, topics: [], fromBlock: 0, toBlock: block }
  const logs = await zk_provider.getLogs(filter);
  const transactions = await Promise.all(logs.map(async (log) => {
    const tx = await zk_provider.getTransactionReceipt(log.transactionHash);
    const fee = ethers.BigNumber.from(tx.gasUsed).mul(tx.effectiveGasPrice);
    return {
      transactionHash: log.transactionHash,
      blockNumber: log.blockNumber,
      to: log.address,
      fee: ethers.utils.formatEther(fee),
    }
  }));
  console.log("🚀 ~ file: 05-constract-event.ts:37 ~ transactions ~ transactions:", transactions)

})()
