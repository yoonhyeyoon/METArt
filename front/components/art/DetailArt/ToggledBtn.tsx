import { useState } from 'react';
import {
  Box,
  ToggleButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { createSaleAPI, cancelSaleAPI, purchaseSaleAPI } from 'api/art';
import LoadingBar from 'components/common/LoadingBar';

type Props = {
  owner: string;
  address: string;
  onSaleYn: boolean;
  tokenId: number;
  saleId: number | null;
  price: number | null;
};

function ToggledBtn({
  owner,
  address,
  onSaleYn,
  tokenId,
  saleId,
  price,
}: Props) {
  const [openSell, setSellOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [salePrice, setSalePrice] = useState<string>('0');
  const [tokenSaleId, setTokenSaleId] = useState<number | null>(saleId);
  const [isOnSale, setIsOnSale] = useState<boolean>(onSaleYn);

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalePrice(String(e.target.value));
  };

  const handleClickSellOpen = () => {
    setSellOpen(true);
  };

  const handleSellClose = () => {
    setSalePrice('0');
    setSellOpen(false);
  };

  // 판매하기
  const onClickSale = async () => {
    if (Number(salePrice) < 0.0001) return alert('0.0001ETH 보다 커야합니다.');
    setSellOpen(false);
    setLoading(true);
    try {
      // SC 판매 등록하기
      const { auctionContract } = await import('contract/web3Config');
      await auctionContract.methods
        .createSale(tokenId, String(Number(salePrice) * 10 ** 18))
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
      setLoading(false);
    }
    setLoading(false);
  };

  // 판매 중지 하기
  const onClickCancelSale = async () => {
    const { auctionContract } = await import('contract/web3Config');
    setLoading(true);
    try {
      // SC 판매 중지
      await auctionContract.methods
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
              setLoading(false);
            });
        });
    } catch (error) {
      console.dir(error);
      setLoading(false);
    }
    setLoading(false);
  };

  // 구매 하기
  const onClickBuy = async () => {
    const { auctionContract } = await import('contract/web3Config');
    setLoading(true);
    try {
      // SC 구매 하기
      await auctionContract.methods
        .purchase(tokenSaleId)
        .send({ from: address, value: price })
        .on('transactionHash', (hash: string) => {
          // 백엔드에 구매하기 요청
          purchaseSaleAPI({ tx: hash }, tokenSaleId)
            .then((res) => {
              console.log(res);
              // 라우팅 어디로???
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } catch (error) {
      console.dir(error);
      setLoading(false);
    }
    setLoading(false);
  };

  if (owner === address) {
    return isOnSale ? (
      <>
        <ToggleButton
          onClick={onClickCancelSale}
          value="stopSale"
          sx={{
            px: 15,
            bgcolor: 'black',
            color: 'white',
            '&:hover': {
              bgcolor: '#424242',
              color: 'white',
              transition: 'background 0.3s ease-in-out',
            },
          }}
        >
          판매 중지하기
        </ToggleButton>
        {console.log(loading)}
        {loading && <LoadingBar />}
      </>
    ) : (
      <>
        <ToggleButton
          onClick={handleClickSellOpen}
          value="onSale"
          sx={{
            px: 15,
            bgcolor: 'black',
            color: 'white',
            '&:hover': {
              bgcolor: '#424242',
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
              value={salePrice}
              inputProps={{
                maxLength: 13,
                step: '0.001',
              }}
              onChange={onChangePrice}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClickSale}>판매</Button>
            <Button onClick={handleSellClose}>취소</Button>
          </DialogActions>
        </Dialog>
        {loading && <LoadingBar />}
      </>
    );
  } else {
    return isOnSale ? (
      <>
        <ToggleButton
          value="buy"
          onClick={onClickBuy}
          sx={{
            px: 15,
            bgcolor: 'black',
            color: 'white',
            '&:hover': {
              bgcolor: '#424242',
              color: 'white',
              transition: 'background 0.3s ease-in-out',
            },
          }}
        >
          구매 하기
        </ToggleButton>
        {loading && <LoadingBar />}
      </>
    ) : (
      <Box>구매할 수 없는 상품입니다.</Box>
    );
  }
}

export default ToggledBtn;
