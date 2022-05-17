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
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1} sx={{ fontSize: '2rem', marginBottom: 2 }}>
                METArt
              </Box>
              <Box sx={{ marginBottom: 1 }}>
                <p style={{ color: '#616161' }}>
                  고객센터 01-2345-6789 | 평일 상담시간 09:00 ~ 18:00
                </p>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <p style={{ color: '#616161' }}>서울시 강남구 테헤란로 212</p>
              </Box>
              <Box>
                <a
                  href="https://dev-junyong.notion.site/METArt-42be9a8ca55f41a1b15365b2d5ac0a17"
                  style={{ color: '#f5f5f5' }}
                >
                  Contact
                </a>
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={4}>
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
            </Grid> */}
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
