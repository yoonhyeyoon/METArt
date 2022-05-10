import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {
  artPrice,
  caption,
  transParentBox,
} from 'components/gallery/GalleryArtList/styles';

type imgType = string[];

function GalleryList() {
  const imgs: imgType = [
    'https://img.sbs.co.kr/newsnet/etv/upload/2019/01/31/30000622371_700.jpg',
    'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202104/15/741b72ba-1834-425f-9e5a-c10561b18fdb.jpg',
    'https://img.gqkorea.co.kr/gq/2020/11/style_5fdc183229113.jpg',
    'https://i.ytimg.com/vi/ii3OtzkW9TQ/maxresdefault.jpg',
    'https://img.sbs.co.kr/newsnet/etv/upload/2019/01/31/30000622371_700.jpg',
    'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202104/15/741b72ba-1834-425f-9e5a-c10561b18fdb.jpg',
    'https://img.gqkorea.co.kr/gq/2020/11/style_5fdc183229113.jpg',
    'https://i.ytimg.com/vi/ii3OtzkW9TQ/maxresdefault.jpg',
  ];
  return (
    <ImageList cols={2} gap={50} rowHeight={350} variant="quilted">
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
              // backgroundColor: 'primary.main',
              // opacity: [0.9, 0.8, 0.7],
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
            src={`${img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            // alt={item.title}
            loading="lazy"
          />
          <div css={transParentBox} className="transparent-box">
            <div css={caption} className="caption">
              {/* <p>1.5 ETH</p> */}
              <p css={artPrice}>Kim Seo-hyung</p>
            </div>
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default GalleryList;
