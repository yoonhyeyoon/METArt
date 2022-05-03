import type { NextPage } from 'next';
import Page from 'Layouts/Page';
import LandingVideo from 'components/landing/LandingVideo';
import LandingSummary from 'components/landing/LandingSummary';

const Home: NextPage = () => {
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
