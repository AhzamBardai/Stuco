import React, { useState, useEffect } from 'react'
import { Avatar, Button, Card, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import AnnouncementModal from './NewAnnounceModal';
import moment from 'moment';
// import { useTheme } from '@mui/system';


function Announcements() {
    // const theme = useTheme()
    // new ann modal
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)

    // edit ann modal
    const [edit, setEdit] = useState(false)
    const [editAnn, setEditAnn] = useState()
    const handleEdit = (item) => {
        setEditAnn(item)
        setEdit(true)
        setOpen(true)
    }

    const wid500 = useMediaQuery('(min-width: 500)')
    const { user, url, ann, setAnn } = useUserContext()

    useEffect(() => {
        axios.get(url + 'announcements/')
            .then(res => {
                setAnn(res.data)
            })
            .catch(() => window.alert('ann axios error'))
    }, [setAnn, url])


    

    return (
        <Paper elevation={6} sx={{  height: '75vh',width: { sm: '500px', xs: '100%'}, pb: 2, overflowY: 'scroll', flexGrow: 1, background: 'whitesmoke'}} >
                <Card elevation={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }} >
                    <Typography variant='h4' sx={{flexGrow: 1}} >
                        Announcements
                    </Typography>
                    {(user && !user.isAdmin) ? null : wid500  ? <IconButton onClick={() => setOpen(true)} > <AddIcon /> </IconButton> : <Button onClick={() => setOpen(true)} >New <AddIcon fontSize='small' /> </Button> }
                </Card>

                { ann && ann.map(item => {
                    return (
                        <Card sx={{m: '20px 25px', p: 1, cursor: 'pointer'}} elevation={3} onClick={() => handleEdit(item)} >
                            <Stack direction='row' sx={{display: 'flex', alignItems: 'center'}}>
                                <Avatar sx={{display: 'inline-block', mr: 1}} >{item.authorImage !== '' ? item.authorImage : null }</Avatar>
                                <Typography variant='body1'  >
                                    {item.author} <span  style={{color:'gray', fontSize:'10px'}}> ~at, {moment(item.createdAt).format("dddd, MMMM Do YYYY, h:mm a")} </span>
                                </Typography>


                            </Stack>
                            <Divider sx={{my: 1}} ></Divider>
                            <Stack >
                            
                            <Typography>
                                {item.body}
                            </Typography>
                            </Stack>
                        </Card>
                    )
                })}

            <AnnouncementModal open={open} edit={edit} editAnn={editAnn} handleClose={handleClose} />
        </Paper>
    )
}

export default Announcements
