import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import GalleryCard from 'components/common/GalleryCard';
import { getUserListAPI } from 'api/user';
import { CreatorOwnerType } from '../../../types/types';

function GalleryList() {
  const { data, userList, isLoading, isError } = getUserListAPI();
  console.log(userList);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <CircularProgress sx={{ color: 'grey' }} />;

  return (
    <>
      <ImageList cols={2} gap={50} rowHeight={350} variant="quilted">
        {userList.map((user: CreatorOwnerType) => (
          <GalleryCard {...user} />
        ))}
      </ImageList>
    </>
  );
}

export default GalleryList;
