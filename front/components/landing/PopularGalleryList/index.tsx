import React from 'react';
import ImageList from '@mui/material/ImageList';
import GalleryCard from 'components/common/GalleryCard';

type imgType = string[];

function PopularGalleryList() {
  const imgs: imgType = [
    'https://img.sbs.co.kr/newsnet/etv/upload/2019/01/31/30000622371_700.jpg',
    'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202104/15/741b72ba-1834-425f-9e5a-c10561b18fdb.jpg',
    'https://img.gqkorea.co.kr/gq/2020/11/style_5fdc183229113.jpg',
    'https://i.ytimg.com/vi/ii3OtzkW9TQ/maxresdefault.jpg',
  ];
  return (
    <>
      <ImageList cols={4} gap={50} rowHeight={350} variant="quilted">
        {imgs.map((img) => (
          <GalleryCard img={img} />
        ))}
      </ImageList>
    </>
  );
}

export default PopularGalleryList;
