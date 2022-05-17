import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
  effects_UNSTABLE: [persistAtom],
});
