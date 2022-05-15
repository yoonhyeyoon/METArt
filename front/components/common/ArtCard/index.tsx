import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { ArtListType } from 'types/types';
import Link from 'next/link';

export default function ArtCard(art: ArtListType) {
  console.log(art);
  return (
    <Card>
      <CardHeader
        avatar={
          art.creator ? (
            <Avatar alt="Ted talk" src={art.creator.profileUrl} />
          ) : (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          )
        }
        title={
          art.creator ? (
            art.creator.name
          ) : (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          )
        }
        subheader={
          art.creator ? (
            '5 hours ago'
          ) : (
            <Skeleton animation="wave" height={10} width="40%" />
          )
        }
      />

      <Link href={`/arts/${art.id}`}>
        {art.tokenURI ? (
          <CardMedia
            component="img"
            height="300"
            image={art.tokenURI}
            alt="green iguana"
            sx={{ cursor: 'pointer' }}
          />
        ) : (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        )}
      </Link>
      <CardContent>
        {art.name ? (
          // <Typography gutterBottom variant="h5" component="div">
          // </Typography>
          <Typography variant="body2" color="text.secondary">
            {art.name}
          </Typography>
        ) : (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        )}
      </CardContent>

      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
