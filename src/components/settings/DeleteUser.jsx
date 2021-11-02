import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
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


    return (
        <Container>
            <Stack spacing={3} >
                <Typography variant='body1' color={theme.palette.error.light} fontSize={19} >
                    Delete Account
                </Typography>
                <TextField
                        label='Password'
                        type='password'
                        variant={textVariant}
                        size='small'
                        sx={{ flexGrow: 1 }}
                    />
                <Stack>

                    <Button variant='contained' fullWidth >
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
