import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, Switch, TextField, Typography, useMediaQuery } from '@mui/material'
import SideBar from '../main/SideBar'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'


function AuthInfo() {

    const { user, url, textVariant } = useUserContext()
    const { fullName, username, contact, email, image, position, darkMode, createdAt, address } = user
    const theme = useTheme()
    const headingColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    const [edit, setEdit] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(true)

    const toggleEdit = (e) => {
        e.preventDefault()
        setEdit(!edit)
        setIsReadOnly(!isReadOnly)
    }

    return (
        <Container>
            <Stack spacing={3}>

                <Stack direction='row' justifyContent='space-between' >
                    <Typography variant='body1' color={headingColor} fontSize={19} >
                        Authorization Details
                    </Typography>
                    <Switch checked={edit} onChange={toggleEdit} ></Switch>
                </Stack>


                    <TextField
                        label='Email'
                        variant={textVariant}
                        size='small'
                        defaultValue={email}
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            readOnly: isReadOnly
                        }}
                    />

                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} >

                    <TextField
                        label='Username'
                        variant={textVariant}
                        size='small'
                        defaultValue={username}
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            readOnly: isReadOnly
                        }}
                    />
                        
                    <TextField
                        label='Password'
                        type='password'
                        variant={textVariant}
                        size='small'
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            readOnly: isReadOnly
                        }}
                    />

                </Stack>

                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} justifyContent='space-between'>
                    <Stack sx={{ width: '100%' }}>
                        <Button variant='contained' fullWidth disabled={!edit} >
                            Change Authorization
                        </Button>
                        <FormHelperText sx={{ textAlign: 'center' }} >
                            This will require you to know and enter your password.
                        </FormHelperText>
                    </Stack>    
                    <Stack sx={{ width: '100%' }}>
                        <Button variant='contained' fullWidth disabled={!edit} >
                            Change Password
                        </Button>
                        <FormHelperText></FormHelperText>
                    </Stack>    
                    

                </Stack>

            </Stack>

        </Container>
    )
}

export default AuthInfo
