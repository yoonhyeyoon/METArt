import { useState, ChangeEvent } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Page from 'Layouts/Page';
import ArtCard from 'components/common/ArtCard';
import SearchBar from 'components/common/SearchBar';
import ArtList from 'components/arts/ArtList';

function ArtIndex() {
  const [search, setSearch] = useState<String>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 API 호출
  const handleSearchClick = () => {
    console.log(search);

    if (search === '') {
      return;
    }
  };

  return (
    <Page>
      <Box width="500px" mt={2} mb={5}>
        <SearchBar
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
        />
      </Box>
      <ArtList />
    </Page>
  );
}

export default ArtIndex;
