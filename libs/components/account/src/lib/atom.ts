import { atom, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

type Account = {
  collateral: number;
  debt: number;
};

export const accountState = atom<Account>({
  key: 'account',
  default: { collateral: 0, debt: 0 },
  effects_UNSTABLE: [persistAtom],
});

export const seeAccount = atom<boolean>({
  key: 'seeAccount',
  default: false,
});

export const useUpdateAccount = () => {
  // Get the global state
  const setAccount = useSetRecoilState(accountState);

  // Add a transaction to this list
  const updateAccount = (account: Account) => {
    setAccount(account);
  };
  return updateAccount;
};
