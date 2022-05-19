import React from 'react';
import ArtCard from 'components/common/ArtCard';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { ContentType } from 'types/types';
import { getNewArtList } from 'api/art';

function NewArtList() {
  const { data, isLoading, isError } = getNewArtList();
  console.log(data);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <CircularProgress sx={{ color: 'grey' }} />;

  return (
    <>
      {data.map((art: ContentType) => (
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <ArtCard {...art} />
        </Grid>
      ))}
    </>
  );
}

export default NewArtList;
