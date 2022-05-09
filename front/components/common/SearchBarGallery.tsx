import { Paper, InputBase, Divider, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClick: React.MouseEventHandler<HTMLButtonElement>;
};

function GalleryList({ handleSearchChange, handleSearchClick }: Props) {
  return (
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
        placeholder="갤러리 이름을 입력하세요."
        onChange={handleSearchChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px' }} onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default GalleryList;
