import React from 'react';
import { Typography, Fade, Backdrop, Modal, IconButton, } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

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

export default function MemberModal({ open, member, handleClose }) {

  const theme = useTheme()
  const textColor = theme.palette.text.primary

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

            <Typography  color={textColor} variant="h6" component="h2">
              { member && member.fullName}
            </Typography>
            <Typography  color={textColor}  sx={{ mt: 2 }}>
              email - { member && member.email}
            </Typography>
            <Typography  color={textColor}  sx={{ mt: 2 }}>
              contact - { member && (member.contact || 'None') }
            </Typography>
            <Typography  color={textColor}  sx={{ mt: 2 }}>
              position - { member && member.position}
            </Typography>
            <Typography  color={textColor}  sx={{ mt: 2 }}>
              Admin - { member && member.isAdmin ? 'Yes' : 'No'}
            </Typography>
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}