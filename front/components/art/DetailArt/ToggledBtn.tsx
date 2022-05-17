import { Box, ToggleButton } from '@mui/material';

function ToggledBtn({
  owner,
  address,
  onSaleYn,
  onClick,
}: {
  owner: String;
  address: String;
  onSaleYn: Boolean;
  onClick: (key: String) => void;
}) {
  if (owner === address) {
    return onSaleYn ? (
      <ToggleButton
        onClick={(e) => onClick('stopSale')}
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
      <ToggleButton
        onClick={(e) => onClick('onSale')}
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
    );
  } else {
    return onSaleYn ? (
      <ToggleButton
        value="buy"
        onClick={(e) => onClick('buy')}
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
