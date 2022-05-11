import { useState, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  AccountBalanceWallet as WalletIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userAccountState } from 'recoil/userAccount';

const pages = [
  { name: 'Arts', url: '/arts' },
  { name: 'Gallery', url: '/galleries' },
  { name: 'My art', url: '/galleries/a' },
  { name: 'Add art', url: '/createart' },
];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const router = useRouter();
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const connectAccount = async () => {
    try {
      if (window.ethereum) {
        const account = await window.ethereum.request({
          method: 'eth_accounts',
        });
        // 메타마스크에 로그인이 되어있는 경우
        if (account[0]) {
          // 유저 데이터 받아오기
          setUserAccount('test');
        }
        // 메타마스크 로그인을 해야하는 경우
        else {
          // 지갑 연결 요청
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
        }
      } else {
        alert('Install Metamask! https://metamask.io/download/');
      }
    } catch (error) {
      console.dir(error);
    }
  };

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRoutePage = (url: string) => {
    router.push(url);
  };

  const handleLogin = () => {
    connectAccount();
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setUserAccount('');
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 웹 로고 */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 8,
              display: { xs: 'none', md: 'flex', cursor: 'pointer' },
            }}
            onClick={() => {
              router.push('/');
            }}
          >
            LOGO
          </Typography>

          {/* 모바일 메뉴 바 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu();
                    handleRoutePage(page.url);
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 모바일 로고 */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>

          {/* 웹 메뉴 바 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  handleCloseNavMenu();
                  handleRoutePage(page.url);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* 웹, 모바일 드롭박스 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userAccount ? (
                  <Avatar
                    alt="Kemy Sharp"
                    src="https://img.sbs.co.kr/newsnet/etv/upload/2019/01/31/30000622371_700.jpg"
                  />
                ) : (
                  <WalletIcon />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              {userAccount ? (
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon /> 로그아웃
                </MenuItem>
              ) : (
                <MenuItem onClick={handleLogin}>
                  <AddIcon /> 지갑 연결하기
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
