import React from 'react';
import { Typography, Fade, Backdrop, Modal, TextField, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';


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

export default function MemberModal({ open, handleClose, filter, setFilter }) {

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
            <IconButton sx={{float: 'right' , m: 0}} onClick={() => handleClose()} >
                  <CloseIcon />
              </IconButton>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Enter filter here
            </Typography>
            
            <TextField value={filter} onChange={(e) => setFilter(e.target.value)} helperText='Filter through list here.' />
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}