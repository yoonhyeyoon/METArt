/** @jsxImportSource @emotion/react */
import React from 'react';
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
import ProfileSettingModal from '../ProfileSettingModal';

function Profile() {
  return (
    <Container maxWidth="lg">
      <section>
        <div css={profileContainer}>
          <div css={profileDiv}>
            <div css={profileImgDiv}>
              <img
                src="https://img.sbs.co.kr/newsnet/etv/upload/2019/01/31/30000622371_700.jpg"
                alt="image"
                css={profileImg}
              />
            </div>
          </div>
          <div css={profileDiv}>
            <div css={profileDescription}>
              <h1 css={profileName}>Kim Seo-hyung</h1>
              <h3>Info.</h3>
              <p css={profileInfo}>
                작가의 시간쌓기 작업은 인간의 경험에서 얻은 기억을 하나의 단위인
                선과 면으로 기호화하고 이를 쌓거나 나열하여 시간의 집적을
                이야기하고 작품을 통해 삶을 사색한다.
              </p>
              <ProfileSettingModal />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default Profile;
