import React from 'react';
import {
  artButton,
  artButtonSize,
  artContainer,
  artDescription,
  artDiv,
  artImg,
  artImgDiv,
  artInfo,
  artName,
} from './styles';

function DetailArt() {
  return (
    <div>
      <section>
        <div css={artContainer}>
          <div css={artDiv}>
            <div css={artImgDiv}>
              <img
                src="https://lh3.googleusercontent.com/OsPRVqJ9BzEPaIuAfckQtU6sLTR43uBHvvWgBeebCWiFVXVDQ15OegZ2cy4D0RK_CThF3R5WXXdVmlZevPEv6lpoJMCEJPJHinUN_A=s0"
                alt="image"
                css={artImg}
              />
            </div>
            <div css={artDescription}>
              <h1 css={artName}>NFT ART NAME</h1>
              <h3>Description</h3>
              <p css={artInfo}>이것은 NFT ART에 대한 내용이 들어 있는 곳</p>
            </div>
            <div>
              <div css={artButtonSize}>
                <button css={artButton}>상품 구매하기</button>
              </div>
              <div css={artButtonSize}>
                <button css={artButton}>판매하기</button>
              </div>
              <div css={artButtonSize}>
                <button css={artButton}>판매 중지하기</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailArt;
