import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, Switch, TextField, Typography, useMediaQuery } from '@mui/material'
import SideBar from '../main/SideBar'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'


function DeleteUser() {

    const { user, url, textVariant } = useUserContext()
    const { fullName, username, contact, email, image, position, darkMode, createdAt, address } = user
    const theme = useTheme()
    const headingColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    const [isReadOnly, setIsReadOnly] = useState(true)
    const [edit, setEdit] = useState(false)

    const toggleEdit = (e) => {
        e.preventDefault()
        setEdit(!edit)
        setIsReadOnly(!isReadOnly)
    }

    return (
        <Container>
            <Stack spacing={3} >

                <Stack direction='row' justifyContent='space-between' >
                    <Typography variant='body1' color={theme.palette.error.light} fontSize={19} >
                        Delete Account
                    </Typography>
                    <Switch checked={edit} onChange={toggleEdit} ></Switch>
                </Stack>

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

                <Stack>

                    <Button variant='contained' fullWidth disabled={!edit} >
                        Confirm Account Deletion
                    </Button>
                    <FormHelperText sx={{ textAlign: 'center' }} >
                        This is an ireversible action. You will lose all data pertaining to your account with this action. Enter your correct password to proceed...
                    </FormHelperText>
                </Stack>
            </Stack>
        </Container>
    )
}

export default DeleteUser
