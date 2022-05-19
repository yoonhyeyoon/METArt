import { useEffect, useState } from 'react';
import { Container, Box, Grid } from '@mui/material';
import ArtCard from 'components/common/ArtCard';
import { getArtList, getSearchArtListAPI } from 'api/art';
import { ContentType } from 'types/types';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar from 'components/common/SearchBar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function ArtList() {
  const [page, setPage] = useState(1);
  const { data, artList, isLoading, isError } = getArtList(page);
  const [search, setSearch] = useState<String>('');
  const [artSearchList, setArtSearchList] = useState(artList);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 API 호출
  const handleSearchClick = () => {
    getSearchArtListAPI({
      name: search,
      creatorName: search,
    }).then((res) => {
      setArtSearchList(res.data.content);
    });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
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
      <Container
        sx={{
          paddingTop: 10,
          paddingBottom: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={data.totalPages}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Container>
    </>
  );
}

export default ArtList;
