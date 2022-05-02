import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import Page from '../Layouts/Page';
import ArtCard from '../components/common/ArtCard';

const Home: NextPage = () => {
  return (
    <>
      <Page>
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          zIndex={-1}
          overflow="hidden"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            id="homeVideo"
            style={{
              objectFit: 'cover',
              width: '100vw',
              height: '100vh',
            }}
          >
            <source
              src="https://artdiscoverystatic.s3.amazonaws.com/media/media/%EB%A9%94%ED%83%80%EB%B2%84%EC%8A%A4%EA%B0%A4%EB%9F%AC%EB%A6%AC_%EB%9E%9C%EB%94%A9%ED%8E%98%EC%9D%B4%EC%A7%80_5%EC%B0%A8_%EC%B5%9C%EC%A2%85%EB%B3%B8.mp4"
              type="video/mp4"
            />
          </video>
        </Box>
        <Box mt="100vh">
          <Typography variant="h3">New Arts</Typography>
          <ArtCard />
          <Typography variant="h3">Popular Galleries</Typography>
        </Box>
      </Page>
    </>
  );
};

export default Home;
