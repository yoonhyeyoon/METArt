import GalleryArtList from 'components/gallery/GalleryArtList';
import Profile from 'components/gallery/Profile';
import Page from 'Layouts/Page';

function Gallery() {
  return (
    <Page title="Artist Detail">
      <Profile />
      <GalleryArtList />
    </Page>
  );
}

export default Gallery;
