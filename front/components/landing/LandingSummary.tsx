import { Box, Typography, Grid } from '@mui/material';
import ArtCard from 'components/common/ArtCard';

function LandingSummary() {
  return (
    <Box mt="100vh">
      <Box mb={10}>
        <Typography variant="h3" mb={2}>
          New Arts
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <ArtCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <ArtCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <ArtCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <ArtCard />
          </Grid>
        </Grid>
      </Box>
      <Box mb={10}>
        <Typography variant="h3" mb={2}>
          Popular Galleries
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <ArtCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <ArtCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <ArtCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <ArtCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default LandingSummary;
