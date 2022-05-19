import Link from 'next/link';
import { Box, Typography, Grid } from '@mui/material';
import PopularGalleryList from './PopularGalleryList';
import ToggleButton from '@mui/material/ToggleButton';
import ArtCard from 'components/common/ArtCard';
import NewArtList from './NewArtList';

function LandingSummary() {
  return (
    <Box mt="105vh">
      <Box mb={18}>
        <Typography variant="h3" mb={4} fontFamily="inherit">
          Popular Gallery
        </Typography>
        <PopularGalleryList />
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Link href="/galleries">
            <ToggleButton value="more" sx={{ px: 15 }}>
              <a style={{ color: 'black' }}>More</a>
            </ToggleButton>
          </Link>
        </Box>
      </Box>
      <Box mb={18}>
        <Typography variant="h3" mb={4} fontFamily="inherit">
          New Art
        </Typography>
        <Grid container spacing={4}>
          <NewArtList />
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Link href="/arts">
            <ToggleButton value="more" sx={{ px: 15 }}>
              <a style={{ color: 'black' }}>More</a>
            </ToggleButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default LandingSummary;
