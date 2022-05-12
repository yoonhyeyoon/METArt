import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'recoil/userInfo';
import Page from 'Layouts/Page';
import LandingVideo from 'components/landing/LandingVideo';
import LandingSummary from 'components/landing/LandingSummary';
import { metamaskLogin } from 'utils/metamaskLogin';
import ScrollToTop from 'components/common/ScrollToTop';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const Home: NextPage = () => {
  const [userAccount, setUserAccount] = useRecoilState(userInfoState);

  const connectedAccount = () => {
    metamaskLogin().then((data) => {
      if (data) {
        setUserAccount({
          address: data.address,
          createdAt: data.createdAt,
          nickname: data.name,
          profileUrl: data.profileUrl,
        });
      } else {
        setUserAccount({
          address: '',
          createdAt: '',
          nickname: '',
          profileUrl: '',
        });
      }
    });
  };

  useEffect(() => {
    window.ethereum.on('accountsChanged', async () => {
      connectedAccount();
    });
    connectedAccount();
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
