import { useState, ChangeEvent } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Page from 'Layouts/Page';
import ArtCard from 'components/common/ArtCard';
import SearchBar from 'components/common/SearchBar';
import ArtList from 'components/arts/ArtList';

function ArtIndex() {
  return (
    <Page title="Arts List">
      <ArtList />
    </Page>
  );
}

export default ArtIndex;
