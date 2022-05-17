import ImageListItem from '@mui/material/ImageListItem';
import { CreatorOwnerType } from 'types/types';
import { artPrice, caption, transParentBox } from './styled';
import { useRouter } from 'next/router';

export default function GalleryCard(user: CreatorOwnerType) {
  const router = useRouter();
  return (
    <ImageListItem
      onClick={() => router.push(`/galleries/${user.address}`)}
      key={user.address}
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
      <img
        src={`${user.profileUrl}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${user.profileUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        // alt={item.title}
        loading="lazy"
      />
      <div css={transParentBox} className="transparent-box">
        <div css={caption} className="caption">
          {/* <p>1.5 ETH</p> */}
          <p css={artPrice}>{user.name}</p>
        </div>
      </div>
    </ImageListItem>
  );
}
