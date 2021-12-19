import { BigNumber } from 'ethers';
import remove from 'lodash/remove';
import { atom, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

type Transaction = {
  type:
    | 'deposit'
    | 'withdraw'
    | 'borrow'
    | 'payback'
    | 'mint'
    | 'redeem'
    | 'liquidate';
  amount: BigNumber;
  vault?: 'AVAX' | 'USDC.e' | 'ETH' | 'BTC';
  success: boolean;
  hash: string;
};

export const transactionState = atom<Transaction[]>({
  key: 'transactions',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// Adds a transaction, to a maximum of 10
export const useAddTransaction = () => {
  // Get the global state
  const setTransactions = useSetRecoilState(transactionState);

  // Add a transaction to this list
  const addTransaction = (transaction: Transaction) => {
    if (transaction.success)
      setTransactions((oldTransactions) => [
        ...oldTransactions.slice(-9),
        transaction,
      ]);
  };
  return addTransaction;
};

// Removes all the users transactions
export const useRemoveTransactions = () => {
  const setTransactions = useSetRecoilState(transactionState);

  const removeTransactions = () => {
    setTransactions([]);
  };
  return removeTransactions;
};
