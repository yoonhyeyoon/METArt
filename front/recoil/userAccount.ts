import { atom } from 'recoil';

export const userAccountState = atom<string | null>({
  key: 'userAccount',
  default: null,
});
