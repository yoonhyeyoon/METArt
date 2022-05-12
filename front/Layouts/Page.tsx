import React from 'react';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import Footer from './Footer';
import GoMetArt from 'components/common/GoMetArt';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ paddingTop: 13, paddingBottom: 20 }}>
        {children}
      </Container>
      <GoMetArt />
      <Footer />
    </>
  );
}
