import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, Switch, TextField, Typography, FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import SideBar from '../main/SideBar'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'
import NameAndAvatar from './NameAndAvatar'
import ContactInfo from './ContactInfo'
import AuthInfo from './AuthInfo'
import DeleteUser from './DeleteUser'
import EditHomeColor from './EditHomeColor'
import DarkMode from './DarkMode'
import { Box } from '@mui/system'
import { useMediaQuery } from '@mui/material';


function EditProfile() {
    
    const { user, url, setDark, dark, homeColorOptions, homeColor, setHomeColor } = useUserContext()
    const theme = useTheme()
    const headingColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    const landHeight = useMediaQuery('(max-height: 500px)') ? '100vh' : '100%'
    const styles = {
        rootDiv : { display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '100%',
            backgroundColor: theme.palette.background.default,
            overflowY: 'scroll',
            paddingBottom: '50px' 
        }
    }
    const xl = useMediaQuery('(min-width: 2000px)')
    // useEffect(() => console.log(theme) ,[])

    if(user){
        const { fullName, username, contact, email, image, position, darkMode, createdAt, address } = user
        return (
    
                <SideBar>

                <Box sx={{ height: '100%', flexGrow: 1, px: { xs: 3, md: 0} }} >
                { xl && console.log('hello') }
                <Paper elevation={4} sx={{ my: '50px' ,  mx: xl ? '15%' : { md: 16, lg: 19 }, width: { xs: '100%', sm: '100%', md: '70%', lg: '80%'}, }}  >
                    <Container sx={{ py: 3 }} >
                        <Stack spacing={3} justifyContent='flex-start' >

                            <Typography variant='h5' color={headingColor} sx={{ textAlign: 'center' }} >
                                Upate your Information and Preferences here.
                            </Typography>

                            <Divider />
                            
                            <NameAndAvatar />
        
                            <Divider />

                            <ContactInfo />
                            
                            <Divider />

                            <AuthInfo />
                            
                            <Divider />

                            { user && user.isAdmin && <EditHomeColor />}

                            <Divider />

                            <DarkMode />

                            <Divider />
                            
                            {/* ----------------------------------------------------Add avalability----------------------------- */}
                            <Container>
                                <Stack>
                                    <Typography variant='body1' color={headingColor} fontSize={19} >
                                        Change Avalability
                                    </Typography>
                                    
                                </Stack>
                            </Container>

                            <Divider />

                            {/* ----------------------------------------------------Add delete account----------------------------- */}
                            <DeleteUser />


                        </Stack>
                    </Container>
                </Paper>
                </Box>
                </SideBar>
        )

    }
    else {
        return <div></div>
    }
}

export default EditProfile
