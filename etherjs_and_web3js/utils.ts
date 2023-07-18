import { PopulatedTransaction } from 'ethers';
import { TransactionRequest } from '@ethersproject/abstract-provider';

export const toStringTransaction = (
  populatedTransaction: PopulatedTransaction | TransactionRequest,
) => {
  const transaction = { ...populatedTransaction };
  Object.keys(transaction).forEach((key) => {
    if (typeof transaction[key] === 'object') {
      transaction[key] = populatedTransaction[key].toString();
    }
  });
  return transaction;
};
