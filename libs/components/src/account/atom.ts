import { atom } from 'recoil';

export const seeAccount = atom<boolean>({
  key: 'seeAccount',
  default: false,
});
