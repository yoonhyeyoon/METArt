/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import {
  profileBox,
  profileContainer,
  profileDescription,
  profileDiv,
  profileImg,
  profileImgDiv,
  profileInfo,
  profileName,
} from './styles';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import ProfileSettingModal from '../ProfileSettingModal';
import { getProfileAPI } from 'api/gallery';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'recoil/userInfo';

type gallerInfo = {
  name: string;
  biography: string;
  profileUrl: string;
};

function Profile() {
  const router = useRouter();

  const { galleryid } = router.query;
  const { address, profileUrl, nickname, biography } = useRecoilValue(userInfo);
  const { data, isLoading, isError } = getProfileAPI(galleryid);
  console.log(data);
  const [galleryInfo, setGalleryInfo] = useState<gallerInfo>({
    name: '',
    biography: '',
    profileUrl: '',
  });

  useEffect(() => {
    if (data) {
      setGalleryInfo({
        name: data.name,
        biography: data.biography,
        profileUrl: data.profileUrl,
      });
    }
  }, [data]);

  const handelProfileUpdate = (data: gallerInfo) => {
    setGalleryInfo(data);
  };

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <CircularProgress sx={{ color: 'grey' }} />;

  return (
    <Container maxWidth="lg">
      <section>
        <div css={profileContainer}>
          <div css={profileDiv}>
            <div css={profileImgDiv}>
              <img src={galleryInfo.profileUrl} alt="image" css={profileImg} />
            </div>
          </div>
          <div css={profileDiv}>
            <div css={profileDescription}>
              <h1 css={profileName}>{galleryInfo.name}</h1>
              <p css={profileInfo}>{galleryInfo.biography}</p>
              {galleryid == address ? (
                <ProfileSettingModal
                  handelProfileUpdate={handelProfileUpdate}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default Profile;
