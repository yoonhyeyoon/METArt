import React from 'react';
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

type imgType = string[];

function GalleryArtList() {
  const imgs: imgType = [
    'https://artdiscoverystatic.s3.amazonaws.com/media/images/20._BOOKANIMA_Andy_Warhol.width-570.jpg',
    'https://artdiscoverystatic.s3.amazonaws.com/media/images/19_BOOKANIMA_Leports.width-570.jpg',
    'https://artdiscoverystatic.s3.amazonaws.com/media/images/12._Song_Am_Ji_Gyung_SongYanZhiJing.width-570.png',
    'https://artdiscoverystatic.s3.amazonaws.com/media/images/4._Hemorrhage_ChuXue.width-570.jpg',
    'https://artdiscoverystatic.s3.amazonaws.com/media/images/17._BOOKANIMA_Dance.width-570.png',
    'https://artdiscoverystatic.s3.amazonaws.com/media/images/14._Baleset.width-570.jpg',
    'https://artdiscoverystatic.s3.amazonaws.com/media/images/The_Inner_Sky-RelaxOil_On_Canvas_53x40.9cm_202.width-570.jpg',
  ];
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
            color="primary"
            // value={alignment}
            exclusive
            // onChange={handleChange}
          >
            <ToggleButton value="sale">For Sale</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
          </ToggleButtonGroup>
          <ImageList variant="masonry" cols={4} gap={40}>
            {imgs.map((img) => (
              <ImageListItem
                key={img}
                sx={{
                  // position: 'relative',
                  backgroundColor: 'white',
                  overflow: 'hidden',
                  color: 'white',
                  '& .img': {
                    transform: 'scale(1.0)',
                    transition: 'transform 0.4s ease',
                  },
                  '&:hover': {
                    cursor: 'pointer',
                    '& .caption': {
                      opacity: 1,
                      transform: 'translateY(-20px)',
                    },
                    '& .transparent-box': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    '& .img': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <img
                  src={`${img}?w=248&fit=crop&auto=format`}
                  srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                  className="img"
                />
                <div css={transParentBox} className="transparent-box">
                  <div css={caption} className="caption">
                    <p>1.5 ETH</p>
                    <p css={artPrice}>Kim Seo-hyung Design</p>
                  </div>
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    </div>
  );
}

export default GalleryArtList;
