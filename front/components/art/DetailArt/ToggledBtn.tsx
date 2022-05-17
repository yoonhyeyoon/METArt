import { useState } from 'react';
import {
  Box,
  ToggleButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { createSaleAPI } from 'api/art';

type Props = {
  owner: String;
  address: String;
  onSaleYn: Boolean;
  tokenId: Number;
};

function ToggledBtn({ owner, address, onSaleYn, tokenId }: Props) {
  const [openSell, setSellOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleClickSellOpen = () => {
    setSellOpen(true);
  };

  const handleSellClose = () => {
    setPrice(0);
    setSellOpen(false);
  };

  // 판매하기
  const onClickSale = async () => {
    console.log('salse');
    if (price < 0.0001) return alert('0.0001ETH 보다 커야합니다.');
    try {
      // SC 판매 등록하기
      const { auctionContract } = await import('contract/web3Config');
      auctionContract.methods
        .createSale(tokenId, String(price * 10 ** 18))
        .send({ from: address })
        .on('transactionHash', (hash: String) => {
          createSaleAPI({
            tx: hash,
            tokenId: tokenId,
          })
            .then(({ data }) => {
              handleSellClose();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      // 백엔드에 판매정보 등록하기

      // 판매 상세 페이지로 이동시키기
    } catch (error) {
      console.dir(error);
    }
  };

  if (owner === address) {
    return onSaleYn ? (
      <ToggleButton
        onClick={() => {}}
        value="stopSale"
        sx={{
          px: 15,
          '&:hover': {
            bgcolor: 'black',
            color: 'white',
            transition: 'background 0.3s ease-in-out',
          },
        }}
      >
        판매 중지하기
      </ToggleButton>
    ) : (
      <>
        <ToggleButton
          onClick={handleClickSellOpen}
          value="onSale"
          sx={{
            px: 15,
            '&:hover': {
              bgcolor: 'black',
              color: 'white',
              transition: 'background 0.3s ease-in-out',
            },
          }}
        >
          판매하기
        </ToggleButton>
        <Dialog open={openSell} onClose={handleSellClose}>
          <DialogTitle>판매하기</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="가격을 입력해 주세요. (eth)"
              type="Number"
              fullWidth
              variant="standard"
              value={price}
              onChange={onChangePrice}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClickSale}>판매</Button>
            <Button onClick={handleSellClose}>취소</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } else {
    return onSaleYn ? (
      <ToggleButton
        value="buy"
        onClick={() => {}}
        sx={{
          px: 15,
          '&:hover': {
            bgcolor: 'black',
            color: 'white',
            transition: 'background 0.3s ease-in-out',
          },
        }}
      >
        구매 하기
      </ToggleButton>
    ) : (
      <Box></Box>
    );
  }
}

export default ToggledBtn;
