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
import { createSaleAPI, cancelSaleAPI } from 'api/art';

type Props = {
  owner: string;
  address: string;
  onSaleYn: boolean;
  tokenId: number;
  saleId: number | null;
};

function ToggledBtn({ owner, address, onSaleYn, tokenId, saleId }: Props) {
  const [openSell, setSellOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [tokenSaleId, setTokenSaleId] = useState<number | null>(saleId);
  const [isOnSale, setIsOnSale] = useState<boolean>(onSaleYn);

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
    if (price < 0.0001) return alert('0.0001ETH 보다 커야합니다.');
    try {
      // SC 판매 등록하기
      const { auctionContract } = await import('contract/web3Config');
      auctionContract.methods
        .createSale(tokenId, String(price * 10 ** 18))
        .send({ from: address })
        .on('transactionHash', (hash: String) => {
          // 백엔드에 판매정보 등록하기
          createSaleAPI({
            tx: hash,
            tokenId: tokenId,
          })
            .then(({ data }) => {
              setIsOnSale(true);
              setTokenSaleId(data.id);
              handleSellClose();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } catch (error) {
      console.dir(error);
    }
  };

  // 판매 중지 하기
  const onClickCancelSale = async () => {
    const { auctionContract } = await import('contract/web3Config');
    // SC 판매 중지
    auctionContract.methods
      .cancelSale(tokenSaleId)
      .send({ from: address })
      .on('transactionHash', (hash: String) => {
        // 백엔드에 판매 중지 정보 등록하기
        cancelSaleAPI({ tx: hash }, tokenSaleId)
          .then((res) => {
            console.log(res);
            setIsOnSale(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  if (owner === address) {
    return isOnSale ? (
      <ToggleButton
        onClick={onClickCancelSale}
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
    return isOnSale ? (
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
