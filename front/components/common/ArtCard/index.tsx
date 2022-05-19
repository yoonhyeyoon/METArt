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
import { ArtListType, ContentType } from 'types/types';
import Link from 'next/link';
import { artPrice, caption, transParentBox } from '../GalleryCard/styled';
import ImageListItem from '@mui/material/ImageListItem';
import { useRouter } from 'next/router';

export default function ArtCard(art: ContentType) {
  const router = useRouter();
  // console.log(art);
  return (
    <Card sx={{ boxShadow: 'rgb(0 0 0 / 5%) 2px 2px 20px' }}>
      <CardHeader
        avatar={
          art.creator ? (
            <Avatar
              sx={{ cursor: 'pointer' }}
              alt="Ted talk"
              src={art.owner.profileUrl}
              onClick={() => router.push(`/galleries/${art.owner.address}`)}
            />
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
          art.owner ? (
            art.owner.name
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
          art.name ? (
            art.name
          ) : (
            <Skeleton animation="wave" height={10} width="40%" />
          )
        }
      />

      {art.tokenURI ? (
        <div onClick={() => router.push(`/arts/${art.id}`)}>
          <img
            src={art.tokenURI}
            alt=""
            height={300}
            width={350}
            style={{ objectFit: 'cover', cursor: 'pointer' }}
          />
        </div>
      ) : (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      )}

      <CardContent>
        {art.sale ? (
          <span style={{ textAlign: 'center' }}>
            {art.sale?.price / 10 ** 18} ETH
          </span>
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
    </Card>
  );
}
