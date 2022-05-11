import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRecoilState } from 'recoil';
import { userAccountState } from 'recoil/userAccount';
import Page from 'Layouts/Page';
import LandingVideo from 'components/landing/LandingVideo';
import LandingSummary from 'components/landing/LandingSummary';
import ScrollToTop from 'components/common/ScrollToTop';

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
      const account = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (account) {
        setUserAccount(account[0]);
      }
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
        <ScrollToTop />
      </Page>
    </>
  );
};

export default Home;
