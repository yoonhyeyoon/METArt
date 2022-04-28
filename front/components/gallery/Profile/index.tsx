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

function Profile() {
  return (
    <div css={profileBox}>
      <section>
        <div css={profileContainer}>
          <div css={profileDiv}>
            <div css={profileImgDiv}>
              <img
                src="https://ww.namu.la/s/c76d184f9514b642b065bdb4b85c1caed6ef1b196a816cf5371f24a5c2500c6260b3959789a4a7aed14ab316112428f5252e07400610b7664e75dc2dc96efe47a3de4704d4171a62dffe2ec7d9d377f5"
                alt="image"
                css={profileImg}
              />
            </div>
          </div>
          <div css={profileDiv}>
            <div css={profileDescription}>
              <h1 css={profileName}>Lee Junho</h1>
              <h3>Info.</h3>
              <p css={profileInfo}>
                작가의 시간쌓기 작업은 인간의 경험에서 얻은 기억을 하나의 단위인
                선과 면으로 기호화하고 이를 쌓거나 나열하여 시간의 집적을
                이야기하고 작품을 통해 삶을 사색한다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
