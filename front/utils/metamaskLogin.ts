import { getUserInfoAPI, createUserAPI } from 'api/user';

export const metamaskLogin = async () => {
  try {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: 'eth_accounts',
      });
      // 메타마스크에 로그인이 되어있는 경우
      if (account[0]) {
        // 유저 데이터 받아오기
        return getUserInfoAPI(account[0])
          .then(({ data }) => data)
          .catch((err) => {
            if (err.response.status === 404) {
              return createUserAPI(account[0]).then(({ data }) => data);
            } else {
              console.dir(err);
            }
          });
      }
      // 메타마스크 로그인을 해야하는 경우
      else {
        // 지갑 연결 요청
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
      }
    } else {
      alert('Install Metamask! https://metamask.io/download/');
    }
  } catch (error) {
    console.dir(error);
  }
};
