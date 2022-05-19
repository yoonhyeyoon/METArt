import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import CircularProgress from '@mui/material/CircularProgress';
import GalleryCard from 'components/common/GalleryCard';
import { getSearchUserListAPI, getUserListAPI } from 'api/user';
import { CreatorOwnerType } from 'types/types';
import { Box } from '@mui/material';
import SearchBarGallery from 'components/common/SearchBarGallery';

function GalleryList() {
  const { userList, isLoading, isError } = getUserListAPI();
  const [search, setSearch] = useState<String>('');
  const [userSearchList, setUserSearchList] = useState(userList);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 API 호출
  const handleSearchClick = () => {
    getSearchUserListAPI({
      name: search,
      creatorName: search,
    }).then((res) => {
      setUserSearchList(res.data.content);
    });
  };

  useEffect(() => {
    setUserSearchList(userList);
  }, [userList]);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <CircularProgress sx={{ color: 'grey' }} />;

  return (
    <>
      <Box width="500px" mt={2} mb={5}>
        <SearchBarGallery
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
        />
      </Box>
      <ImageList cols={2} gap={50} rowHeight={350} variant="quilted">
        {userSearchList &&
          userSearchList.map((user: CreatorOwnerType) => (
            <GalleryCard {...user} />
          ))}
      </ImageList>
    </>
  );
}

export default GalleryList;
