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
  console.log(art);
  return (
    <Card sx={{ boxShadow: 'rgb(0 0 0 / 5%) 2px 2px 20px' }}>
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
          art.name ? (
            art.name
          ) : (
            <Skeleton animation="wave" height={10} width="40%" />
          )
        }
      />

      <ImageListItem
        onClick={() => router.push(`/arts/${art.id}`)}
        sx={{
          overflow: 'hidden',
          color: 'white',
          '& .img': {
            transform: 'scale(1.0)',
            transition: 'transform 0.4s ease',
          },
          '&:hover': {
            cursor: 'pointer',
            '& .caption': {
              opacity: 1,
              transform: 'translateY(-20px)',
            },
            '& .transparent-box': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            '& .img': {
              transform: 'scale(1.1)',
            },
          },
        }}
      >
        {art.tokenURI ? (
          <>
            <img
              src={art.tokenURI}
              alt=""
              height={300}
              width={350}
              style={{ objectFit: 'cover' }}
            />
          </>
        ) : (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        )}

        <div css={transParentBox} className="transparent-box">
          <div css={caption} className="caption">
            {/* <p>1.5 ETH</p> */}
            <p css={artPrice}>{art.name}</p>
          </div>
        </div>
      </ImageListItem>
      <CardContent>
        {art.name ? (
          <span style={{ textAlign: 'center' }}>{art.sale.price} ETH</span>
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
