import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ArtCard from 'components/common/ArtCard';
import { getArtList } from '../../../api/art';
import { ArtListType, ContentType } from 'types/types';
import CircularProgress from '@mui/material/CircularProgress';

function ArtList() {
  const { data, artList, isLoading, isError } = getArtList();
  console.log(artList);

  return (
    <Grid container spacing={6}>
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        artList.map((art: ContentType) => (
          <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3} key={art.id}>
            <ArtCard {...art} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default ArtList;
