import React from 'react';
import { Typography, Fade, Backdrop, Modal, TextField } from '@mui/material';
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

export default function ShiftInfoModal({ open, handleClose, shift }) {

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

            <Typography id="transition-modal-title" variant="h6" component="h2">
              { shift && shift.title}
            </Typography>
            {console.log(shift)}
            {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Start - { shift && shift.start}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              End - { shift && shift.end}
            </Typography> */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Assigned To - { shift && shift.extendedProps.member}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Assigned By - { shift && shift.extendedProps.assignedBy}
            </Typography>
                        
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}