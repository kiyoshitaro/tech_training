import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address, WalletContractV4 } from "@ton/ton";
import Counter from "./wrapper";
import { mnemonicToWalletKey } from "@ton/crypto";
import * as dotenv from "dotenv";
dotenv.config();

export async function run() {
  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  // open Counter instance by address
  const counterAddress = Address.parse(
    "kQB6kMRNZjuJ8U6zhzyc_P2paZbOSrBaYXbPt2C1V1xkYfD-".trim()
  );
  const counter = new Counter(counterAddress);
  const counterContract = client.open(counter);

  // Wallet
  const key = await mnemonicToWalletKey(
    (process.env.TON_MNEMONIC || "").split(" ")
  );
  const wallet = WalletContractV4.create({
    publicKey: key.publicKey,
    workchain: 0,
  });
  const walletContract = client.open(wallet);
  const walletSender = walletContract.sender(key.secretKey);
  const seqno = await walletContract.getSeqno();

  // send the increment transaction
  await counterContract.sendIncrement(walletSender);

  // wait until confirmed
  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log("waiting for transaction to confirm...");
    await sleep(1500);
    currentSeqno = await walletContract.getSeqno();
  }
  console.log("transaction confirmed!");
}

run();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
