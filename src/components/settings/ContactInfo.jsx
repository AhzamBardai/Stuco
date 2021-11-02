import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, Switch, TextField, Typography, useMediaQuery } from '@mui/material'
import SideBar from '../main/SideBar'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'


function ContactInfo() {

    const { user, url, textVariant } = useUserContext()
    const { fullName, username, contact, email, image, position, darkMode, createdAt, address } = user
    const theme = useTheme()
    const headingColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    const [edit, setEdit] = useState(false)

    return (
        <Container>
                <Stack spacing={3}>

                    <Stack direction='row' justifyContent='space-between' >

                        <Typography variant='body1' color={headingColor} fontSize={19} >
                            Contact Information
                        </Typography>

                        <Switch checked={edit} onChange={() => setEdit(!edit)} ></Switch>
                    </Stack>

                    <Stack spacing={2} >

                        <TextField
                            label= 'Street'
                            variant={textVariant}
                            size='small'
                            defaultValue={ address && address.street}
                            sx={{ flexGrow: 1 }}
                            />
                        
                        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} >

                            <TextField
                                label='City'
                                variant={textVariant}
                                size='small'
                                defaultValue={address && address.city}
                                sx={{ flexGrow: 1 }}
                                />
                                
                            <TextField
                                label='State'
                                variant={textVariant}
                                size='small'
                                defaultValue={address && address.state}
                                sx={{ flexGrow: 1 }}
                            />

                        </Stack>

                        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} >

                            <TextField
                                label='Zip Code'
                                variant={textVariant}
                                size='small'
                                defaultValue={address && address.zipcode}
                                sx={{ flexGrow: 1 }}
                                />
                                
                            <TextField
                                label='Phone'
                                variant={textVariant}
                                size='small'
                                defaultValue={contact}
                                sx={{ flexGrow: 1 }}
                            />

                        </Stack>

                        <Button variant='contained' fullWidth disabled={!edit} >
                            Change Contact Information
                        </Button>

                </Stack>

            </Stack>

        </Container>
    )
}

export default ContactInfo
