import { TDS_TOKEN_ADDRESS_ZK_TESTNET, USDC_TOKEN_ADDRESS_ZK_TESTNET, getContract, zk_provider } from "../constant";
import TDSJson from "../abis/Tardis.json";
import USDCJson from "../abis/ERC20.json";

const contract = getContract(TDS_TOKEN_ADDRESS_ZK_TESTNET, TDSJson.abi);
// const contract = getContract(USDC_TOKEN_ADDRESS_ZK_TESTNET, USDCJson.abi);
(async () => {
  const block = await zk_provider.getBlockNumber();
  console.log("🚀 ~ file: constract_event.ts:7 ~ block:", block);

  const blockInfo = await zk_provider.getBlock(block)
  console.log("🚀 ~ file: constract_event.ts:12 ~ blockInfo:", blockInfo)

  const { transactions } = await zk_provider.getBlockWithTransactions(block)

  console.log(`\nLogging first transaction in block:\n`)
  console.log(transactions[0])

  const transferEvent = await contract.queryFilter('Transfer', block - 1000, block);
  console.log("🚀 ~ file: constract_event.ts:10 ~ transferEvent:", transferEvent)
})()
