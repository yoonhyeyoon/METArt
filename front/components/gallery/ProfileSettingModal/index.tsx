import React from 'react';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { styledModal } from './styles';
import ProfileSetting from '../ProfileSetting';

function ProfileSettingModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <ToggleButton value="setting" onClick={handleOpen}>
        Setting
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
            <ProfileSetting />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ProfileSettingModal;
