import ScrollToTop from 'components/common/ScrollToTop';
import React from 'react';
import GalleryArtList from '../../components/gallery/GalleryArtList';
import Profile from '../../components/gallery/Profile';
import { profileBox } from '../../components/gallery/Profile/styles';
import Page from '../../Layouts/Page';

function Gallery() {
  return (
    <Page>
      <Profile />
      <GalleryArtList />
      <ScrollToTop />
    </Page>
  );
}

export default Gallery;
