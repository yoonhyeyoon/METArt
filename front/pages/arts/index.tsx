import { Box, Paper, InputBase, Divider, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Page from '../../Layouts/Page';

function ArtList() {
  return (
    <Page>
      <Paper
        variant="outlined"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          flexGrow: 2,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="작품 이름을 입력하세요."
          onChange={() => {}}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: '10px' }} onClick={() => {}}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Page>
  );
}

export default ArtList;
