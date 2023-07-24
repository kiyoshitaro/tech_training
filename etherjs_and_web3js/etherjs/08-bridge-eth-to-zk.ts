import { Wallet, types, utils, Contract } from "zksync-web3";
import { MY_ADDRESS, zk_native_provider, eth_provider, WEI6 } from '../constant';
import { BigNumber, PopulatedTransaction, ethers } from "ethers";
import ZksyncAbi from '../abis/Zksync.json';
import * as dotenv from "dotenv";
import { ETH_ADDRESS } from "zksync-web3/build/src/utils";
dotenv.config({ path: __dirname + '../.env' });

const fakeWallet: Wallet = new Wallet(
  Wallet.createRandom().privateKey,
  zk_native_provider,
  eth_provider,
);

const insertGasPrice = async (overrides: ethers.PayableOverrides): Promise<void> => {
  if (!overrides.gasPrice && !overrides.maxFeePerGas) {
    const l1FeeData = await eth_provider.getFeeData();

    // Sometimes baseFeePerGas is not available, so we use gasPrice instead.
    const baseFee = l1FeeData.lastBaseFeePerGas || l1FeeData.gasPrice;

    // ethers.js by default uses multiplcation by 2, but since the price for the L2 part
    // will depend on the L1 part, doubling base fee is typically too much.
    const maxFeePerGas = (baseFee as BigNumber)
      .mul(3)
      .div(2)
      .add(l1FeeData.maxPriorityFeePerGas as BigNumber);

    overrides.maxFeePerGas = maxFeePerGas;
    overrides.maxPriorityFeePerGas = l1FeeData.maxPriorityFeePerGas as BigNumber;
  }
};

const getRequestExecuteTx = async (
  transaction: any,
  // {
  //   contractAddress: types.Address;
  //   calldata: BytesLike;
  //   l2GasLimit?: BigNumberish;
  //   l2Value?: BigNumberish;
  //   factoryDeps?: ethers.BytesLike[];
  //   operatorTip?: BigNumberish;
  //   gasPerPubdataByte?: BigNumberish;
  //   refundRecipient?: types.Address;
  //   overrides?: ethers.PayableOverrides;
  // },
  walletAddress: types.Address,
): Promise<ethers.PopulatedTransaction> => {
  const mainContractAddress = await zk_native_provider.getMainContractAddress();
  const zksyncContract = new Contract(
    mainContractAddress,
    ZksyncAbi.abi,
    eth_provider,
  );

  const { ...tx } = transaction;
  tx.l2Value ??= BigNumber.from(0);
  tx.operatorTip ??= BigNumber.from(0);
  tx.factoryDeps ??= [];
  tx.overrides ??= {};
  tx.gasPerPubdataByte ??= utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT;
  tx.refundRecipient ??= walletAddress;
  tx.l2GasLimit ??= await zk_native_provider.estimateL1ToL2Execute(transaction);

  const {
    contractAddress,
    l2Value,
    calldata,
    l2GasLimit,
    factoryDeps,
    operatorTip,
    overrides,
    gasPerPubdataByte,
    refundRecipient,
  } = tx;
  console.log("🚀 ~ file: 08-bridge-eth-to-zk.ts:73 ~ tx:", overrides);
  await insertGasPrice(overrides);
  console.log("🚀 ~ file: 08-bridge-eth-to-zk.ts:76 ~ overrides:", overrides)
  const gasPriceForEstimation = overrides.maxFeePerGas || overrides.gasPrice;

  const baseCost = await fakeWallet.getBaseCost({
    gasPrice: await gasPriceForEstimation,
    gasPerPubdataByte,
    gasLimit: l2GasLimit,
  });
  overrides.value ??= baseCost.add(operatorTip).add(l2Value);
  console.log("🚀 OVER VALUE", String(operatorTip), String(l2Value))

  await utils.checkBaseCost(baseCost, overrides.value);

  return await zksyncContract.populateTransaction.requestL2Transaction(
    contractAddress,
    l2Value,
    calldata,
    l2GasLimit,
    utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT,
    factoryDeps,
    refundRecipient,
    overrides,
  );
};
const buildTransaction = async (address: string, amount: string): Promise<PopulatedTransaction> => {
  const deposit = await fakeWallet.getDepositTx({
    token: utils.ETH_ADDRESS,
    amount: ethers.utils.parseEther(amount),
  });
  deposit.contractAddress = address;
  deposit.to = address;

  const populatedTransaction = (await getRequestExecuteTx(
    deposit,
    address,
  )) as any;

  populatedTransaction.from = address;
  populatedTransaction.nonce = await eth_provider.getTransactionCount(
    address,
  );

  populatedTransaction.type = populatedTransaction.maxFeePerGas
    ? 2
    : populatedTransaction.type;

  populatedTransaction.value = populatedTransaction.value.toString();
  populatedTransaction.maxFeePerGas =
    populatedTransaction.maxFeePerGas.toString();
  populatedTransaction.maxPriorityFeePerGas =
    populatedTransaction.maxPriorityFeePerGas.toString();

  populatedTransaction.chainId = (await eth_provider.getNetwork()).chainId;

  populatedTransaction.gasLimit = (
    await eth_provider.estimateGas(populatedTransaction)
  ).toString();

  Object.keys(populatedTransaction).forEach((key) => {
    if (typeof populatedTransaction[key] === 'object') {
      populatedTransaction[key] = populatedTransaction[key].toString();
    }
  });
  console.log("🚀 ~ file: 08-bridge-eth-to-zk.ts:135 ~ Object.keys ~ populatedTransaction:", populatedTransaction)

  return populatedTransaction;
};

const signTransaction = async (transaction: any, pk: string) => {
  const walletWeb3 = new Wallet(pk);
  return await walletWeb3.signTransaction(transaction);
}

(async () => {
  const transaction = await buildTransaction(MY_ADDRESS, '0.01');
  const signedTransaction = await signTransaction(transaction, process.env.PRIVATE_KEY as string);
  const trx = await eth_provider.sendTransaction(signedTransaction);
  const trxReceip = await trx.wait(1);

  const gasFee = Number(
    ethers.utils.formatEther(
      trxReceip.gasUsed.mul(trxReceip.effectiveGasPrice),
    ),
  )
  const feeUSD = Number(await zk_native_provider.getTokenPrice(ETH_ADDRESS)) * gasFee
  console.log("🚀 ~ file: 08-bridge-eth-to-zk.ts:154 ~ trxReceip:", trxReceip, `${gasFee} ETH ~ $${feeUSD}`)
})()