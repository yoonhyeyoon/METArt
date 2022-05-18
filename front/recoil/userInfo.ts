import { atom } from 'recoil';

interface UserInfo {
  address: string;
  createdAt: string;
  nickname: string;
  profileUrl: string;
  biography: string;
}

export const userInfo = atom<UserInfo>({
  key: 'userInfo',
  default: {
    address: '',
    createdAt: '',
    nickname: '',
    profileUrl: '',
    biography: '',
  },
});
