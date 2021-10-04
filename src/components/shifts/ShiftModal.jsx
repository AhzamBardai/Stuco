import React from 'react';
import { Typography, Fade, Backdrop, Modal, TextField, } from '@mui/material';
import { Box } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  xs:{
      width: 100
  }
};

export default function MemberModal({ open, shift, handleClose }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            
            <TextField 
              value={shift}
            />
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}