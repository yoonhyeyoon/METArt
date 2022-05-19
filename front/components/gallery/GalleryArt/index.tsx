import React from 'react';
import { ContentType } from 'types/types';
import { galleryArtItem } from './styles';
import {
  artPrice,
  artPriceUp,
  caption,
  transParentBox,
} from 'components/common/GalleryCard/styled';
import ImageListItem from '@mui/material/ImageListItem';
import { useRouter } from 'next/router';

function GalleryArt(art: ContentType) {
  const router = useRouter();
  return (
    <ImageListItem
      onClick={() => router.push(`/arts/${art.id}`)}
      key={art.id}
      sx={{
        // position: 'relative',
        backgroundColor: 'white',
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
      <img
        src={`${art.tokenURI}?w=248&fit=crop&auto=format`}
        srcSet={`${art.tokenURI}?w=248&fit=crop&auto=format&dpr=2 2x`}
        loading="lazy"
        className="img"
      />
      <div css={transParentBox} className="transparent-box">
        <div css={caption} className="caption">
          <p css={artPriceUp}>
            {art.sale ? <p>{art.sale?.price / 10 ** 18} EHT</p> : null}
          </p>
          <p css={artPrice}>{art.name}</p>
        </div>
      </div>
    </ImageListItem>
  );
}

export default GalleryArt;
