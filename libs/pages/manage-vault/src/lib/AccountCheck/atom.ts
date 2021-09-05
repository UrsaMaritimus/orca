import { BigNumber } from 'ethers';
import { atom, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

type Account = {
  vaultID: number;
  collateral: BigNumber;
  debt: BigNumber;
};

type BankInfo = {
  [BankID: string]: Account[];
};

export const accountState = atom<BankInfo>({
  key: 'account',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
export const useUpdateAccount = () => {
  // Get the global state
  const setAccount = useSetRecoilState(accountState);

  // Add a transaction to this list
  const updateAccount = (bankID: 'AVAX', account: Account) => {
    setAccount((BankInfo) => {
      const temp = { ...BankInfo };
      // Make key for bank ID if not exist
      if (!(bankID in temp)) temp[bankID] = [];

      temp[bankID] = [
        ...temp[bankID].filter((val) => val.vaultID !== account.vaultID),
        account,
      ];

      return temp;
    });
  };
  return updateAccount;
};
