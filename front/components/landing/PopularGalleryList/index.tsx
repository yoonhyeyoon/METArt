import React from 'react';
import ImageList from '@mui/material/ImageList';
import GalleryCard from 'components/common/GalleryCard';
import { getPopularGalleryListAPI } from 'api/gallery';
import CircularProgress from '@mui/material/CircularProgress';
import { CreatorOwnerType } from 'types/types';

function PopularGalleryList() {
  const { data, isLoading, isError } = getPopularGalleryListAPI();
  console.log(data);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <CircularProgress sx={{ color: 'grey' }} />;

  return (
    <>
      <ImageList cols={4} gap={50} rowHeight={350} variant="quilted">
        {data.map((user: CreatorOwnerType) => (
          <GalleryCard {...user} />
        ))}
      </ImageList>
    </>
  );
}

export default PopularGalleryList;
