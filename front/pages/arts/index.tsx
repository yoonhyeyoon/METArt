import { useState, ChangeEvent } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Page from 'Layouts/Page';
import ArtCard from 'components/common/ArtCard';
import SearchBar from 'components/common/SearchBar';
import ScrollToTop from 'components/common/ScrollToTop';

function ArtList() {
  const [search, setSearch] = useState<String>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 API 호출
  const handleSearchClick = () => {
    console.log(search);
  };

  return (
    <Page>
      {/* <Typography variant="h2" mt={5}>
        Art
      </Typography> */}
      <Box width="500px" mt={2} mb={5}>
        <SearchBar
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
        />
      </Box>
      <Grid container spacing={6}>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
        <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
          <ArtCard />
        </Grid>
      </Grid>
      <ScrollToTop />
    </Page>
  );
}

export default ArtList;
