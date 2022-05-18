import { Box, CircularProgress, Stack } from '@mui/material';

function LoadingBar() {
  return (
    <Box
      sx={{
        marginTop: '0 !important',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Stack alignItems="center">
          <CircularProgress />
          <Box mt="10px">잠시만 기다려 주세요...</Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoadingBar;
