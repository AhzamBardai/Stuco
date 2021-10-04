import React, { useState, useEffect } from 'react';
import { Typography, Fade, Backdrop, Modal, TextField, Button, Stack, Input, IconButton, Popover } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import CloseIcon from '@mui/icons-material/Close';
import Picker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const style = {
  height: '500px',
  overflowY: 'scroll',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  sm:{
      width: 100
  }
};

export default function AnnouncementModal({ open, handleClose, edit, editAnn }) {

  const { user, url, setAnn } = useUserContext()
  const [newAnn, setNewAnn] = useState({ title: '', image: '', file: '', body: '' })
  const [toEdit, setToEdit] = useState()

  
  const emojiClick = (event, emojiObject) => {
    const emojiBody = newAnn.body + emojiObject.emoji
    setNewAnn({...newAnn, body: emojiBody})
  }

  useEffect(() => {
    if(edit && toEdit === undefined) {
      axios.get(url + `announcements/${editAnn._id}`)
        .then(res => setToEdit(res.data))
    }
  }, [edit, editAnn, newAnn._id, toEdit, url])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newAnn)
    if(edit) {
      axios.put(url + `announcements/${toEdit._id}`, {...toEdit, userId: user._id})
      .then(res => {
        console.log(res.data)
        axios.get(url + 'announcements/')
        .then(res => {
          setAnn(res.data)
        })
        .catch(() => window.alert('ann axios error'))
      })
      setNewAnn({ title: '', image: '', file: '', body: '' })
    }
    else if(user){
      axios.post(url + 'announcements/new', {...newAnn, userId: user._id})
        .then(() => {
          axios.get(url + 'announcements/')
          .then(res => {
            setAnn(res.data)
          })
          .catch(() => window.alert('ann axios error'))
        })
        setNewAnn({ title: '', image: '', file: '', body: '' })
      }
    }
    // popover
    const [anchorEl, setAnchorEl] = useState(null)
    const handlePopClick = (event) => setAnchorEl(event.currentTarget); 
    const handlePopClose = () => setAnchorEl(null);
    

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
            <form noValidate autoComplete="off" onSubmit={handleSubmit} >
              <Stack spacing={4}  >

                <Stack direction='row' sx={{ display: 'flex', justifyContent:'center', alignItems: 'center'  }} >
                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{flexGrow: 1}} >
                  New Announcement
                </Typography>

                <IconButton onClick={() => handleClose()}  >
                  <CloseIcon />
                </IconButton>

                </Stack>
                
                <TextField 
                  variant='outlined'
                  required
                  fullWidth
                  rows={3}
                  multiline
                  value={ edit ? toEdit?.body : newAnn.body }
                  
                  onChange={e => edit ? setToEdit({...toEdit, body: e.currentTarget.value}) : setNewAnn({...newAnn, body: e.currentTarget.value})}
                  label='Announcement'
                  InputProps={{
                    endAdornment: <IconButton position='end' onClick={handlePopClick} > { anchorEl === null ? <EmojiEmotionsIcon/> : <CloseIcon /> } </IconButton>
                  }}
                />
                {/* emoji picker popover */}
                <Popover
                  open={Boolean(anchorEl)}
                  onClose={handlePopClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Picker onEmojiClick={emojiClick} />
                </Popover>    

                <Stack direction='row' sx={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-evenly'}} >
                  <TextField 
                    variant='outlined'
                    fullWidth
                    value={ edit ? toEdit?.image : newAnn.image }
                    onChange={e => edit ? setToEdit({...toEdit, image: e.currentTarget.value}) : setNewAnn({...newAnn, image: e.currentTarget.value})}
                    label='Image URL'
                  />
                  <Typography sx={{m: 2}} > OR </Typography>

                  <label>
                    <Button variant="contained" component="span" sx={{height: '100%'}} >
                    <Input  accept="image/*" id="contained-button-file" multiple type="file" sx={{display: 'none'}} />
                      Upload
                    </Button>
                  </label>

                </Stack>

                {/* <TextField 
                  fullWidth
                  value={ newAnn.file }
                  onChange={e => setNewAnn({...newAnn, file: e.currentTarget.value})}
                  label='File'
                /> */}
                  
                <Button variant='contained' type='submit' onClick={handleClose} >
                  {edit ? 'Update' : 'Create'}
                </Button>

              </Stack>
            </form>
            {/* <TextField value={filter} onChange={(e) => setFilter(e.target.value)} helperText='Filter through list here.' /> */}
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}