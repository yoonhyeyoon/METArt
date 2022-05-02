import React from 'react';
import { galleryArtItem } from './styles';

function GalleryArt({ img }: { img: string }) {
  return (
    <div>
      <div css={galleryArtItem}>
        <img src={img} alt="" />
      </div>
    </div>
  );
}

export default GalleryArt;
