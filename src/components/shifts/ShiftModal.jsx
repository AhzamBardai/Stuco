import React, { useState, useEffect } from 'react';
import { Typography, Fade, Backdrop, Modal, Button, Stack, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';


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

const shiftOptions = [
  {
      shift: 'Friday, 6:00 PM - 9:00 PM' ,day: 5, startTime: moment().day(5).hour(18).minute(0).second(0)._d.toISOString(), endTime: moment().day(5).hour(21).minute(0).second(0)._d.toISOString() 
  },
  {
      shift: 'Saturday, 9:00 AM - 12:45 PM', day: 6, startTime: moment().day(6).hour(9).minute(0).second(0)._d.toISOString(), endTime: moment().day(6).hour(12).minute(45).second(0)._d.toISOString() 
  },
  {
      shift: 'Saturday, 12:30 PM - 3:45 PM', day: 6, startTime: moment().day(6).hour(12).minute(30).second(0)._d.toISOString(), endTime: moment().day(6).hour(15).minute(45).second(0)._d.toISOString() 
  },
  {
      shift: 'Saturday, 3:30 PM - 6:45 PM', day: 6, startTime: moment().day(6).hour(15).minute(30).second(0)._d.toISOString(), endTime: moment().day(6).hour(18).minute(45).second(0)._d.toISOString() 
  },
];

export default function ShiftModal({ open, handleClose, getData }) {



  const { user, url, users, setShifts, setUsers } = useUserContext()
  const [selected, setSelected] = useState()
  const [userSelected, setUserSelected] = useState()

  useEffect(() => {
    if(user && user.isAdmin){
      axios.get(url + `users/${user._id}`)
        .then(res => {
            setUsers(res.data)
        })

    }
  }, [setUsers, url, user, user?._id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(user && users){
      const obj = {shiftOption:{ title: selected.shift , start: selected.startTime, end: selected.endTime }, assignedBy: user, assignedTo: userSelected.fullName}
      axios.post(url + 'shifts/new', obj)
        .then(() => {
          axios.get(url + 'shifts/')
            .then(res => setShifts(res.data))
        })
      handleClose()
    }
    setSelected(null)
    setUserSelected(null)
    getData()
  }


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
                  New Shift
                </Typography>

                <IconButton onClick={() => handleClose()}  >
                  <CloseIcon />
                </IconButton>

                </Stack>
                
                <FormControl fullWidth>
                  <InputLabel >Shift Options</InputLabel>
                  <Select
                    value={selected ? selected : ''}
                    label="Age"
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    {shiftOptions.map((item, ind) => {
                      return (<MenuItem key={item.shift} value={item} > {item.shift} </MenuItem>)
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel >Members</InputLabel>
                  <Select
                    value={userSelected ? userSelected : ''}
                    label="Members"
                    onChange={(e) => setUserSelected(e.target.value)}
                  >
                    {users && users.map((item, ind) => {
                      return (<MenuItem value={item} > {item.fullName} </MenuItem>)
                    })}
                  </Select>
                </FormControl>

                
                  <Stack direction='row'>
                    <Button sx={{flexGrow: 1}} variant='contained' type='submit' onClick={handleClose} >
                      Create
                    </Button>
                    { user && user.isAdmin && <IconButton  > <DeleteIcon /> </IconButton>}
                </Stack>

              </Stack>
            </form>
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}