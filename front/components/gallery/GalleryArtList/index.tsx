import { useState } from 'react';
import GalleryArt from '../GalleryArt';
import { Box, Container } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { textAlign } from '@mui/system';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
  artPrice,
  caption,
  transParentBox,
} from 'components/common/GalleryCard/styled';
import { getGalleryArtAPI, getGalleryBuyAPI } from 'api/gallery';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { ContentType } from 'types/types';

function GalleryArtList() {
  const [artState, setArtState] = useState('art');

  const handleArtState = (
    event: React.MouseEvent<HTMLElement>,
    newArtState: string | null,
  ) => {
    if (newArtState !== null) {
      setArtState(newArtState);
    }
  };

  const router = useRouter();
  const { galleryid } = router.query;

  const { artList, isLoad, isErr } = getGalleryArtAPI(galleryid);
  const { buyList, isLoading, isError } = getGalleryBuyAPI(galleryid);
  console.log(artList, buyList, artState);
  if (isErr || isError) return <div>failed to load</div>;
  if (isLoad || isLoading) return <CircularProgress sx={{ color: 'grey' }} />;

  return (
    <div>
      <Container
        sx={{
          paddingTop: 9,
          paddingBottom: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '80vw',
            paddingBottom: 13,
          }}
        >
          <ToggleButtonGroup
            value={artState}
            exclusive
            onChange={handleArtState}
          >
            <ToggleButton value="art">My Art</ToggleButton>
            <ToggleButton value="buy">Own</ToggleButton>
          </ToggleButtonGroup>
          <ImageList variant="masonry" cols={4} gap={40}>
            {artState == 'art' &&
              artList.map((art: ContentType) => <GalleryArt {...art} />)}
            {artState == 'buy' &&
              buyList.map((art: ContentType) => <GalleryArt {...art} />)}
          </ImageList>
        </Box>
      </Container>
    </div>
  );
}

export default GalleryArtList;
