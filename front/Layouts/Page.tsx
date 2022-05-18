import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import GoMetArt from 'components/common/GoMetArt';
import ScrollToTop from 'components/common/ScrollToTop';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Layout({ title = '', children }: Props) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ paddingTop: 13, paddingBottom: 20 }}>
        {title && (
          <Stack
            justifyContent="center"
            alignItems="center"
            direction="row"
            ml="20%"
            mr="20%"
            minHeight="80px"
            pb={5}
          >
            <Box
              position="absolute"
              left="20%"
              padding={3}
              sx={{ cursor: 'pointer' }}
            >
              <BackIcon onClick={() => router.back()} />
            </Box>
            <Typography variant="h3" textAlign="center">
              {title}
            </Typography>
          </Stack>
        )}
        {children}
      </Container>
      <GoMetArt />
      <ScrollToTop />
      <Footer />
    </>
  );
}
