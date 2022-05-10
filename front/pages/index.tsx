import type { NextPage } from 'next';
import { useRecoilState } from 'recoil';
import { userAccountState } from 'recoil/userAccount';
import Page from 'Layouts/Page';
import LandingVideo from 'components/landing/LandingVideo';
import LandingSummary from 'components/landing/LandingSummary';
import { useEffect } from 'react';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const Home: NextPage = () => {
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);

  const getUserInfo = async () => {
    try {
      const userAccount = await window.ethereum.request({
        method: 'eth_accounts',
      });
      setUserAccount(userAccount);
    } catch (error) {
      console.dir(error);
    }
  };

  useEffect(() => {
    window.ethereum.on('accountsChanged', async () => {
      getUserInfo();
    });
    getUserInfo();
  }, []);

  return (
    <>
      <Page>
        <LandingVideo />
        <LandingSummary />
      </Page>
    </>
  );
};

export default Home;
