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
  artPrice,
} from './styles';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import ArtInfoTable from '../ArtInfoTable';
import { SdCardAlert } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { userInfoState } from 'recoil/userInfo';

function DetailArt(art: ArtType) {
  const userInfo = useRecoilValue(userInfoState);
  console.log(userInfo);
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
              <span css={artPrice}>
                {art.onSaleYn
                  ? art.sale.price + ' ETH'
                  : '현재 구매가 불가능한 작품입니다.'}
              </span>
            </div>
            <Box sx={{ paddingTop: 8 }}>
              <ToggleButton
                value="saleStop"
                sx={{
                  px: 15,
                  '&:hover': {
                    bgcolor: 'black',
                    color: 'white',
                    transition: 'background 0.3s ease-in-out',
                  },
                }}
              >
                {art.owner.address == userInfo.address
                  ? art.onSaleYn
                    ? '판매 중지하기'
                    : '판매하기'
                  : '구매하기'}
              </ToggleButton>
            </Box>
            <ArtInfoTable />
            <p css={artInfo}>{art.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailArt;
