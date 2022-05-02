import React from 'react';
import GalleryArtList from '../../components/gallery/GalleryArtList';
import Profile from '../../components/gallery/Profile';
import { profileBox } from '../../components/gallery/Profile/styles';

function Gallery() {
  return (
    <div css={profileBox}>
      <Profile />
      <GalleryArtList />
    </div>
  );
}

export default Gallery;
