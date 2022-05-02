import React from 'react';
import GalleryArt from '../GalleryArt';
import { galleryArtBox, galleryArtContent } from './styles';

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
      <section css={galleryArtContent}>
        <div css={galleryArtBox}>
          {imgs.map((img) => (
            <GalleryArt img={img} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GalleryArtList;
