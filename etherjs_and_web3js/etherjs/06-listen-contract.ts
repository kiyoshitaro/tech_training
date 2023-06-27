import { TDS_TOKEN_ADDRESS_ZK_TESTNET, USDC_TOKEN_ADDRESS_ZK_TESTNET, getContract, zk_provider } from "../constant";
import TDSJson from "../abis/Tardis.json";
import USDCJson from "../abis/ERC20.json";

// const contract = getContract(TDS_TOKEN_ADDRESS_ZK_TESTNET, TDSJson.abi);
const contract = getContract(USDC_TOKEN_ADDRESS_ZK_TESTNET, USDCJson.abi);
(async () => {
  contract.on('Transfer', async (_from, _to, _value) => {
    console.log("🚀 ~ file: listen_contract.ts:10 ~ contract.on ~ _from, _to, _value:", _from, _to, _value.toNumber())
  });
})()
