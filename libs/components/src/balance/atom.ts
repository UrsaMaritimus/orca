import { atom } from 'recoil';

export const seeAVAI = atom<boolean>({
  key: 'seeAVAI',
  default: false,
});

export const seeORCA = atom<boolean>({
  key: 'seeORCA',
  default: false,
});
