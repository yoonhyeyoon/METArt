import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ArtCard from 'components/common/ArtCard';
import { fetcher, getArtList, getSearchArtListAPI } from '../../../api/art';
import { ArtListType, ContentType } from 'types/types';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar from 'components/common/SearchBar';
import useSWR from 'swr';

function ArtList() {
  const { artList, isLoading, isError } = getArtList();
  const [search, setSearch] = useState<String>('');
  const [artSearchList, setArtSearchList] = useState(artList);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 API 호출
  const handleSearchClick = () => {
    console.log(search);
    if (search === '') {
      return;
    }
    const data = getSearchArtListAPI({
      name: search,
      creatorName: search,
    }).then((res) => {
      console.log(res);
      setArtSearchList(res.data.content);
    });
  };

  useEffect(() => {
    setArtSearchList(artList);
  }, [artList]);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <CircularProgress sx={{ color: 'grey' }} />;

  return (
    <>
      <Box width="500px" mt={2} mb={5}>
        <SearchBar
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
        />
      </Box>
      <Grid container spacing={6}>
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          artSearchList &&
          artSearchList.map((art: ContentType) => (
            <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3} key={art.id}>
              <ArtCard {...art} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export default ArtList;
