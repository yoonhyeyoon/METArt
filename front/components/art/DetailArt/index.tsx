import React from 'react';
import { ArtType } from 'types/types';
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
import ToggleButton from '@mui/material/ToggleButton';

function DetailArt(art: ArtType) {
  console.log(art);
  return (
    <div>
      <section>
        <div css={artContainer}>
          <div css={artDiv}>
            <div css={artImgDiv}>
              <img src={art.tokenURI} alt="image" css={artImg} />
            </div>
            <div css={artDescription}>
              <h1 css={artName}>{art.name}</h1>
              <h3>Description</h3>
              <p css={artInfo}>{art.description}</p>
            </div>
            <div>
              <div css={artButtonSize}>
                <button css={artButton}>상품 구매하기</button>
              </div>
              {/* {art.onSaleYn ? (
                <ToggleButton
                  value="saleStop"
                  sx={{
                    bgcolor: 'black',
                    px: 13,
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'black',
                    },
                  }}
                >
                  판매 중지하기
                </ToggleButton>
              ) : (
                <ToggleButton
                  value="sale"
                  sx={{
                    bgcolor: 'black',
                    px: 13,
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'black',
                    },
                  }}
                >
                  판매하기
                </ToggleButton>
              )} */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailArt;
