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
import { userInfo } from 'recoil/userInfo';
import { metamaskLogin } from 'utils/metamaskLogin';

const pages = [
  { name: 'Art', url: '/arts', login: false },
  { name: 'Gallery', url: '/galleries', login: false },
  { name: 'My Gallery', url: '/galleries/a', login: true },
  { name: 'Add art', url: '/createart', login: true },
];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const router = useRouter();
  const [userAccount, setUserAccount] = useRecoilState(userInfo);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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
    metamaskLogin().then((data) => {
      if (data) {
        setUserAccount({
          address: data.address,
          createdAt: data.createdAt,
          nickname: data.name,
          profileUrl: data.profileUrl,
          biography: data.biography,
        });
      } else {
        setUserAccount({
          address: '',
          createdAt: '',
          nickname: '',
          profileUrl: '',
          biography: '',
        });
      }
    });
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setUserAccount({
      address: '',
      createdAt: '',
      nickname: '',
      profileUrl: '',
      biography: '',
    });
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={
        router.pathname == '/'
          ? { bgcolor: 'rgba(0,0,0,0)', boxShadow: 'none' }
          : { bgcolor: 'rgba(0,0,0,0)', boxShadow: 'none', color: 'black' }
      }
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 웹 로고 */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 8,
              display: {
                xs: 'none',
                md: 'flex',
                cursor: 'pointer',
                fontFamily: 'Georgia',
                fontWeight: 'bold',
              },
            }}
            onClick={() => {
              router.push('/');
            }}
          >
            METArt
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
            METArt
          </Typography>

          {/* 웹 메뉴 바 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              if (userAccount.address || !page.login) {
                return (
                  <Button
                    key={page.name}
                    onClick={() => {
                      handleCloseNavMenu();
                      handleRoutePage(page.url);
                    }}
                    sx={
                      router.pathname == '/'
                        ? {
                            my: 2,
                            mx: 4,
                            color: 'white',
                            display: 'block',
                            fontFamily: 'Georgia',
                          }
                        : {
                            my: 2,
                            mx: 4,
                            color: 'black',
                            display: 'block',
                            fontFamily: 'Georgia',
                          }
                    }
                  >
                    {page.name}
                  </Button>
                );
              }
            })}
          </Box>

          {/* 웹, 모바일 드롭박스 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userAccount.address ? (
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
              {userAccount.address ? (
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
