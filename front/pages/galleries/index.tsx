import Page from 'Layouts/Page';
import GalleryList from 'components/galleries/GalleryList';

function GalleryIndex() {
  return (
    <Page title="Artists List">
      {/* <Typography variant="h2" mt={5}>
        Gallery
      </Typography> */}

      <GalleryList />
    </Page>
  );
}

export default GalleryIndex;
