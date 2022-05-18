import { useState, ChangeEvent } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Page from '../../Layouts/Page';
import GalleryCard from 'components/common/GalleryCard';
import SearchBarGallery from 'components/common/SearchBarGallery';
import GalleryList from 'components/galleries/GalleryList';

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
    <Page title="Artists List">
      {/* <Typography variant="h2" mt={5}>
        Gallery
      </Typography> */}

      <GalleryList />
    </Page>
  );
}

export default GalleryIndex;
