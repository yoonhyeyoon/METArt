import React from 'react';
import Navbar from './Navbar';
import Container from '@mui/material/Container';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ paddingTop: 5 }}>
        {children}
      </Container>
    </>
  );
}
