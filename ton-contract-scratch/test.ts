import * as fs from "fs";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, Cell, WalletContractV4, Address } from "@ton/ton";
import Counter from "./wrapper"; // this is the interface class from step 7
import * as dotenv from "dotenv";
dotenv.config();

export async function run() {
  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });
  const counterAddress = Address.parse(
    "EQCYLBR0v-vrNpbY8qIxhHKt4CdQuUkvclaEPdjPT7eCK8RI".trim()
  );
  const counter = new Counter(counterAddress);
  console.log("contract address:", counter.address.toString());
  const t = await client.isContractDeployed(counter.address);
  console.log("🚀 ~ run ~ t:", t);
}

run();
