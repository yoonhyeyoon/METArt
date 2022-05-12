import { useState, ChangeEvent } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Page from '../../Layouts/Page';
import GalleryCard from 'components/common/GalleryCard';
import SearchBarGallery from 'components/common/SearchBarGallery';
import GalleryList from 'components/galleries/GalleryList';
import ScrollToTop from 'components/common/ScrollToTop';

function GalleryIndex() {
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
        Gallery
      </Typography> */}
      <Box width="500px" mt={2} mb={5}>
        <SearchBarGallery
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
        />
      </Box>
      <GalleryList />
      <ScrollToTop />
    </Page>
  );
}

export default GalleryIndex;
