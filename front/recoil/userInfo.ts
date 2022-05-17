import { atom } from 'recoil';

interface UserInfo {
  address: String;
  createdAt: String;
  nickname: String;
  profileUrl: String;
}
export const userInfo = atom<UserInfo>({
  key: 'userInfo',
  default: {
    address: '',
    createdAt: '',
    nickname: '',
    profileUrl: '',
  },
});
