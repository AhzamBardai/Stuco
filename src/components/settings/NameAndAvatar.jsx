import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, Switch, TextField, Typography, useMediaQuery } from '@mui/material'
import SideBar from '../main/SideBar'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'

function NameAndAvatar() {

    const { user, url } = useUserContext()
    const { fullName, username, contact, email, image, position, darkMode, createdAt, address } = user
    const theme = useTheme()
    const headingColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    const [edit, setEdit] = useState(false)

    return (
        <Container>
            <Stack spacing={2} >
                {/* user info */}

                <Stack direction='row' spacing={2} alignItems='center' >
                    <Avatar sx={{ height: theme.spacing(6), width: theme.spacing(6) }} >
                        { image ? image : fullName.split(' ').map(name => name[0]).join('') }
                    </Avatar>
                    <Stack flexGrow={1} >
                        <Typography fontSize={20} >
                            {fullName}
                        </Typography>
                        <Typography variant='body2' color={theme.palette.text.disabled} >
                            Joined { moment(createdAt).format('MMMM, Do YYYY')}
                        </Typography>
                    </Stack>
                    <Switch checked={edit} onChange={() => setEdit(!edit)} ></Switch>
                </Stack>


                <Typography>
                    PREC Stuco 2021 to 2022 Role: 
                        <Typography component='span' color={headingColor} fontSize={19} sx={{ px: 1 }} >
                            {position}
                        </Typography> 
                </Typography>

                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} justifyContent='space-between' >
                    <Button variant='contained' fullWidth disabled={!edit} >
                        Change Name
                    </Button>
                    <Button variant='contained' fullWidth disabled={!edit} >
                        Change Avatar
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}

export default NameAndAvatar
