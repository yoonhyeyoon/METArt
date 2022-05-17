import { ArtType } from 'types/types';
import { artImg } from './styles';
import { Box, Container, ToggleButton, Stack, Typography } from '@mui/material';
import ArtInfoTable from '../ArtInfoTable';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'recoil/userInfo';
import ToggledBtn from './ToggledBtn';

function DetailArt(art: ArtType) {
  const { address } = useRecoilValue(userInfo);

  const handleOnclick = (key: String) => {
    console.log(key);
  };

  return (
    <Container>
      <Stack justifyContent="center" alignItems="center" spacing={4}>
        {/* 뱃지 이미지 */}
        <Box sx={{ overflow: 'hidden' }}>
          <img alt="작품 이미지" src={art.tokenURI} css={artImg} />
        </Box>
        <Typography variant="h3">{art.name}</Typography>
        <Typography variant="h6">{art.description}</Typography>
        <ToggledBtn
          onClick={(key) => {
            handleOnclick(key);
          }}
          owner={art.owner.address}
          address={address}
          onSaleYn={art.onSaleYn}
        />
        <ArtInfoTable />
      </Stack>
    </Container>
  );
}

export default DetailArt;
