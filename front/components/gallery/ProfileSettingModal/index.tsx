import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { styledInput, styledModal } from './styles';
import ProfileSetting from '../ProfileSetting';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfo } from 'recoil/userInfo';
import { updateUserAPI } from 'api/user';

type gallerInfo = {
  name: string;
  biography: string;
  profileUrl: string;
};

type Props = {
  handelProfileUpdate: (data: gallerInfo) => void;
};

function ProfileSettingModal({ handelProfileUpdate }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userAccount, setUserAccount] = useRecoilState(userInfo);

  const { address, profileUrl, nickname, biography } = useRecoilValue(userInfo);
  // console.log(biography);
  const [fileImg, setFileImg] = useState<string>(profileUrl);
  const [profileImgFile, setProfileImgFile] = useState<File | ''>();
  const [name, setName] = useState(nickname);
  const [description, setDescription] = useState(biography);

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const clickFileImg = () => {
    hiddenFileInput.current?.click();
  };

  const saveFileImg = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (!e?.target.files) return;
    if (e?.target.files[0]) {
      setFileImg(URL.createObjectURL(e?.target.files[0]));
      setProfileImgFile(e?.target.files[0]);
      console.log(e?.target.files[0]);
    }
  };

  const deleteFileImg = () => {
    URL.revokeObjectURL(fileImg);
    setFileImg('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    // console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (profileImgFile) {
      formData.append('profileImgFile', profileImgFile);
    }
    formData.append('name', name);
    formData.append('biography', description);
    // console.log(name, description, fileImg);
    const { data } = await updateUserAPI(address, formData);
    console.log(data);
    setUserAccount({
      address: data.address,
      createdAt: data.createdAt,
      nickname: data.name,
      profileUrl: data.profileUrl,
      biography: data.biography,
    });
    handelProfileUpdate({
      name: data.name,
      biography: data.biography,
      profileUrl: data.profileUrl,
    });
    setOpen(false);
  };
  return (
    <div>
      <ToggleButton value="setting" onClick={handleOpen}>
        Profile Setting
      </ToggleButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styledModal}>
            <>
              <TableContainer>
                <Table>
                  <TableRow>
                    <TableCell sx={{ fontFamily: 'Georgia' }}>
                      Picture
                    </TableCell>
                    <TableCell>
                      {fileImg && (
                        <img
                          src={fileImg}
                          alt="sample"
                          width={100}
                          style={{ borderRadius: '20px' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item>
                          <ToggleButton
                            value="imgUpload"
                            onClick={clickFileImg}
                            sx={{ width: 100 }}
                          >
                            찾아보기
                          </ToggleButton>
                        </Grid>
                        <input
                          ref={hiddenFileInput}
                          id="imgUpload"
                          name="imgUpload"
                          type="file"
                          accept="image/*"
                          onChange={saveFileImg}
                          hidden
                        />
                        <Grid item>
                          <ToggleButton
                            value="삭제"
                            onClick={() => deleteFileImg()}
                            sx={{ width: 100 }}
                          >
                            삭제
                          </ToggleButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <label htmlFor="name">Name</label>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <input
                        id="name"
                        type="text"
                        css={styledInput}
                        value={name}
                        onChange={handleNameChange}
                        style={{ fontFamily: 'Georgia' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <label htmlFor="bio">Bio</label>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <textarea
                        id="bio"
                        css={styledInput}
                        value={description}
                        onChange={handleDescriptionChange}
                      >
                        {description}
                      </textarea>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
              <Container>
                <Box
                  component="span"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 3,
                  }}
                >
                  <ToggleButton
                    value="save"
                    sx={{
                      bgcolor: 'black',
                      px: 13,
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'black',
                      },
                    }}
                    onClick={handleSubmit}
                  >
                    Save
                  </ToggleButton>
                </Box>
              </Container>
            </>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ProfileSettingModal;
