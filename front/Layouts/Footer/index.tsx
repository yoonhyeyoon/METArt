import React from 'react';
import Link from 'next/link';
import { Grid, Box, Container } from '@mui/material';

function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 2, sm: 7 }}
        py={{ xs: 2, sm: 7 }}
        bgcolor="#bdbdbd"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="/">
                  <a style={{ color: 'white' }}>Contact</a>
                </Link>
              </Box>
              <Box>
                <Link href="/">
                  <a style={{ color: 'white' }}>Contact</a>
                </Link>
              </Box>
              <Box>
                <Link href="/">
                  <a style={{ color: 'white' }}>Contact</a>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href="/">
                  <a style={{ color: 'white' }}>Contact</a>
                </Link>
              </Box>
              <Box>
                <Link href="/">
                  <a style={{ color: 'white' }}>Contact</a>
                </Link>
              </Box>
              <Box>
                <Link href="/">
                  <a style={{ color: 'white' }}>Contact</a>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Messages</Box>
              <Box>
                <Link href="/">
                  <a style={{ color: 'white' }}>Contact</a>
                </Link>
              </Box>
              <Box>
                <Link href="/">
                  <a style={{ color: 'white' }}>Contact</a>
                </Link>
              </Box>
              <Box>
                <Link href="/">
                  <a style={{ color: 'white' }}>Contact</a>
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Copyright &reg; {new Date().getFullYear()} METArt. 6to0 All rights
            reserved
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
